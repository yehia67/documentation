# What is the Tangle?

**The Tangle is the history of IOTA transactions that's stored by all nodes on the same IOTA network. Before you send a bundle to a node, you ask it to select two existing tail transactions from its ledger. Then, when you attach your transactions to those ones, they become a part of the Tangle.**

This Tangle is a [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (DAG), in which each transaction represents a vertex (a numbered box).

![A directed acyclic graph](../images/dag.png)

In this diagram, transaction 5 is attached to transactions 2 and 3. So, transaction 5 **directly** references transactions 2 and 3.

Transaction 6 is attached to transaction 5 (and another transaction that's not shown). So, transaction 6 **indirectly** references transaction 3 (through transaction 5).

## How a transaction becomes confirmed

Transactions in the Tangle can be in one of two states: Pending or confirmed.

When you send a bundle to a node, that bundle is pending and the node doesn't update the balances of the affected addresses until it's confirmed.

To go from a pending state to a confirmed state, nodes must reach consensus on the state of a transaction.

At the moment, nodes reach a consensus on transactions that are **directly or indirectly referenced by a milestone** (transaction that's created and sent by the Coordinator).

:::info:
If transaction 6 were a milestone, then transaction 5, 3, 2, and 1 would all be confirmed and considered final.
::: 

Learn more about [the Coordinator](root://the-tangle/0.1/concepts/the-coordinator.md), [tip selection](root://the-tangle/0.1/concepts/tip-selection.md).

