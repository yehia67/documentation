# What is IOTA?

**IOTA is a distributed ledger technology that allows devices in an IOTA network to transfer immutable data and value among each other for free.**

IOTA aims to improve efficiency, increase production, and ensure data integrity in a machine-to-machine economy.

<dl><dt>machine-to-machine economy</dt><dd>Economy in which any device can transfer data and value to other devices without human intervention.</dd></dl>

To see IOTA in action, watch [this video](https://www.youtube.com/embed/Gr-LstcDcAw) about how it can improve supply chains.

## How does IOTA work?

To transfer anything in an IOTA network you need to send a node an instruction, called a transaction, which can contain data and/or IOTA tokens.

The nodes in an IOTA network are a distributed network of devices that gossip information among each other. So, when one node, no matter where it is in the world, receives a transaction, it will be forwarded to every other node in the network. This way, all nodes in the same IOTA network can validate and store all transactions.

The collection of transactions that the nodes store is called the Tangle, and only nodes have direct access to it.

As a result, the IOTA protocol uses a client/server model where clients connect to nodes to request access to the Tangle.

Clients are the users of an IOTA network. All clients have a unique [seed](../introduction/what-is-a-seed.md), which is a master key to their addresses. When any client wants to send data or tokens to another, that client must send groups of related [transactions](../introduction/what-is-a-transaction.md) called [bundles](../introduction/what-is-a-bundle.md) to a [node](../introduction/what-is-a-node.md).

Nodes then [validate the transactions](root://node-software/0.1/iri/concepts/transaction-validation.md) and attach them to [the Tangle](../introduction/what-is-the-tangle.md), where they can be confirmed.

## What is the IOTA token?

At its most basic level, the IOTA token is a record of ownership that's held by the nodes in an IOTA network.

    ADDRESS....ENDOFADDRESS;1000

On the left of the semicolon is an address. These are unique to each client in the network. On the right of the semicolon is an amount of IOTA tokens that belong to that address, in this case 1,000 tokens.

## What makes the IOTA token valuable?

The IOTA token is valuable for the following reasons:

* **It's finite:** All nodes agree that a maximum of 2,779,530,283 277,761 tokens exist in the network. This maximum number is built into the network and can't ever be changed.
* **It's useful:** To transfer value in an IOTA network, you must use the IOTA token. 

## What are the benefits of IOTA?

IOTA is an open-source technology that can streamline, secure, and automate any process that sends data or transfers value among different devices.

### Trust

Each node in an IOTA network validates transactions, then sends them to other nodes that do the same. As a result, all valid transactions are agreed on by all nodes, removing the need to trust a single one in the network.

### Immutability

All transactions in the ledger are immutable and transparent.

### Security

IOTA uses quantum-resistant cryptography to secure the network and prevent attackers from stealing IOTA tokens.

IOTA networks are peer-to-peer networks. No central authority controls the ledger of transactions, instead all nodes hold a copy and automate the agreement on its contents through the IOTA protocol.

### Cost saving

IOTA is free to use. You don't need to pay a subscription, or sign a contract. Even transactions are feeless.

### Scalability

For each transaction that's appended to the ledger, two previous transactions are validated. This process makes IOTA incredibly scalable because the more new transactions that propagate through the network, the faster other transactions are validated.

## For what industries is IOTA useful?
Many industries such as the following could benefit from using IOTA:

* [Mobility](https://www.iota.org/verticals/mobility-automotive)
* [Global trade and supply chains](https://www.iota.org/verticals/global-trade-supply-chains)
* [Industrial IoT (Internet of things)](https://www.iota.org/verticals/industrial-iot)
* [Healthcare](https://www.iota.org/verticals/ehealth)
* [Energy](https://www.iota.org/verticals/smart-energy)


## How do I get started?

* [Start your IOTA journey](../tutorials/get-started.md)

* Take a look at some [applications that are already using IOTA](../references/use-cases.md)
