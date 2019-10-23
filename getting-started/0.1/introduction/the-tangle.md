# What is the Tangle?

**The Tangle is the immutable data structure that contains a history of IOTA transactions. All nodes in an IOTA network store a copy of the Tangle in their ledgers, read from it, attach new transactions to it, and reach a [consensus](root://dev-essentials/0.1/concepts/consensus.md) on its contents.**

The Tangle is a data structure called a directed acyclic graph (DAG), where each transaction references the transaction hashes of two existing transactions. This way, all transactions are immutable because if any transaction in the Tangle were to change, all the hashes would be invalidated.

In this image of the Tangle, the numbered boxes represent the tail transactions of [bundles](../introduction/bundles.md). The transactions on the left come first in the sequence, and the transactions on the right come after.

![A directed acyclic graph](../images/dag.png)

The arrows represent the references among transactions, which can be one of two types:

* **Direct:** Connects a transaction with its reference transactions. Fo example, transaction 5 **directly** references transactions 2 and 3

* **Indirect:** Connects a transaction with any of the transactions in its reference transactions' history. For example, transaction 6 **indirectly** references transaction 3 (through transaction 5).


