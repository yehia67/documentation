# IOTA basics overview

**IOTA introduces new concepts that are essential to learn before you start using an IOTA network.**

An IOTA network consists of IRI nodes and clients.

## Clients

Each client in the network must create a seed, which is used to create [private keys and addresses](../concepts/addresses-and-signatures.md). Addresses are public and are what clients send data and/or IOTA tokens to. The private key is secret and is used to prove ownership of an address.

Clients send data and/or IOTA tokens to each other's addresses in packages of transactions 
called [bundles](../concepts/bundles-and-transactions.md). To prove ownership of an address, clients use its private key to sign bundles that debit IOTA tokens.

The IOTA [client libraries](root://client-libraries/0.1/introduction/overview.md) provide you with all the tools you need, including those to create addresses, signatures, and transactions. All the methods that handle seeds are executed on the client side (your computer), to make sure that they're never sent anywhere insecure.

## IRI nodes

Clients must send bundles to IRI nodes, which are responsible for [validating all transactions](root://iri/0.1/concepts/transaction-validation.md) and keeping an immutible history of them in ledgers. Each IRI node has its own ledger.

When IRI nodes receive and validate a transaction, they also send it to other IRI nodes for validation. As a result, the whole network validates and stores transactions in a consistent ledger, known as the distributed ledger.

To be valid, transactions must conform to a [structure](../references/structure-of-a-transaction.md) in the IOTA protocol. Two of the fields in this structure are [`branchTransaction` and `trunkTransaction`](../references/structure-of-a-transaction.md), which must contain a reference to two previous transactions in an IRI node's ledger. IRI nodes select previous transactions during a process called [tip selection](root://the-tangle/0.1/concepts/tip-selection.md). When a transaction references another, it forms part of the data structure called [the Tangle](root://the-tangle/0.1/introduction/overview.md).

Transactions in the Tangle have a hierarchy, whereby one transaction is a **child** and the branch and trunk transactions are its **parents**. By referencing a transaction, a child approves its parents because tip selection causes the IRI node to validate them and their history.

Transactions aren't considered confirmed until they're referenced by a transaction that was created by [the Coordinator](root://the-tangle/0.1/concepts/the-coordinator.md).



