-- CLEANUP SCRIPT: Fix Ambiguous Functions and Schema Mismatch

-- 1. Drop ALL variations of the problematic functions to clear the ambiguity
drop function if exists public.admin_update_order_status(bigint, text, text);
drop function if exists public.admin_update_order_status(uuid, text, text);

drop function if exists public.process_cashback(bigint);
drop function if exists public.process_cashback(uuid);

-- 2. Recreate admin_update_order_status with correct UUID type
create or replace function public.admin_update_order_status(
  order_id_input uuid,
  new_status text,
  admin_secret text
)
returns jsonb
language plpgsql
security definer
as $$
begin
  -- Simple security check
  if admin_secret != 'admin@rostara' then
    raise exception 'Unauthorized access';
  end if;

  update public.orders
  set status = new_status
  where id = order_id_input;

  if not found then
    return jsonb_build_object('success', false, 'message', 'Order not found');
  end if;

  return jsonb_build_object('success', true);
end;
$$;

-- 3. Recreate process_cashback with correct UUID type
create or replace function public.process_cashback(order_id_input uuid)
returns void as $$
declare
  v_user_id uuid;
  v_total decimal;
  v_cashback decimal;
  v_wallet_id bigint;
begin
  -- Get order details
  select user_id, total_price into v_user_id, v_total from public.orders where id = order_id_input;
  
  if v_user_id is null then raise exception 'Order not found'; end if;

  -- 12% Calculation
  v_cashback := v_total * 0.12;
  
  -- Get Wallet ID
  select id into v_wallet_id from public.wallets where user_id = v_user_id;

  if v_wallet_id is null then
     -- Auto-create wallet if missing
     insert into public.wallets (user_id) values (v_user_id) returning id into v_wallet_id;
  end if;

  -- Update Balance
  update public.wallets
  set credit_balance = credit_balance + v_cashback
  where id = v_wallet_id;

  -- Log Transaction
  insert into public.wallet_transactions (wallet_id, type, amount, description)
  values (v_wallet_id, 'cashback', v_cashback, '12% Cashback for Order ' || order_id_input);
end;
$$ language plpgsql security definer;
