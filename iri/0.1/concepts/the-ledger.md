# The ledger

**Nodes keep a record of all valid transactions that they receive by storing them in a ledger, which is an embedded, append-only RocksDB database. The collective database of all nodes in an IOTA network makes up the Tangle.**

The ledger is the primary data source for a node. The data in the ledger is a complete history of all the valid transactions that a node has received.

## Ledger solidification

Ledger solidification is the process by which a node receives the history of all [milestones](root://the-tangle/0.1/concepts/the-coordinator.md) in the [Tangle](root://the-tangle/0.1/introduction/overview.md).

When a node starts running, it starts to request the transactions that each milestone references (its history), starting from an **entry point milestone** and ending at the latest one.

:::info:
References are defined in a transaction's [`branchTransaction` and `trunkTransaction` fields](root://iota-basics/0.1/references/structure-of-a-transaction.md).
:::

When a node has the milestone's branch and trunk, it starts to request all the transactions that those transactions reference. This process continues for each transaction until the node reaches the entry point milestone. At this point, the node marks that milestone as **solid**, and starts the process again from the next one.

The older the entry point milestone, the longer solidification takes.

## When is a ledger synchronized?

An IRI node is considered synchronized when it has solidified all the milestones up to the latest one.

You can find out if a node is synchronzed by checking that its `latestMilestoneIndex` field is equal to the `latestSolidSubtangleMilestoneIndex` field.

The `latestMilestoneIndex` field is the index of the latest milestone that the IRI has received from its neighbors.

The `latestSolidSubtangleMilestoneIndex` field is the index of the latest milestone for which the IRI node has all the transactions that the milestone directly and indirectly references.

:::info:
The `getNodeInfo` API endpoint returns this information. Try [interacting with an IRI node](../how-to-guides/interact-with-an-iri-node.md) to see this information.
:::
