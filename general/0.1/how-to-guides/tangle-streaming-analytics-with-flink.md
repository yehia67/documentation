# Tangle streaming analytics with Apache Flink

**_Note:_** The tangle streaming libraries used in this guide are not recommended for production environments.
Feel free to contribute to the libraries, so that they eventually become production ready.

[Apache Flink](https://flink.apache.org/) is an open source stream processing framework.
This guide describes how you can connect Flink to the IOTA tangle.

## What data are available

Since the [Flink tangle source library](https://github.com/Citrullin/flink-tangle-source) uses the ZMQ API, all
[ZMQ events](https://docs.iota.org/docs/iri/0.1/references/zmq-events) are therefore also available in Flink.
The Flink streaming library uses the [ZeroMQMessageParser](https://github.com/Citrullin/tangle-streaming/blob/master/src/main/scala/org/iota/tangle/stream/ZeroMQMessageParser.scala)
from the [Tangle streaming library](https://github.com/Citrullin/tangle-streaming).
All ZMQ event messages are wrapped in classes which are generated from [protobuf schema files](https://github.com/Citrullin/tangle-streaming/tree/master/src/main/protobuf).
Therefore all defined messages and fields in the protobuf files are also available as property in the class instances.

