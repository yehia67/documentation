# Ict overview

**The Ict (IOTA controlled agent) is a lightweight, modular implementation of the IOTA protocol that's designed for devices on the Internet of Things (IoT). This software is experimental and consists only of a gossip protocol that allows nodes to send and receive transactions among each other. Everything else such as consensus algorithms, enhancements, and applications can each be built on top of the Ict as an IOTA extension interface (IXI) module. This modular design allows nodes to use as many modules as they like, depending on the size of the device that they're running.**

:::info:
This software is being rewritten in the Rust programming language. As a result, the Ict will eventually be replaced by the new Rust version, which will be called **Bee**. Many of the features in the Ict will still exist in Bee, so feel free to test this network in the meantime.

To keep up to date with the development of Bee, [join the IOTA Discord server](https://discord.iota.org) and take a look at the `Bee-dev` channel.
:::

To reduce the storage overhead of nodes, the Ict doesn't store transactions in a database. Instead, the Ict streams and processes transactions in a queue. Depending on the node's available memory during runtime, the Ict prunes transactions from the queue in the order of first in first out (FIFO).

The Ict consists of the following:

* Gossip protocol
* IXI

## Gossip protocol

Nodes communicate with their neighbors through a gossip protocol, which allows them to forward transactions onto the rest of the network.

To allow small IoT devices to run the Ict, it does not store a persistent database of transactions. Instead, Ict exchanges transactions with its neighbors and stores them only while it has memory during runtime. 

## IOTA extension interface

The IXI is an API that allows you to build modules, which extend the functionality of the core Ict.

IXI modules can filter through transactions or even create and send their own transactions. For example, to build a permanode (a node that permanently stores all transactions), one could write all received transactions into a database.

## Limitations

Because the Ict network is experimental, keep the following information in mind:

* You can't connect to Ict nodes using Trinity
* The Ict is separate and incompatible with other node software such as IRI
* At the moment, you can't transfer the IOTA token on the Ict network
