# Sweeps

**A sweep is a bundle that balances users' withdrawals and deposits. When users deposit IOTA tokens into a Hub address or withdraw them from one, Hub combines those transfers into a sweep. If the total amount of withdrawals is less than the total amount of deposits, Hub transfers the remaining balance to a new address that belongs to the Hub owner. If the total amount of deposits is less than the total amount of withdrawals, Hub uses the tokens in the Hub owner's addresses to fulfill the remaining withdrawal balance.**

Sweeps are an optional safety feature that ensures that deposited tokens are transferred to a secure address that belongs to the Hub owner.

## The reason for sweeps

Hub reduces the risk of a user withdrawing from a [spent address](root://getting-started/0.1/basics/addresses.md#spent-addresses) by transferring IOTA tokens from users' deposit addresses to a Hub owner's address at regular intervals.

:::danger:
You must make it clear on the exchange frontend that users' deposit addresses are for one-time use.
:::

## How sweeps work

To do a sweep, Hub does the following at regular intervals that are defined by the [`--monitorInterval` and `--sweepInterval`](../references/command-line-flags.md#monitorInterval) flags:

1. Find all deposit address that have a non-zero balance

2. Check whether those deposit addresses are in any pending sweeps. Any deposit addresses that are in pending sweeps aren't included in a new sweep.

3. Check for pending user withdrawal requests

4. Create a new address for the Hub owner

5. Create a sweep that transfers any deposited IOTA tokens to the chosen withdrawal addresses. The number of deposits and withdrawals that can be issued in a single sweep is limited by the [`--sweep_max_deposit` and `--sweep_max_withdrawal`](../references/command-line-flags.md#sweepLimits) flags.

6. Check the inclusion state of the tail transaction in the sweep to determine if it's been confirmed. Hub [reattaches and promotes](root://getting-started/0.1/basics/reattach-rebroadcast-promote.md) the tail transaction until the transactions in the sweep are confirmed.

7. Update the users' balances in the database tables when the transactions in the sweep are confirmed
