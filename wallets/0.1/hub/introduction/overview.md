# Hub overview

**Hub is a headless multi-user wallet for cryptocurrency exchanges. Hub offers you a secure way to manage deposits and withdrawals of users' IOTA tokens. When a user deposits IOTA tokens into one of their Hub addresses, Hub transfers those tokens to the Hub owners address in a process called a sweep. This way, the Hub owner can make sure that users' tokens are secure until they request a withdrawal.**

Hub helps you to integrate IOTA into your own applications through the following processes:

* [Transaction monitoring](#transaction-monitoring)
* [Seed creation](#seed-creation)
* [Token protection](#token-protection)

You can use Hub to build applications that allow users to deposit IOTA tokens into it. When users deposit IOTA tokens, Hub keeps a record of their balances in a database. Then, Hub transfers those tokens to the Hub owner's IOTA address. This way the Hub owner has control over the tokens and can keep them safe for the users. If a user later requests a withdrawal, the Hub owner can issue that withdrawal by checking the user's balance and sending a bundle of transactions to a node.

All Hub functions such as deposits and withdrawals are done by calling [gRPC API endpoints](../how-to-guides/get-started-with-the-api.md).

## Transaction monitoring

Before any transaction is accepted by an IOTA network, it must be confirmed. When a user deposits IOTA tokens into one of their addresses, or when the Hub owner issues a withdrawal, the transactions may become stuck in a pending state. So, to avoid delays in confirmation, Hub keeps a database of pending transactions so that it can automatically [reattach and promote](root://dev-essentials/0.1/concepts/reattach-rebroadcast-promote.md) them.

## Seed creation

Each client in an IOTA network has a secret password called a [seed](root://getting-started/0.1/introduction/what-is-a-seed.md), which is used to create [addresses and to sign bundles](root://dev-essentials/0.1/concepts/addresses-and-signatures.md). Addresses are the accounts from which transactions are sent and received, and signatures prove ownership of an address.

Each user's deposit addresses is derived from a new seed, using the [Argon2](https://www.argon2.com/) hashing function. The following values are used to create a seed:

* Seed UUID: A randomly generated universally unique identifier that is stored in a [`seeduuid` field](../references/database-tables.md#user_account)
* Salt: Characters that you can define in an optional [`salt` flag](../references/command-line-flags.md)

:::info:
The database contains a record of how many IOTA tokens a user has. The IOTA tokens are not kept on the user's addresses. Instead, they are transferred to the Hub owners address during a [sweep](../concepts/sweeps.md). If a user later triggers a [`userWithdrawRequest` command](../references/api-reference.md#hub.rpc.UserWithdrawRequest), Hub creates a new sweep to send the user's tokens to the chosen addresses.
:::

## Token protection

IOTA uses the Winternitz one-time signature scheme to sign bundles. As a result, each signature exposes around half of the private key. Signing a bundle once with a private key is safe. So, when a user withdraws from an address, that address is considered 'spent' and must never be withdrawn from again.

:::info:
[learn about signatures in IOTA and why you must never withdraw from an address more than once](root://dev-essentials/0.1/concepts/addresses-and-signatures.md#address-reuse).
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
