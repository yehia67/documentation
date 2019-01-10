**Neighbors are IRI nodes that are mutually connected and that communicate directly with each other on the same IOTA network.**

IRI nodes communicate with their neighbors through a gossip protocol to inform each other of the transactions in their [ledger](concepts/the-ledger.md). This process allows neighbors to reach a consensus on the state of their ledgers.

<dl><dt>gossip protocol</dt><dd>A peer-to-peer communication protocol that allows computers in the same network to share data.</dd></dl>

As well as sending transactions to neighbors, IRI nodes request transactions that they're missing from neighbors. If an IRI node is missing any information about a transaction during [validation](concepts/transaction-validation.md) or [tip selection](concepts/tip-selection.md), the IRI node asks its neighbors for it, and if its neighbors are missing the information, those neighbors will ask their neighbors, and so on.

When IRI nodes have the same valid transactions in their ledgers, they have reached a consensus.

