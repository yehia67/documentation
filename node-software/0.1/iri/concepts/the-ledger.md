# The ledger

**Nodes attach transactions to the Tangle by appending them to their local append-only RocksDB database called the ledger.**

When a node receives a new transaction, it checks that it has the history its children. If the node is missing any transactions, it starts to ask its neighbors for them in a process called solidification.

## Solidification

Solidification is the process by which a node receives the history of all [milestones](root://dev-essentials/0.1/concepts/the-tangle.md#milestones) in the [Tangle](root://dev-essentials/0.1/concepts/the-tangle.md).

When a node starts running, it starts to request the transactions that each milestone references (its history), starting from an **entry point milestone** and ending at the latest one.

:::info:
References are defined in a transaction's [`branchTransaction` and `trunkTransaction` fields](root://dev-essentials/0.1/references/structure-of-a-transaction.md).
:::

When a node has the milestone's branch and trunk, it starts to request all the transactions that those transactions reference. This process continues for each transaction until the node reaches the entry point milestone. At this point, the node marks that milestone as **solid**, and starts the process again from the next one.

The older the entry point milestone, the longer solidification takes.

## When is a node synchronized?

An IRI node is considered synchronized when it has solidified all the milestones up to the latest one.

You can find out if a node is synchronized by checking that its `latestMilestoneIndex` field is equal to the `latestSolidSubtangleMilestoneIndex` field.

The `latestMilestoneIndex` field is the index of the latest milestone that the IRI has received from its neighbors.

The `latestSolidSubtangleMilestoneIndex` field is the index of the latest milestone for which the IRI node has all the transactions that the milestone directly and indirectly references.

:::info:
The `getNodeInfo` API endpoint returns this information. Try [interacting with an IRI node](../how-to-guides/interact-with-an-iri-node.md) to see this information.
:::
