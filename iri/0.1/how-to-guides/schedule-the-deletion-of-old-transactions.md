# Schedule the deletion of old transactions

**Over time, the ledger of an IRI node accumulates many valid transactions, which often cause the ledger size to become larger than the IRI node's available memory. To stop the ledger from becoming too large, you can choose to delete old transactions from the ledger at regular intervals.**

By default, IRI nodes delete transactions that are older than around 30 days.

Transactions are deleted only if they come before a milestone transaction that is older than the result of the following calculation:

current milestone index - ([`LOCAL_SNAPSHOTS_DEPTH`](references/iri-configuration-options#local-snapshots-depth) +
[`LOCAL_SNAPSHOTS_PRUNING_DELAY`](references/iri-configuration-options#local-snapshots-pruning-delay))

## Prerequisites

You must stop the IRI before making changes to the configuration options.

Milestones are sent approximately every minute. Therefore, to calculate the number of days that transactions will remain in the ledger, do the following calculations:

 * `LOCAL_SNAPSHOTS_PRUNING_DELAY` + `LOCAL_SNAPSHOTS_DEPTH` = total milestone index

 * Total milestone index / 60 = total in minutes
 
 * Total in minutes / 24 = total in days

<hr>

1. Make sure that the `LOCAL_SNAPSHOTS_ENABLED` and the `LOCAL_SNAPSHOTS_PRUNING_ENABLED` configuration options are set to `true`
2. Change the value of the [`LOCAL_SNAPSHOTS_PRUNING_DELAY`] and the `LOCAL_SNAPSHOTS_DEPTH` (references/iri-configuration-options#local-snapshots-pruning-delay) configuration options

## Example scenario

Configuration parameters:

* `LOCAL_SNAPSHOTS_PRUNING_DELAY` = 50,000
* `LOCAL_SNAPSHOTS_DEPTH` = 100

Current milestone index:

* 990, 100

In this scenario, the sum of `LOCAL_SNAPSHOTS_PRUNING_DELAY` + `LOCAL_SNAPSHOTS_DEPTH` is 50, 100. Therefore, an IRI node will remove transactions that are older than milestone 940, 000 (990, 100 - 50,100). As a result all transactions between milestones 940, 000 and 990, 100 will be kept in the ledger.

In the [snapshot.meta file](references/data-in-the-snapshot-metadata-file.md), the IRI node will add data about the [solid entrypoints](references/data-in-the-snapshot-metadata-file.md#solid-entrypoint) and the 100 [seen milestones](references/data-in-the-snapshot-metadata-file.md#seen-milestone).

In the snapshot.state file, the IRI node adds a list of all addresses and their balances as of milestone 940, 000.

When the IRI node restarts, it starts by solidifying all transactions that are referenced by the seen milestones. When the IRI reaches a solid entrypoint, it stops solidyfing those transactions.

<dl><dt>solidify</dt><dd>Request transactions from neighbor IRI nodes until all transactions and their referenced transactions are stored in the ledger.</dd></dl>