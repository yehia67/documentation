# Hub overview

**Hub is a multi-user-wallet that offers you a secure, easy way to manage deposits and withdrawals of IOTA tokens. To manage the data for each user, Hub uses a database to store user information such as IDs, seeds, addresses, and withdrawals.**

Building an application to manage IOTA tokens for multiple users can be time consuming. To make the process quicker and easier for you, you can integrate Hub into your existing software environment.

Hub is the fastest and easiest way to integrate IOTA because it automates key processes that would otherwise have to be done manually with one of the [client libraries](root://client-libraries/0.1/introduction/overview.md):

* [Transaction monitoring](#transaction-monitoring)
* [Seed creation](#seed-creation)
* [Token protection](#token-protection)

You can use Hub by calling methods from the [gRPC](../references/api-reference.md) API.

## Transaction monitoring

IOTA is a distributed network of nodes that validate transactions and reach a consensus on those that are considered confirmed. Before a withdrawal or a deposit is accepted by the network, the corresponding [bundle](root://getting-started/0.1/introduction/what-is-a-bundle.md) must be confirmed.

To avoid delays in confirmation, Hub [rettaches and promotes](root://iota-basics/0.1/concepts/reattach-rebroadcast-promote.md) transactions until they're confirmed.

:::info:Want to learn more about consensus?
Read about [the Tangle](root://the-tangle/0.1/introduction/overview.md).
:::

## Seed creation

Each client in an IOTA network has a secret password called a [seed](root://getting-started/0.1/introduction/what-is-a-seed.md), which is used to create addresses and to sign bundles. Addresses are the accounts from which transactions are sent and received, and signatures prove ownership of an address.

Hub creates seeds for each deposit address in a secure way, using the following:
* A universally unique identifier (UUID)
* Data that you can define in a `salt` flag

As well as user seeds, Hub creates a seed for the Hub owner (you). This seed is used during a [sweep](../concepts/sweeps.md), where user funds are deposited into addresses that are created from the Hub owner's seed.

## Token protection

IOTA uses the Winternitz one-time signature scheme to create signatures. As a result, each signature exposes around half of the private key. Signing a bundle once with the a private key is safe. Signing a different bundle again with the same private key may allow attackers to brute force the private key and steal token from the address. Therefore, addresses should be withdrawn from only once.

:::info:
Addresses that have already been withdrawn from also known as used addresses or spent addresses.

[Discover the details about address reuse and why you must never do it](root://iota-basics/0.1/concepts/addresses-and-signatures.md#address-reuse).
:::

To stop address reuse, Hub has the following features:

**Withdrawal management:** Before withdrawing tokens from a user's address, Hub makes sure that no deposit transactions are pending for that same address, and that all previous deposit transactions have been confirmed. To keep track of which addresses have been withdrawn from, Hub stores the addresses in a database. When an address has been withdrawn from, Hub stops users from withdrawing from that address again.
 
**Deposit address management:** Hub creates a new address for every deposit, using a user's seed. To do so, Hub uses the withdrawl management to check whether an address was already withdrawn from. If an address has been withdrawn from, Hub increments the index to create a new deposit address.

**Sweeps:** When actioning a user withdrawal, Hub creates a bundle that also moves funds from users' deposit addresses to one of the Hub owner's addresses.

## Limitations

Hub prevents address reuse, but it doesn't prevent users from sending tokens to a used address.

If a user deposits tokens to a used address, you can [create a bundle to move funds from that address](https://github.com/iotaledger/rpchub/blob/master/docs/hip/001-sign_bundle.md).

## Repository

Go to the Hub source code on [Github](https://github.com/iotaledger/rpchub)
