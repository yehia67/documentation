# The Tangle overview

**The Tangle is the data structure that's formed by the connections among transactions in the ledger. These connections allow an IRI node to traverse transactions and validate them.**

The data structure that forms the Tangle is a type of [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (DAG), and it was formally introduced in the IOTA whitepaper by Professor Serguei Popov in 2015.

## Transaction hierarchy

In the Tangle, transactions are connected to each other by reference through their [`branchTransaction` and `trunkTransaction` fields](root://iota-basics/0.1/references/structure-of-a-transaction.md). These fields contain the transaction hash of either a transaction in the same bundle or a tip transaction that was returned during [tip selection](../concepts/tip-selection.md).

References form a hierarchy, whereby if a transaction is a **child**, the branch and trunk transactions are its **parents**.

A reference can be direct or indirect. A direct reference is one that exists between a child and its parents. An indirect reference is one that exists between a child and any of its grandparents.

![A directed acyclic graph](../dag.png)

In this diagram, transaction 5 is a **parent** of transaction 6. Because transaction 5 directly references transaction 3, transaction 3 is a **grandparent** of transaction 6.

**Note:** Transaction 0 is the genesis transaction, which is the very first transaction in the Tangle.

## Bundle approvers

Each [bundle](root://iota-basics/0.1/concepts/structure-of-a-bundle.md) of transactions directly references two new transactions from an IRI node's ledger. These transactions are called tip transactions because they don't yet have any children.

An IRI node selects tip transactions by starting from an old transaction and traversing its children until it finds a tip transaction with no children. As a result, transactions in a bundle are **approvers** for the tip transactions that they reference.

## Transaction confirmation

A transaction is considered confirmed when it's approved by a [Coordinator](../concepts/the-coordinator.md)-issued milestone. Therefore, to be approved by a milestone, a transaction must first be selected during tip selection and added to a milestone's `branchTransaction` field or `trunkTransaction` field.

## Further Research

The IOTA Foundation has an active research department that focuses on developing the Tangle and its related protocols.

* [Academic Papers](https://www.iota.org/research/academic-papers)
* [Roadmap](https://www.iota.org/research/roadmap)
