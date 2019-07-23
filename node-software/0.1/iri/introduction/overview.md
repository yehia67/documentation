# IOTA reference implementation overview

**The IRI (IOTA reference implementation) is open-source Java software that defines the IOTA protocol. The IRI is the software that currently runs on the IOTA Mainnet, where clients can transfer the IOTA token among each other.**

IRI nodes are the core of an IOTA network, and are responsible for the following key functions:

- [Validate transactions](../concepts/transaction-validation.md)
- [Store the Tangle](../concepts/the-ledger.md)
- [Allow clients to interact with the IRI](../how-to-guides/interact-with-an-iri-node.md) and have their transactions attached to the Tangle

Nodes can attach a bundle's transactions to the Tangle only if those transactions directly reference two existing ones. So, before clients send a bundle to a node, they ask it for two existing transactions to use as references. To select these transactions, nodes use an algorithm called tip selection that validates their history and makes sure that it includes no counterfeit transactions. As a result, transactions approve the two existing transactions that they reference.

When clients send a bundle to a node, the node does some basic checks to make sure that the transactions in it are valid, for example that the values of transactions don't exceed the total global supply. At this point, the transactions in the bundle are considered 'attached' to [the Tangle](../introduction/what-is-the-tangle.md).

After attaching transactions to the Tangle, the node sends it to the other nodes that it's connected to, called neighbors. Then, those nodes send it to their neighbors, and so on. This way, all nodes validate all transactions and attach them to their own copy of the Tangle. This process is called gossiping.

Without IRI nodes, no one would be able to send transactions because there would be no way of recording who sent what to whom.

By running your own IRI node you have the following benefits:

- You have direct access to an IOTA network instead of having to connect to someone else's IRI node
- You help the IOTA network to become more distributed by adding to the number of ledgers and validating your neighbor IRI node's transactions

## Limitations

The IRI receives transactions and records them in its ledger, it doesn't create or sign transactions. To create or sign transactions, you must use client software such as [Trinity](root://trinity/0.1/introduction/overview.md) or a [client library](root://client-libraries/0.1/introduction/overview.md) and send the transactions to an IRI node.
