# What is the Tangle?

**Before you send a bundle, you must attach your transactions to two existing ones in the network. You do this so that the node can walk on the connections to find and validate each transaction. These connections form a data structure that's called the Tangle. Transactions in the Tangle can be in one of two states: Pending or confirmed.**

This model forms a type of [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (DAG), in which each transaction represents a vertex.

![A directed acyclic graph](../images/dag.png)

In this diagram, transaction 5 is attached to transactions 2 and 3. So, transaction 5 **directly** references transactions 2 and 3.

Transaction 6 is attached to transaction 5 (and another transaction that's not shown). So, transaction 6 **indirectly** references transaction 3 (through transaction 5).

## How a transaction becomes confirmed

When you send a transfer bundle to a node, it doesn't update the balances of the affected addresses straight away.

Nodes do not transfer IOTA tokens until all transactions in the bundle are confirmed.

To go from a pending state to a confirmed state, nodes must reach consensus on the state of a transaction.

At the moment, nodes reach a consensus on transactions that are **directly or indirectly referenced by a milestone** (transaction that's created and sent by the Coordinator).

:::info:
If transaction 6 were a milestone, then transaction 5, 3, 2, and 1 would all be confirmed and considered final.
::: 

Learn more about [the Coordinator](root://the-tangle/0.1/concepts/the-coordinator.md), [tip selection](root://the-tangle/0.1/concepts/tip-selection.md).

