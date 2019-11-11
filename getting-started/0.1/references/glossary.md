# Glossary

**This glossary contains definitions specific to IOTA.**

Terms are listed in alphabetical order by category.

### Acronyms

<dl><dt>CTPS</dt><dd>Number of Confirmed Transactions Per Second</dd></dl>

<dl><dt>TPS</dt><dd>Number of Transactions Per Second processing through an [IRI node](#iota-terms)</dd></dl>

### Cryptography

<dl><dt>Curl</dt><dd>Main hash function that's used in IOTA. Curl is based on a sponge construction, which was invented by the [Keccak creators](https://en.wikipedia.org/wiki/SHA-3) (SHA-3). Curl is designed for the Internet of things (IoT).
</dd></dl>

<dl><dt>Kerl</dt><dd>Keccek-384 hash function that includes the additional conversion of its input and output from/to 243 trits to 48 bytes, using [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement).
</dd></dl>

## IOTA terms

<dl><dt>blowball</dt><dd>Tangle formation that consists of one central transaction, which is surrounded by a large number of tip transactions.</dd></dl>

<dl><dt>client</dt><dd>Device running software that connects to an IRI node to interact with an IOTA network and send transactions.</dd></dl>

<a name="subgraph"></a><dl><dt>subgraph</dt><dd>Section of the ledger that contains all transactions between a milestone transaction and tip transactions</dd></dl>

### Transactions

<dl><dt>approver</dt><dd>Transaction that directly references another transaction as its trunk transaction or branch transaction</dd></dl>

<dl><dt>future set</dt><dd>Group of transactions that approve the same transaction</dd></dl>

<dl><dt>inconsistent</dt><dd>State of a transaction when it leads to withdrawing non-available funds</dd></dl>

<dl><dt>inclusion state</dt><dd>Process that an [IRI node](#iota-terms) performs to check either the acceptance of a transaction or the confirmation of a transaction. Given a transaction and a list of tip transactions, the inclusion state is true if the tip transactions reference that transaction.</dd></dl>

<dl><dt>invalid</dt><dd>State of a transaction when it's either non-solid, inconsistent, or it references a transaction that's too old.</dd></dl>

<dl><dt>solid</dt><dd>State of a transaction when an IRI node has its entire history (all directly and indirectly referenced transactions) in its ledger</dd></dl>

<dl><dt>tail transaction</dt><dd>Transaction 0 in a bundle. [IRI nodes](#iota-terms) reconstruct and validate bundles by traversing the trunk transaction of each tail transaction.</dd></dl>

<dl><dt>weighted random walk</dt><dd>Algorithm that a [node](#iota-terms) uses during tip selection to find a path to a tip transaction in the ledger.</dd></dl>
