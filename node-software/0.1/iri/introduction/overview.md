# IOTA reference implementation overview

**The IRI (IOTA reference implementation) is open-source Java software that defines the IOTA protocol that currently runs on nodes in the [public IOTA networks](root://getting-started/0.1/network/iota-networks.md), where clients can transfer the IOTA token among each other.**

IRI nodes are the core of an IOTA network, and are responsible for the following key functions:

- Validate transactions
- Store valid transactions in a ledger
- Allow clients to interact with the IRI and have their transactions appended to the ledger

By running your own IRI node you have the following benefits:

- You have direct access to an IOTA network instead of having to connect to someone else's IRI node
- You help the IOTA network to become more distributed by adding to the number of ledgers and validating the transactions in your [neighbor's](root://getting-started/0.1/network/nodes.md#neighbors) ledgers

## Limitations

The IRI receives transactions and records them in its ledger, it doesn't create or sign transactions. To create or sign transactions, you must use client software such as [Trinity](root://wallets/0.1/trinity/introduction/overview.md) or a [client library](root://client-libraries/0.1/introduction/overview.md) and send the transactions to an IRI node.

## Next steps

[Run an IRI node](../how-to-guides/install-iri.md)to get started with validating and storing transactions.
