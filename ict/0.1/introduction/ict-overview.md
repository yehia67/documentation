# Ict overview

**The Ict (IOTA controlled agent) is a lightweight, modular implementation of the IOTA protocol that's designed for small devices on the Internet of Things. The Ict consists of a gossip protocol that allows nodes to send and receive transactions among each other. Everything else such as consensus algorithms, enhancements, and applications can each be built on top of the Ict as an IOTA extension interface (IXI) module. This design allows nodes to use as many modules as they like, depending on the size of the device that they're running.**

:::info:
The Ict is separate and incompatible with other implementations such as IRI.

At the moment, you can send only zero-value transactions on the Ict network. As such, you can't transfer the IOTA token on it.
:::

To reduce the storage overhead of nodes, the Ict doesn't store transactions in a database. Instead, the Ict streams and processes transactions in a queue. Depending on the node's available memory during runtime, the Ict prunes transactions from the queue in the order of first in first out (FIFO).

The Ict consists of the following:

* Gossip protocol
* IXI

## Gossip protocol

Nodes communicate with their neighbors through a gossip protocol, which allows them to forward transactions onto the rest of the network.

To allow small IoT (Internet of Things) devices to run the Ict, it does not store a persistent database of transactions. Instead, Ict exchanges transactions with its neighbors and stores them only while it has memory during runtime. 

## IOTA extension interface

The IXI is an API that allows you to build modules which extend the functionality of the core Ict.

IXI modules can filter through transactions or even create and send their own transactions. For example, to build a permanode (a node that permanently stores all transactions), one could write all received transactions into a database.
