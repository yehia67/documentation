# Hub overview

**Hub is a headless multi-user-wallet that you can plug into your own applications. Through its [gRPC API](../how-to-guides/get-started-with-the-api.md), Hub offers you a secure way to manage deposits and withdrawals of IOTA tokens. To manage the data for each user, Hub uses a database to store user information such as IDs, deposit addresses, and withdrawal requests.**

Hub helps you to integrate IOTA into your own applications by automating the following processes:

* [Transaction monitoring](#transaction-monitoring)
* [Seed creation](#seed-creation)
* [Token protection](#token-protection)

## Transaction monitoring

Withdrawals and deposits are transactions that are grouped together in the same [bundle](root://getting-started/0.1/introduction/what-is-a-bundle.md). This bundle is called a [sweep](../concepts/sweeps.md).

Before a withdrawal or a deposit is accepted by an IOTA network, the sweep must be confirmed. So, to avoid delays in confirmation, Hub [reattaches and promotes](root://iota-basics/0.1/concepts/reattach-rebroadcast-promote.md) transactions until they're confirmed.

:::info:Want to learn more about consensus?
Read about [the Tangle](root://the-tangle/0.1/introduction/overview.md).
:::

## Seed creation

Each client in an IOTA network has a secret password called a [seed](root://getting-started/0.1/introduction/what-is-a-seed.md), which is used to create [addresses and to sign bundles](root://iota-basics/0.1/concepts/addresses-and-signatures.md). Addresses are the accounts from which transactions are sent and received, and signatures prove ownership of an address.

Hub creates a seed for each deposit address, using the [Argon2](https://www.argon2.com/) hashing function. The following values are used to create a seed:

* Seed UUID: A randomly generated universally unique identifier that is stored in a [`seeduuid` field](../references/database-tables.md#user_account)
* Salt: Characters that you can define in a [`salt` flag](../references/command-line-flags.md)

:::info:
Seeds are never stored in the database.
The salt is optional, but recommended.
For extra security you should [install a signing server](../how-to-guides/install-the-signing-server.md) to store the salt and handle the signing of bundles.
:::

## Token protection

IOTA uses the Winternitz one-time signature scheme to create signatures. As a result, each signature exposes around half of the private key. Signing a bundle once with the a private key is safe. So, when a user withdraws from an address, that address is considered 'spent' and must never be withdrawn from again.

:::info:
[Discover the details about spent addresses and why you must never withdraw from an address more than once](root://iota-basics/0.1/concepts/addresses-and-signatures.md#address-reuse).
:::

To help users not to withdraw from spent addresses, Hub has the following features:

**Withdrawal management:** Before withdrawing tokens from a user's address, Hub makes sure that no deposit transactions are pending for that same address, and that all previous deposit transactions have been confirmed. To keep track of which addresses have been withdrawn from, Hub stores the addresses in the database. When an address has been withdrawn from, Hub stops users from withdrawing from that address again.
 
**Deposit address management:** Hub derives a new address from a new seed for every deposit. To do so, Hub uses the withdrawal management to check whether an address was already withdrawn from. If an address has been withdrawn from, Hub creates a new seed UUID to use to derive a new deposit address.

**Sweeps:** When actioning a user's withdrawal request, Hub creates a bundle, called a [sweep](../concepts/sweeps.md), that also moves funds from users' deposit addresses to one of the Hub owner's addresses.

## Limitations

Hub helps to stop users from withdrawing from spent addresses, but it doesn't stop users from depositing into them.

If a user deposits tokens into a spent address, you can use the gRPC API to [create a bundle that withdraws those tokens](https://github.com/iotaledger/rpchub/blob/master/docs/hip/001-sign_bundle.md).

## Repository

Go to the Hub source code on [Github](https://github.com/iotaledger/rpchub)
