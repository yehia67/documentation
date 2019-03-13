# IOTA reference implementation overview

**The IRI (IOTA reference implementation) is open-source Java software that defines the IOTA protocol. Computers that run the IRI are called IRI nodes.**

IRI nodes are the core of an IOTA network, and are responsible for the following key functions:

- [Validate transactions](../concepts/transaction-validation.md)
- [Store valid transactions in a ledger](../concepts/the-ledger.md)
- [Allow clients to interact with the IRI](../how-to-guides/interact-with-an-iri-node.md) and have their transactions appended to the ledger

Without IRI nodes, IOTA networks wouldn't exist. No one would be able to send transactions because there would be no way of recording who sent what to whom.

By running your own IRI node you have the following benefits:

- You have direct access to an IOTA network instead of having to connect to someone else's IRI node
- You help the IOTA network to become more distributed by adding to the number of ledgers and validating your neighbor IRI node's transactions

## Limitations

The IRI receives transactions and records them in its ledger, it doesn't create or sign transactions. To create or sign transactions, you must use client software such as [Trinity](root://trinity/0.1/introduction/overview.md) or a [client library](root://client-libraries/0.1/introduction/overview.md) and send the transactions to an IRI node.
