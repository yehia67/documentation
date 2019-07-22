# What is IOTA?

**IOTA is a distributed ledger technology that allows devices in an IOTA network to transfer immutable data and value among each other for free.**

IOTA aims to improve efficiency, increase production, and ensure data integrity in a machine-to-machine economy.

<dl><dt>machine-to-machine economy</dt><dd>Economy in which any device can transfer data and value to other devices without human intervention.</dd></dl>

To see IOTA in action, watch [this video](https://www.youtube.com/embed/Gr-LstcDcAw) about how it can improve supply chains.

## How does IOTA work?

Clients send groups of related [transactions](../introduction/what-is-a-transaction.md) called [bundles](../introduction/what-is-a-bundle.md) to [nodes](../introduction/what-is-a-node.md). The transactions in a bundle can instruct the node to transfer IOTA tokens from one address to another, or they can simply contain data. These addresses are derived from a client's unique secret password called a [seed](../introduction/what-is-a-seed.md).

Nodes are responsible for [validating transactions](root://node-software/0.1/iri/concepts/transaction-validation.md) and attaching them to [the Tangle](../introduction/what-is-the-tangle.md).

When a bundle is confirmed, the nodes update the balances of any addresses that appear in that bundle's transactions.

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
