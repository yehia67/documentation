# What is the Tangle?

**The Tangle is the immutable data structure that contains a history of IOTA transactions. All nodes in an IOTA network store a copy of the Tangle in their ledgers and can read from it and attach new transactions to it.**

Transactions on the Tangle are immutable because their contents are cryptographically referenced to the history of two other transactions. So, if any transaction were to change in that history, all the references would be broken.

![A directed acyclic graph](../images/dag.png)

In this diagram, each numbered box is a transaction. Transaction 5 **directly** references transactions 2 and 3, and transaction 6 **indirectly** references transaction 3 (through transaction 5).

## How a transaction becomes confirmed

Transactions on the Tangle can be in one of two states: Pending or confirmed.

When you send a bundle to a node, that bundle is pending and the node doesn't update the balances of the affected addresses until it's confirmed.

To go from a pending state to a confirmed state, nodes must reach consensus on the state of a transaction.

At the moment, nodes reach a consensus on transactions that are **directly or indirectly referenced by a milestone** (transaction that's created and sent by the Coordinator).

:::info:
If transaction 6 were a milestone, then transaction 5, 3, 2, and 1 would all be confirmed.
::: 

Learn more about [the Tangle](root://dev-essentials/0.1/concepts/the-tangle.md).

