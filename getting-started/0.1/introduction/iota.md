# What is IOTA?

**IOTA is a distributed ledger technology that allows devices in an IOTA network to transfer immutable data and value among each other for zero fees.**

IOTA aims to improve efficiency, increase production, and ensure data integrity in a machine-to-machine economy where any device can transfer data and value to other devices without human intervention.

<iframe src="https://www.youtube.com/embed/Gr-LstcDcAw" width="400" height="200"></iframe>

## How does IOTA work?

IOTA is permissionless, which means that anyone can use the network to make payments or send data. You don't need to sign up, give away your personal details, or pay a subscription. Instead, everything that you send to an IOTA network is verified through cryptography.

The cryptographic functions in the IOTA protocol allow you to benefit from the following:

* **Authenticity:** Prove that you sent a transaction and that you own the data or IOTA tokens in it
* **Integrity:** Prove that your transaction is unchanged
* **Confidentiality:** Control who has access to your data through encryption

To use IOTA, all you need is a [seed](../introduction/seeds.md), which is the master key to the cryptographic functions in IOTA.

When you have a seed, you can use it to create addresses to which you can transfer data or IOTA tokens.

To transfer anything in IOTA, you package an instruction into an object called a [transaction](../introduction/transactions.md). Then, you group that transaction into a [bundle](../introduction/bundles.md), and send it to a [node](../introduction/nodes.md), which is responsible for validating it.

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

IOTA’s goal is to establish a DLT for the Internet of Things (IoT). The following characteristics are fundamental to this vision:

Scalable. Process a substantial number of transactions per second across a large network of nodes, with fast confirmation times.
Lightweight. Low-power devices should be able to directly participate in the network.
Feeless. Sending transactions should not require payment of network fees.
Traditional DLTs have limiting factors that make them unsuitable for attaining IOTA’s goal.

The blockchain data structure. The inherent limitation on the speed of blockchain networks is commonly referred to as the “blockchain bottleneck.” In blockchain, there is only one site where new transactions can be attached — the end of the chain. The resulting negative effect on network throughput is demonstrated in this simple visual:

In contrast, the core data structure in IOTA is highly scalable. This is made possible with one simple rule: each transaction references and approves two existing transactions. This rule defines IOTA’s underlying data structure — the Tangle — which, in mathematical terms, is known as a directed acyclic graph (DAG).

Rather than being limited by a single site for attaching new transactions, DAGs offer multiple sites where transactions can be attached. Users can continue to attach new transactions on various parts of the Tangle without waiting for other transactions to confirm:


The consensus mechanism. In Blockchain, Nakamoto consensus splits the network into miners and users. Miners consume large amounts of computing power completing the Proof-of-Work (PoW) required to chain the blocks together. Miners are incentivized by the fees users are willing to pay to have their transaction included in a block. This fee-based incentive structure would be a significant barrier in a machine-to-machine economy, in which micropayment values between machines may be lower than the fees incurred.
In IOTA there is no distinction between miners and users. All nodes can participate in consensus. This means that an IOTA node has a completely different role than a Bitcoin miner. IOTA nodes only perform basic operations that do not require much computational power (e.g. storing the ledger, validating transactions). Users can set up a node with minimal cost and actively participate in network consensus, and thereby bolster the security of the network.

The definition of a consensus layer — describing how nodes agree on which transactions are trustworthy — is at the core of IOTA. In the current IOTA implementation, nodes trust transactions which are referenced and approved by milestones, issued by the Coordinator. The use of this centralized “finality device” has been necessary to provide security during the network’s infancy.
