# What is IOTA?

**IOTA is a distributed ledger technology that allows devices in an IOTA network to transfer immutable data and value among each other for free.**

IOTA aims to improve efficiency, increase production, and ensure data integrity in a machine-to-machine economy.

<dl><dt>machine-to-machine economy</dt><dd>Economy in which any device can transfer data and value to other devices without human intervention.</dd></dl>

<iframe src="https://www.youtube.com/embed/Gr-LstcDcAw" width="400" height="200"></iframe>

## How does IOTA work?

IOTA is permissionless, which means that anyone can use the network to make payments or send data. You don't need to sign up, give away your personal details, or pay a subscription. Instead, everything that you send to an IOTA network is verified through cryptography. The cryptographic functions in the IOTA protocol allow you to benefit from the following:

* **Authenticity:** Prove that you sent a transaction and that you own the data or IOTA tokens in it
* **Integrity:** Prove that your transaction is unchanged
* **Confidentiality:** Control who has access to your data through encryption

To use IOTA, all you need is a [seed](../introduction/what-is-a-seed.md), which is the master key to the cryptographic functions in IOTA.

When you have a seed, you can use it to create addresses to which you can transfer data or IOTA tokens.

To transfer anything in IOTA, you package an instruction into an object called a [transaction](../introduction/what-is-a-transaction.md). Then, you group that transaction into a [bundle](../introduction/what-is-a-bundle.md), and send it to a [node](../introduction/what-is-a-node.md), which is responsible for validating it and carrying it out.

### Network basics

Nodes are the devices that make up an IOTA network. Like any distributed system, the nodes in an IOTA network are interconnected such that they gossip information among each other. So, when one node (no matter where it is in the world) receives a transaction, it will be forwarded to every other node in the network. This way, all nodes in the same IOTA network can validate all transactions and store them.

The collection of transactions that the nodes store is called [the Tangle](../introduction/what-is-the-tangle.md), and only nodes have direct access to it. The Tangle is a data structure called a directed acyclic graph (DAG), where each transaction references the hashes of two transactions that came before it. This way, all transactions are immutable and have a history of references that nodes can traverse to validate their trustworthiness.

Because only nodes have access to the Tangle, the IOTA protocol uses a client/server model where clients connect to nodes to request access to it.

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

Each transaction in the Tangle references the hashes of two previous ones. As a result, each transaction is commits itself to its references.

If the contents of any transaction were to change, the hashes would be invalid, making the transactions invalid.

### Security

IOTA uses quantum-resistant cryptography to secure the network and prevent attackers from stealing IOTA tokens.

IOTA networks are peer-to-peer networks. No central authority controls the ledger of transactions, instead all nodes hold a copy and automate the agreement on its contents through the IOTA protocol.

### Cost saving

IOTA is free to use. You don't need to pay a subscription, or sign a contract. Even transactions are feeless.

### Scalability

For each transaction that's attached to the Tangle, two previous transactions are validated. This process makes IOTA incredibly scalable because the more new transactions that propagate through the network, the faster other transactions are validated.

## For what industries is IOTA useful?
Many industries such as the following could benefit from using IOTA:

* [Mobility](https://www.iota.org/verticals/mobility-automotive)
* [Global trade and supply chains](https://www.iota.org/verticals/global-trade-supply-chains)
* [Industrial IoT (Internet of things)](https://www.iota.org/verticals/industrial-iot)
* [Healthcare](https://www.iota.org/verticals/ehealth)
* [Energy](https://www.iota.org/verticals/smart-energy)

## How do I get started?

* [Start your IOTA journey with our beginner tutorials](../tutorials/get-started.md)

* [Learn the essential concepts](root://dev-essentials/0.1/introduction/overview.md) that you need to develop applications on IOTA.

* Take a look at some [applications that are already using IOTA](../references/use-cases.md)
