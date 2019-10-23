## Consensus

Nodes are responsible for validating transactions and their histories to make sure that they don't conflict. To validate a transaction, a node needs to have that transaction's history in its ledger.

Because the Tangle is distributed among all nodes in an IOTA network, some of them can have more or fewer transactions in their ledgers than other nodes. The transactions in any node's ledger make up its **view of the Tangle**.

So, to make sure that all nodes eventually have the same view of the Tangle, they forward any new transactions that they receive to their neighbors.

When a node has a transaction's entire history, the transaction is considered solid, which means that it can be considered for confirmation.

:::info:
Nodes don't need the entire history of a transaction, starting from the first ever transaction to consider it solid.

Instead, nodes need the history of a transaction up to a predefined one, which is called an entry point. When the transaction's history goes far back enough to reference an entry point, the node stops solidifying it.

An example of a predefined entry point is a [local snapshot](root://node-software/0.1/iri/concepts/local-snapshot.md).
:::

For a transaction to be considered confirmed, nodes must reach a consensus on when to consider it final before they can update the balances of addresses.

A transaction is considered confirmed when it's solid and it's directly or indirectly referenced by a transaction that's sent and signed by the [Coordinator](../concepts/the-coordinator.md).

:::info:
This means that the transaction must be selected during tip selection when the Coordinator is creating a new milestone.
:::