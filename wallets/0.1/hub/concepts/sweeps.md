# Sweeps

**A sweep is a bundle that issues users' withdrawals and transfers IOTA tokens from users' deposit addresses to one of the Hub owner's addresses. Sweeps are an optional safety feature that reduces the likelihood of an attacker stealing tokens from a spent address.**

IOTA uses the Winternitz one-time signature scheme to create signatures. As a result, each signature exposes around half of the private key. Signing a bundle once with the a private key is safe. Signing a different bundle with the same private key may allow attackers to brute force the private key and steal IOTA tokens from the address. So, when a user withdraws from an address, that address is considered 'spent' and must never be withdrawn from again.

Hub reduces this risk by transferring IOTA tokens from users' deposit addresses to a Hub owner's address at regular intervals.

:::danger:Important
You must inform users never to deposit tokens into the same address more than once.
:::

:::info:
[Discover the details about spent addresses and why you must never withdraw from an address more than once](root://dev-essentials/0.1/concepts/addresses-and-signatures.md#address-reuse).
:::

To do a sweep, Hub does the following at regular intervals that are defined by the [`--monitorInterval` and `--sweepInterval`](../references/command-line-flags.md#monitorInterval) flags:

- Find all deposit address that have a non-zero balance

- Check whether those deposit addresses are in any pending sweeps. Any deposit addresses that are in pending sweeps aren't included in a new sweep.

- Check for pending user withdrawal requests

- Create a new address for the Hub owner

- Create a bundle that transfers any deposited IOTA tokens to the chosen withdrawal addresses. If the total amount of withdrawals is less than the total amount of deposits, then transfer the remaining balance to the Hub owner's addresses. If the total amount of deposits is less than the total amount of withdrawals, transfer the remaining withdrawal balance from the Hub owner's addresses. The number of deposits and withdrawals that can be issued in a single bundle is limited by the [`--sweep_max_deposit` and `--sweep_max_withdrawal`](../references/command-line-flags.md#sweepLimits) flags.

- Check the inclusion state of the tail transaction in the sweep to determine if it's been confirmed. Hub [reattaches and promotes](root://dev-essentials/0.1/concepts/reattach-rebroadcast-promote.md) the tail transaction until the transactions in the sweep are confirmed.

- Update the users' balances in the database tables when the transactions in the sweep are confirmed

:::info:Want to learn more about inclusion states?
Find out how to [check if a transaction is confirmed](root://dev-essentials/0.1/how-to-guides/check-transaction-confirmation.md).
:::
