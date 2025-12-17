-- VIP System Functions

-- 1. Click 'Vaqt Bekheir'
-- Logic: 
--  - Reset daily_clicks if last_click_date is not today.
--  - Increment daily_clicks.
--  - If daily_clicks reaches 29, increment vip_level (max 7).
--  - Return new status.

-- 1. Click 'Vaqt Bekheir'
-- Logic: 
--  - Check if 24 hours passed since last_click_at.
--  - Increment daily_clicks (treated as cycle clicks).
--  - If daily_clicks reaches 7:
--    - Increment vip_level (max 7).
--    - Reset daily_clicks to 0.

create or replace function click_vaqt_bekheir()
returns jsonb
language plpgsql
security definer
as $$
declare
  wallet_row public.wallets%rowtype;
  result jsonb;
  new_clicks int;
  new_level int;
  last_click timestamp with time zone;
  time_diff interval;
  can_click boolean;
  hours_until_next int;
begin
  select * into wallet_row from public.wallets where user_id = auth.uid();
  if not found then
    raise exception 'Wallet not found';
  end if;

  -- Handle column migration implicitly by casting if needed, or assume last_click_at exists
  -- For this script, we assume we are updating the logic.
  -- If last_click_date was used, we treat midnight as the time? 
  -- No, we will start fresh or assume null means clickable.
  
  -- Logic for cooldown
  if wallet_row.last_click_at is null then
    can_click := true;
  else
    time_diff := now() - wallet_row.last_click_at;
    if time_diff < interval '24 hours' then
       can_click := false;
       hours_until_next := 24 - extract(epoch from time_diff) / 3600;
    else
       can_click := true;
    end if;
  end if;

  if not can_click then
     return jsonb_build_object(
       'success', false,
       'message', 'Please wait ' || hours_until_next || ' hours',
       'daily_clicks', wallet_row.daily_clicks,
       'vip_level', wallet_row.vip_level,
       'next_click_at', wallet_row.last_click_at + interval '24 hours'
     );
  end if;

  -- Process Click
  new_clicks := wallet_row.daily_clicks + 1;
  new_level := wallet_row.vip_level;
  
  -- Level up logic: 7 clicks to level up
  if new_clicks >= 7 and new_level < 7 then
    new_level := new_level + 1;
    new_clicks := 0; -- Reset cycle
  end if;

  update public.wallets
  set 
    daily_clicks = new_clicks,
    last_click_at = now(), -- Update timestamp
    vip_level = new_level
  where id = wallet_row.id;

  result := jsonb_build_object(
    'success', true,
    'daily_clicks', new_clicks,
    'vip_level', new_level,
    'leveled_up', (new_level > wallet_row.vip_level),
    'next_click_at', now() + interval '24 hours'
  );

  return result;
end;
$$;


-- 2. Claim VIP Reward
-- Logic:
--  - Check if eligible (Level >= 3 for reward 1, Level >= 7 for reward 2).
--  - Check if already claimed.
--  - Add tickets.
--  - Update claimed_rewards.

create or replace function claim_vip_reward(reward_level int)
returns jsonb
language plpgsql
security definer
as $$
declare
  wallet_row public.wallets%rowtype;
  ticket_amount int;
begin
  select * into wallet_row from public.wallets where user_id = auth.uid();
  
  if wallet_row.vip_level < reward_level then
    raise exception 'Level requirement not met';
  end if;

  if (wallet_row.claimed_rewards @> to_jsonb(reward_level)) then
    raise exception 'Reward already claimed';
  end if;

  -- Define rewards
  if reward_level = 3 then
    ticket_amount := 1;
  elsif reward_level = 7 then
    ticket_amount := 2;
  else
    raise exception 'Invalid reward level';
  end if;

  update public.wallets
  set 
    ticket_balance = ticket_balance + ticket_amount,
    claimed_rewards = claimed_rewards || to_jsonb(reward_level)
  where id = wallet_row.id;

  -- Log transaction
  insert into public.wallet_transactions (wallet_id, ticket_amount, description)
  values (wallet_row.id, ticket_amount, 'VIP Level ' || reward_level || ' Reward');

  return jsonb_build_object('success', true, 'tickets_added', ticket_amount);
end;
$$;
