# Local snapshot

A local snapshot is the process in which an IRI node records the [state of its ledger](concepts/the-distributed-ledger.md) at a given time.

[Snapshot files](references/data-in-the-snapshot-files.md) contain data about milestone transactions and normal transactions that an IRI node has already seen. When an IRI node restarts or starts running, it can read these files and use the transactions as a starting point for synchronizing its ledger with its neighbors.

The benefits of doing a local snapshot are the following:

- If an IRI node restarts for any reason, it can synchronize its ledger with neighbor IRI nodes faster than without doing a local snapshot
- If an IRI node's ledger becomes too large, it can use the snapshot files to delete any old transactions

**Note:** Local snapshots are available only in version 1.6.0 and higher of the IRI.

## Synchronize faster with the network

To synchronize with the network, IRI nodes use a starting point to request every confirmed transaction and milestone transaction from their neighbors, validate the transactions, and append them to their ledgers.

The starting point for requesting transactions from neighbors affects the speed at which an IRI node will synchronize.

Without snapshot files, an IRI node would start from the milestone in the `startMilestoneIndex` variable. (The `startMilestoneIndex` variable is hard-coded into each version of the IRI.)

With snapshot files, an IRI node would synchronize its ledger from the milestones in the snapshot.meta file. Therefore, as long as an IRI node creates regular local snapshots, this process decreases the time it takes for an IRI node to synchronize.

## Reduce the size of the ledger

An IRI node can use the snapshot files to delete old transactions from its ledger.

Over time, the [ledger](concepts/the-distributed-ledger.md) of an IRI node accumulates many valid transactions, which often cause the ledger size to become larger than the IRI node's available memory. To stop the ledger from becoming too large, you can choose to create local snapshots at regular intervals. This option is enabled by default in the [`LOCAL_SNAPSHOTS` configuration parameters](references/iri-configuration-options#local-snapshots-enabled).

Transactions are deleted only if they come before a milestone transaction that is older than the sum of the following calculation:

[`LOCAL_SNAPSHOTS_DEPTH`](references/iri-configuration-options#local-snapshots-depth) +
[`LOCAL_SNAPSHOTS_PRUNING_DELAY`](references/iri-configuration-options#local-snapshots-pruning-delay)

## Example scenario of a local snapshot

Configuration parameters:

* `LOCAL_SNAPSHOTS_PRUNING_DELAY` = 50,000
* `LOCAL_SNAPSHOTS_DEPTH` = 100

Current milestone index:

* 942,132

In this scenario, an IRI node would start to remove transactions that are older than milestone 992,232 (942,132 + 50,100).

In the snapshot.meta file, the IRI node adds data about the last 100 milestones (milestones 942,032 to 942,132).

In the snapshot.state file, the IRI node adds a list of all addresses and their balance as of milestone index 942,032.

When the IRI node restarts, it can use the milestones in the snapshot.meta file as a starting point for sychronizing its ledger with its neighbors.
