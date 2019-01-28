# IOTA basics overview

**IOTA introduces new concepts that are essential to learn before you start using an IOTA network.**

An IOTA network consists of IRI nodes and clients.

Clients transfer data and/or IOTA tokens to each other's [addresses](../concepts/addresses-and-signatures.md). Addresses are generated from a cryptographic algorithm that uses a seed as a source of randomness. Each address belong to a seed and has a corresponding private key, which must be used to sign transactions that debit IOTA tokens from an address. A seed is a client's secret password to addresses.

To make these transfers, clients must send packages of transactions called [bundles](../concepts/bundles-and-transactions.md) to IRI nodes. These transactions contain data that instruct IRI nodes to transfer data or IOTA tokens.

[IRI nodes](root://getting-started/0.1/introduction/what-is-an-iri-node.md) validate each transaction and keep an immutible history of them in their ledgers.

The transactions in the ledger are connected to each other through the [`branchTransaction` field and the `trunkTransaction` field](../references/structure-of-a-transaction.md). These connections form a data structure called [the Tangle](root://the-tangle/0.1/introduction/overview.md). This data structure allows IRI nodes to traverse transactions through their connections, and validate each one.



