# cIRI (C IOTA reference implementation) overview

cIRI fulfills the same functionality as [IRI](root://iri/0.1/introduction/overview.md).
cIRI uses different technologies than IRI.
Instead of Java, cIRI is written in C. This is why it is called cIRI.
While IRI uses [RocksDB](https://rocksdb.org/) as database, cIRI uses [SQLite](https://sqlite.org/index.html).
cIRI is also designed to run on single board computers with less resources. 
cIRI does not have an API layer at the moment. This means, the REST- and ZMQ-API are not supported at the moment.
Therefore, clients, for example the [Trinity wallet](root://trinity/0.1/introduction/overview.md), cannot connect to cIRI nodes at the moment. 