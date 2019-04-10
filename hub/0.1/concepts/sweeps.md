# Sweeps

**A sweep is a bundle that actions users' withdrawals and transfers IOTA tokens from users' deposit addresses to one of the Hub owner's addresses. Sweeps are an optional safety feature that reduces the likelihood of an attacker stealing tokens from a used address.**

IOTA uses the Winternitz one-time signature scheme to create signatures. As a result, each signature exposes around half of the private key. Signing a bundle once with the a private key is safe. Signing a different bundle with the same private key may allow attackers to brute force the private key and steal IOTA tokens from the address. So, when a user withdraws from an address, that address is considered 'used' and must never be withdrawn from again.

If a user deposits IOTA tokens into a used address such as one involved in a sweep, the tokens in that address are at risk of being stolen.

Hub reduces this risk by transferring IOTA tokens from users' deposit addresses to a Hub owner's address at regular intervals.

:::danger:Important
You shouldn't rely on sweeps to protect used addresses. An attacker could steal the funds before Hub can do a sweep.

So, it's important that you inform users never to deposit tokens into a used address.
:::

:::info:
[Discover the details about address reuse and why you must never do it](root://iota-basics/0.1/concepts/addresses-and-signatures.md#address-reuse).
:::

To do a sweep, Hub does the following at regular intervals that are defined by the [`--monitorInterval` and `--sweepInterval`](../references/command-line-flags.md#monitorInterval) flags:

- Find all deposit address that have a non-zero balance

- Check whether those deposit addresses are in any pending bundles. Any deposit addresses that are in pending bundles aren't included in the sweep.

- Check for pending user withdrawal requests

- Create a new address for the Hub owner

- Create a bundle that actions withdrawal requests and sends the remaining balance to the Hub owner's addresses. The number of deposits and withdrawals that can be actioned in a single bundle is limited by the [`--sweep_max_deposit` and `--sweep_max_withdrawal`](../references/command-line-flags.md#sweepLimits) flags.

- Check the inclusion state of the tail transaction in the sweep to determine if it's been confirmed. Hub will [reattach and promote](root://iota-basics/0.1/concepts/reattach-rebroadcast-promote.md) the tail transaction until the transactions in the sweep are confirmed.

- Update the users' balances in the database tables when the transactions in the sweep are confirmed

:::info:Want to learn more about inclusion states?
Find out how to [check if a transaction is confirmed](root://iota-basics/0.1/how-to-guides/check-transaction-confirmation.md).
:::
