-- Admin: Update Order Status (Bypass RLS)
-- FIX: Changed order_id_input from bigint to uuid
create or replace function admin_update_order_status(
  order_id_input uuid,
  new_status text,
  admin_secret text
)
returns jsonb
language plpgsql
security definer
as $$
begin
  -- Simple security check (matches client-side hardcoded password)
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
