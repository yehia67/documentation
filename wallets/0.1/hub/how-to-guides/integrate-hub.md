# Integrate Hub into a crytocurrency exchange

**Hub can be integrated into an exchange in many ways, depending on how you want to manage your users' balances.**

In this guide, we discuss two possible scenarios:

- **Scenario A:** Multiple user accounts where IOTA tokens are manually transferred to an external online wallet (also known as a hot wallet).
- **Scenario B:** Multiple user accounts with individual balances.

## Scenario A

You may not want to rely on Hub's internal accounting setup. One such reason might simply be that forwarding netted trades is too cumbersome.
Therefore, after a successful deposit, all tokens might be transferred to a central hot wallet. This will also allow you to deal with cold storage of tokens easily by withdrawing from this hot wallet to an offline wallet (also known as a cold wallet) address and depositing back into the account as necessary. User withdrawals are then also processed from this hot wallet.

:::warning:Warning
In this scenario, Hub doesn't keep track of users' balances in the database.
:::

### Initial setup

Exchange creates a hot wallet

#### User signup

Exchange creates a new Hub user, passing in a userid.

### User deposit

1. User requests deposit address (`GetDepositAddress`)
2. User deposits tokens
3. Exchange polls for new updates, using the `BalanceSubscription` endpoint
4. Upon successful deposit (& sweep), exchange calls the `ProcessTransfers` endpoint, transferring all new user deposits to the hot wallet

### User withdrawal

1. User requests withdrawal on the exchange's frontend
2. Exchange issues withdrawal from hot to user address (`UserWithdraw`)
3. Hub processes this withdrawal as part of a sweep

### Cold wallet topup

Exchange issues withdrawal from hot to cold wallet address that wasn't withdrawn from (`UserWithdraw`)

  :::warning:Warning
  In this scenario, Hub doesn't check whether an address was already withdrawn from.
  :::

### Hot wallet topup

1. Exchange requests deposit address for hot user (`GetDepositAddress`)

   :::warning:Warning
   Addresses must never be withdrawn from more than once.
   :::

2. Exchange sends tokens from cold wallet to this deposit address
3. Hub receives deposit and moves to internal address as part of a sweep

### User B buys IOTA tokens from user A on the exchange

No action happens on Hub, all accounting is done internally on the exchange side.

### Discussion of the pros and cons

- (+) Easy management of cold / hot tokens
- (+) Likely to be easier to integrate on exchange side.
- (-) Reduced security guarantees because balances are not tracked on a per-user level inside Hub.
- (-) Exchange needs to keep track of total amount of IOTA tokens independently of Hub.

## Scenario B

As Hub supports independent user accounts with individual balances, it arguably makes sense to rely on this as an added security measure. Balances are tracked per user, and therefore a user can only use as many tokens as the user is tracking for them. However, this approach currently complicates the cold/hot wallet flow. 

### Cold/hot wallets

As opposed to Scenario A, it is not so easy to move tokens from multiple users to a cold wallet. However, it is possible to have Hub ignore some of the Hub owner's addresses. For this, the [`is_cold_storage`](../references/database-tables.md#hub_address) field in the `hub_address` table row needs to be set to 1. This will cause the `SweepService` to ignore this address for any sweeps.

For increased security, the `seed_uuid` of this hub address should also be deleted from the database and stored externally.

At the moment, the only way that this can be achieved is through manual database updates. It is recommended to stop Hub while marking such hub addresses as cold storage. There is no negative effect on operations if Hub is stopped.

Using the `salt` that's passed at startup and the `seed_uuid` it is always possible to recompute Hub address's seed outside of Hub.

Should sufficient interest exist for this integration scenario, it is possible to provide specialized endpoints for this.

### Initial setup

None. Start Hub.

### User sign up

Exchange creates new Hub user, passing in a per-user userid.

### User deposit

1. User requests deposit address (`GetDepositAddress`)
2. User deposits tokens
3. Hub moves the new deposit to an internal address
3. Exchange polls for new updates via `BalanceSubscription` and notifies user on their frontend once the deposit has been registered or once it has been swept successfully

### User withdrawal

1. User requests withdrawal on exchange frontend.
2. Exchange issues withdrawal from user's Hub account to payout address (`UserWithdraw`)
3. Hub processes this withdrawal as part of a sweep.

### Cold wallet topup

1. Exchange stops Hub
2. Exchange decides which Hub addresses it wants to mark as cold storage
3. Exchange sets [`is_cold_storage`](../references/database-tables.md#hub_address) to `1` on these `hub_address` rows and stores the `seed_uuid` externally.
   There are multiple scenarios for achieving this:
   - Use a vault service
   - Use paper backups
   - Some RDBMS support partitioning the table into multiple storage locations.
4. Exchange restarts Hub
   
### Hot wallet topup

1. Exchange decides which cold storage addresses it wants to reactivate
2. Exchange stops Hub
3. Exchange sets [`is_cold_storage`](../references/database-tables.md#hub_address) to `0` on these `hub_address` rows and restores the `seed_uuid` values
4. Exchange restarts hub

### User B buys tokens from user A on the exchange

1. If user B doesn't already exist, User B is created on Hub (`CreateUser`)
2. As part of next batch, exchange issues a transfer between the two users (`ProcessTransfers`)

### Discussion of the pros and cons

- (+) Balances are tracked on a per-user level and thus Hub can do a sanity check on the requests the exchange sends.
- (+) Exchange can easily do a sanity check that its backend is tracking the same `(user, balance)` values as Hub.
- (-) More complicated cold wallet setup