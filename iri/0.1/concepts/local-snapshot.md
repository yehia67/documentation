# Local snapshot

**A local snapshot is the process in which an IRI node records the state of its ledger in files.**

Local snapshots allow IRI nodes to do the following:
* Reduce the time it takes to [synchronize the ledger](concepts/the-ledger.md) on startup
* [Schedule the deletion of old transactions](how-to-guides/schedule-the-deletion-of-old-transactions.md) from the ledger

**Note:** Local snapshots are available only in version 1.6.0 and higher of the IRI.

## Snapshot files

IRI nodes use snapshot files when they start running in order to start synchronizing their ledgers with the rest of the network.

IRI nodes create snapshot files at regular intervals, depending on the values of the [`LOCAL_SNAPSHOTS_INTERVAL_SYNCED`](references/iri-configuration-options.md#local-snapshots-interval-synced) and [`LOCAL_SNAPSHOTS_INTERVAL_UNSYNCED`](references/iri-configuration-options.md#local-snapshots-interval-unsynced) configuration options.

When an IRI node does a local snapshot, it records the current state of its ledger in the following snapshot files:
* **snapshot.meta:** [A list of transaction data that the IRI uses to start synchonizing its ledger with neighbor IRI nodes](references/data-in-the-snapshot-metadata-file.md)
* **snapshot.state:** A list of all addresses that have a balance greater than 0 at the time of the local snapshot.

**Note:** These files are located in the path of the [`LOCAL_SNAPSHOTS_BASE_PATH`](references/iri-configuration-options.md#local-snapshots-base-path) configuration option.





