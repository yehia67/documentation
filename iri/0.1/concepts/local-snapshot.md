**A local snapshot is the process in which an IRI node records the state of its ledger at a given time in snapshot files.**

Local snapshots are done by IRI nodes that have the [``LOCAL_SNAPSHOTS_ENABLED`](references/iri-configuration-options#local-snapshots-enabled) configuration option set to `true`.

Local snapshots increase the speed of ledger synchronization and give you the option of deleting old transactions from the ledger.

**Note:** Local snapshots are available only in version 1.6.0 and higher of the IRI.

## Snapshot files

Snapshot files are used by IRI nodes on startup to synchronize their ledgers with the rest of the network.

Snapshot files are created at regular intervals, depending on the values of the [`LOCAL_SNAPSHOTS_INTERVAL_SYNCED`](references/iri-configuration-options.md#local-snapshots-interval-synced) and [`LOCAL_SNAPSHOTS_INTERVAL_UNSYNCED`](references/iri-configuration-options.md#local-snapshots-interval-unsynced) configuration options.

When an IRI node does a local snapshot, it records the current state of its ledger in the following snapshot files:
* **snapshot.meta:** [Contents of the file](references/data-in-the-snapshot-metadata-file.md)
* **snapshot.state:** A list of all addresses that have a balance greater than 0.

**Note:** These files are located in the path of the [`LOCAL_SNAPSHOTS_BASE_PATH`](references/iri-configuration-options.md#local-snapshots-base-path) configuration option.

## Ledger synchronization

To synchronize their [ledgers](concepts/the-ledger.md) the network, IRI nodes request every transaction that directly or indirectly references an **entrypoint milestone** from their neighbors.

The older the entrypoint milestone, the longer synchronization takes.

Without a local snapshot, an IRI node uses the `startMilestoneIndex` variable as its entrypoint milestone. (The `startMilestoneIndex` variable is hard-coded into each version of the IRI.)

When an IRI node creates a snapshot file, the entrypoint milestone becomes the bootstrap milestone, which is newer than the `startMilestoneIndex` variable.

<dl><dt>bootstrap milestone</dt><dd>Milestone from which the IRI node creates the snapshot files.</dd></dl>

## Snapshot pruning

Over time, the [ledger](concepts/the-ledger.md) of an IRI node accumulates many valid transactions, which often cause the ledger size to become larger than the IRI node's available memory. To stop the ledger from becoming too large, you can choose to delete old transactions from the ledger at regular intervals.

By default, IRI nodes delete transactions that are older than around one month. To change the maximum age of transactions in the ledger, change the [`LOCAL_SNAPSHOTS_PRUNING_DELAY`](references/iri-configuration-options#local-snapshots-pruning-delay) configuration option.

Transactions are deleted only if they come before a milestone transaction that is older than the result of the following calculation:

current milestone index - ([`LOCAL_SNAPSHOTS_DEPTH`](references/iri-configuration-options#local-snapshots-depth) +
[`LOCAL_SNAPSHOTS_PRUNING_DELAY`](references/iri-configuration-options#local-snapshots-pruning-delay))

### Example scenario of snapshot pruning

Configuration parameters:

* `LOCAL_SNAPSHOTS_PRUNING_DELAY` = 50,000
* `LOCAL_SNAPSHOTS_DEPTH` = 100

Current milestone index:

* 990, 100

In this scenario, the sum of `LOCAL_SNAPSHOTS_PRUNING_DELAY` + `LOCAL_SNAPSHOTS_DEPTH` is 50, 100. Therefore, an IRI node will remove transactions that are older than milestone 940, 000 (990, 100 - 50,100). As a result all transactions between milestones 940, 000 and 990, 100 will be kept in the ledger.

In the [snapshot.meta file](references/data-in-the-snapshot-metadata-file.md), the IRI node will add data about the [solid entrypoints](references/data-in-the-snapshot-metadata-file.md#solid-entrypoint) and the 100 [seen milestones](references/data-in-the-snapshot-metadata-file.md#seen-milestone).

In the snapshot.state file, the IRI node adds a list of all addresses and their balances as of milestone 940, 000.

When the IRI node restarts, it starts by solidifying all transactions that are referenced by the seen milestones. When the IRI reaches a solid entrypoint, it stops solidyfing the transactions and considers its ledger synchronized.

<dl><dt>solidify</dt><dd>Request transactions from neighbor IRI nodes until all transactions and their referenced transactions are stored in the ledger.</dd></dl>





