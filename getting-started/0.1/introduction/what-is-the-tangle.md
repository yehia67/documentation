# What is the Tangle?

**The Tangle is the name of the data structure that's formed when transactions are appended to the ledger.**

One of the validation critera of a transaction is that each one must directly reference two previous transactions (tip transactions). 

This referencing model forms a type of [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (DAG), in which each transaction represents a vertex.

![A directed acyclic graph](../dag.png)

In this diagram, transaction 5 is **directly** referenced by transaction 6. Because transaction 5 directly references transaction 3, transaction 3 is **indirectly** referenced by transaction 6.

Tip transactions are chosen by IRI nodes during a process called tip selection.

[Learn more about tip selection and the Tangle](root://the-tangle/0.1/introduction/overview.md).
