# Chronicle overview

**Chronicle is a permanode solution that allows you to store all transactions that reach an [IRI node](root://node-software/0.1/iri/introduction/overview.md) in a distributed database that's secure and that scales well.**

## What is a permanode?

A permanode stores the full history of the Tangle and enables applications to search the data through an extended API.

## Why run Chronicle?

IOTA is a permissionless network. Anyone can store any amount of data on the Tangle for free (just a small amount of [proof of work](root://dev-essentials/0.1/concepts/minimum-weight-magnitude.md) per transaction).

Over time, the ledger of an IRI node accumulates many transactions, which often cause it to become larger than the node's available memory. To stop the ledger from becoming too large, these nodes often do [local snapshots](root://node-software/0.1/iri/concepts/local-snapshot.md) that prune old transactions.

For many business use cases, data in the IOTA Tangle needs to be stored for longer periods of time. For example, financial data must be stored for 10 years in some cases, and identity data needs to be kept for the lifetime of the identity.

Chronicle makes it easy for node owners to store all the IOTA transactions in a secure, scalable, and distributed Scylla database.

:::info:
Chronicle will be ported to Rust to align with the future strategy of the IOTA technology stack.
:::

:::info:
[Ready to run Chronicle](../how-to-guides/get-started.md)?
:::

## How Chronicle works

Chronicle receives transactions from IRI nodes through the `tx_trytes` [ZMQ event](root://node-software/0.1/iri/references/zmq-events.md). When Chronicle receives transactions, it processes them through an [Elixir](https://elixir-lang.org/) umbrella project, then it stores them in [ScyllaDB](https://www.scylladb.com/).

ScyllaDB takes care of the big data concerns such as partitioning, replication, in-memory processing, and consistency.

Elixir provides web development tools and embedded software development tools plus a network that can be extended by building microservices.

When you send a data request to a Chronicle node, it requests the data from the ScyllaDB, then formats and returns you the response.

![Chronicle architecture](../images/architecture.png)

## How ScyllaDB works

[ScyllaDB](https://docs.scylladb.com/using-scylla/) is a real-time, big data database featuring high throughput and low latency.

Data is organized into rows and columns in a table, using the [primary key, the partition key, and the clustering key](http://sudotutorials.com/tutorials/cassandra/cassandra-primary-key-cluster-key-partition-key.html).

The primary key is a unique identifier for each row in a table. A partition key indicates which nodes store a row of data. Clustering keys sort data into a partition and affect how columns are ordered.

Storing and retrieving data is faster when the data is organized into distinct collections called shards. A Scylla partition is a logical storage unit that holds the rows identified by a partition key. A shard is a group of data with the same partition key. 

To ensure reliability and fault tolerance, Scylla stores data replicas on multiple nodes. These nodes are called replica nodes. Partitions are repeated on replica nodes. You can set the number of replicas by setting the replication factor (RF).

:::info:
[Learn more about fault tolerance in Scylla](https://docs.scylladb.com/architecture/architecture-fault-tolerance/).
:::

![Data flow in Chronicle](../images/dataflow.png)

## Next steps

[Run Chronicle](../how-to-guides/get-started.md) to get started with storing transactions.
