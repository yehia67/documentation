**IRI nodes keep a record of all valid transactions that they receive. These transactions are stored in a ledger, which is an embedded, append-only RocksDB database.**

To keep the [state of each IRI node's ledger](references/data-in-the-ledger.md) consistent, IRI nodes send all transaction that they receive to their [neighbors](concepts/neighbor-iri-node.md) so that those neighbors can validate and store the same transactions.

When IRI nodes have validated the same transactions in their ledgers, they have reached a consensus. This consensus forms the distributed ledger, and the state of the distributed ledger (the valid transactions in the ledger) forms the Tangle.
