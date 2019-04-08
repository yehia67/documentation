# The C IOTA reference implementation overview

**The cIRI (C IOTA reference implementation) is open-source C software that fulfills the same functionality as the [IRI](root://iri/0.1/introduction/overview.md). The cIRI is designed to run on single board computers, which have limited resources. Therefore, the cIRI is more memory and storage efficient than the [IRI](root://iri/0.1/introduction/overview.md).**

One example of the differences between the IRI and the cIRI is the database. While the IRI uses [RocksDB](https://rocksdb.org/) as a database, cIRI uses [SQLite](https://sqlite.org/index.html).

## Limitations

At the moment, the cIRI does not have an API layer. Therefore, clients, for example the [Trinity wallet](root://trinity/0.1/introduction/overview.md), can't connect to cIRI nodes.
