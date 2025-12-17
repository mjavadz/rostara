-- Function to allow users to delete their own account and reset connection
create or replace function delete_own_account()
returns void as $$
declare
  uid uuid;
  wallet_id_val bigint;
begin
  uid := auth.uid();
  if uid is null then raise exception 'Not authenticated'; end if;

  -- Get wallet id
  select id into wallet_id_val from public.wallets where user_id = uid;

  -- 1. Delete dependent data manually (safe deletion)
  delete from public.wallet_transactions where wallet_id = wallet_id_val;
  delete from public.crypto_deposits where user_id = uid;
  delete from public.forum_likes where user_id = uid;
  delete from public.forum_comments where user_id = uid;
  delete from public.forum_posts where user_id = uid;
  delete from public.orders where user_id = uid; 
  delete from public.wallets where user_id = uid;

  -- 2. Delete user from auth system
  delete from auth.users where id = uid;
end;
$$ language plpgsql security definer;
