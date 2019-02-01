# The Tangle overview

**The Tangle is the data structure that's formed by the connections among transactions in the distributed ledger. The connections allows an IRI node to traverse transactions and validate each one.**

The data structure that forms the Tangle is a type of [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (DAG), and it was formally introduced in the IOTA whitepaper by Professor Serguei Popov in 2015.

In the Tangle, transactions are connected to each other by reference in their [`branchTransaction` and `trunkTransaction` fields](root://iota-basics/0.1/references/structure-of-a-transaction.md). References form a hierarchy, whereby if one transaction is a **child**, the branch and trunk transactions are its **parents**.

A reference can be direct or indirect. A direct reference is one that exists between a child and its parents. An indirect reference is one that exists between a child and any of its grandparents.

The more direct or indirect references that a transaction has, the more likely it is to be chosen during [tip selection](../concepts/tip-selection.md). A transaction is considered confirmed when it's chosen during tip selection and one of it's parents is a milestone, which was created by the [Coordinator](../concepts/the-coordinator.md).

## Further Research

The IOTA Foundation has an active research department that focuses on developing the Tangle and its related protocols.

* [Academic Papers](https://www.iota.org/research/academic-papers)
* [Roadmap](https://www.iota.org/research/roadmap)
