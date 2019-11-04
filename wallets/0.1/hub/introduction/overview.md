# Hub overview

**Hub is a headless multi-user wallet for cryptocurrency exchanges. Through its application programming interfaces (APIs), Hub offers you an easy way to integrate IOTA into an exchange. You can choose to use either the RESTful or gRPC API, which provide simple calls to help you safely manage users' deposits and withdrawals of IOTA tokens.**

## Account types

Hub has two types of account:

- User accounts: Allow users to deposit IOTA tokens into Hub and to request withdrawals
- Hub owner account: Stores users' deposited IOTA tokens until they request a withdrawal

## Transaction monitoring

Before any transaction is accepted by an IOTA network, it must be confirmed. When a user deposits IOTA tokens into one of their addresses, or when the Hub owner issues a withdrawal, the transactions may become stuck in a pending state. So, to avoid delays in confirmation, Hub keeps a database of pending transactions so that it can automatically [reattach and promote](root://getting-started/0.1/basics/reattach-rebroadcast-promote.md) them.

## Seed management

Each user's deposit addresses is derived from a new [seed](root://getting-started/0.1/basics/seeds.md), using the [Argon2](https://www.argon2.com/) hashing function.

The following values are used to create a seed:

- Seed UUID: A randomly generated universally unique identifier that is stored in a [`seeduuid` field](../references/database-tables.md#user_account)
- Salt: Characters that you can define in an optional [`salt` flag](../references/command-line-flags.md)

:::info:
The database contains a record of how many IOTA tokens a user has. The IOTA tokens are not kept on the user's addresses. Instead, they are transferred to the Hub owners address during a [sweep](../concepts/sweeps.md).
:::

## Token protection

To help users not to withdraw from [spent addresses](root://getting-started/0.1/basics/addresses.md#spent-addresses), Hub has the following features:

- **Withdrawal management:** Before withdrawing tokens from a user's address, Hub makes sure that no deposit transactions are pending for that same address, and that all previous deposit transactions have been confirmed. To keep track of which addresses have been withdrawn from, Hub stores the addresses in the database. When an address has been withdrawn from, Hub stops users from withdrawing from that address again.
 
- **Deposit address management:** Hub derives a new address from a new seed for every deposit. To do so, Hub uses the withdrawal management to check whether an address was already withdrawn from. If an address has been withdrawn from, Hub creates a new seed UUID to use to derive a new deposit address.

- **Sweeps:** When issuing a withdrawal, Hub creates a bundle, called a [sweep](../concepts/sweeps.md), that also moves funds from users' deposit addresses to one of the Hub owner's addresses.

## Limitations

Hub helps to stop users from withdrawing from spent addresses, but it doesn't stop users from depositing into them.

If a user deposits tokens into a spent address, you can use the `recoverFunds` API call.

## Repository

Go to the Hub source code on [Github](https://github.com/iotaledger/hub).
