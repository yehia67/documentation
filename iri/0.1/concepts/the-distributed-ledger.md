# The distributed ledger

IRI nodes keep a record of all valid transactions that they receive. These [transactions are stored in a ledger](references/data-in-the-ledger.md), which is an embedded, append-only database called [RocksDB](https://rocksdb.org/).

To keep the contents of each IRI node's ledger consistent, IRI nodes send all transaction that they receive to their neighbors.

When the majority of IRI nodes have the same valid transactions in their ledgers, they have reached a consensus. This consensus forms the distributed ledger.

## Consensus on the state of the ledger

To reach a consensus, IRI nodes communicate with their neighbors through a gossip protocol to inform each other of the transactions in their ledger.

<dl><dt>Gossip protocol</dt><dd>A peer-to-peer communication protocol that allows computers in the same network to share data.</dd></dl>

As well as sending transactions to neighbors, IRI nodes request transactions that they're missing from neighbors. If an IRI node is missing any information about a transaction during [validation](concepts/transaction-validation.md) or [tip selection](concepts/tip-selection.md), the IRI node asks its neighbors for it, and if its neighbors are missing the information, those neighbors will ask their neighbors, and so on.

When the majority of IRI nodes have the same valid transactions in their ledgers, they have reached a consensus.
