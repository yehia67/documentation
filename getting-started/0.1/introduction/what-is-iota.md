# What is IOTA?

**IOTA is a distributed ledger technology (DLT) that allows computers in an IOTA network to transfer tamper-proof data and value (IOTA tokens) among each other.**

IOTA aims to improve efficiency, increase production, and ensure data integrity in a machine-to-machine economy.

<dl><dt>machine-to-machine economy</dt><dd>Economy in which any computer can transfer data and value to other computers without human intervention.</dd></dl>

To see IOTA in action, watch [this video](https://www.youtube.com/embed/Gr-LstcDcAw) about how it can improve supply chains.

## How does IOTA work?

In an IOTA network, data and value is sent (by clients) and stored (by [IRI nodes](introduction/what-is-an-iri-node.md) in packages called [transactions](introduction/what-is-a-transaction.md).

Clients send transactions to each other by using their secret password called a [seed](introduction/what-is-a-seed.md).

## What is the IOTA token?

At its most basic level, the IOTA token is a record of ownership that looks like this:

    ADDRESS....ENDOFADDRESS;1000

This record is kept on the [distributed ledger](introduction/what-is-dlt.md) of the [IOTA Mainnet network](references/iota-networks.md). It might look cryptic, but let's break it down. On the left of the semicolon is an address. These are unique to each client in the network. On the right of the semicolon is an amount of IOTA tokens that belong to that address, in this case 1,000 tokens.

You own IOTA tokens only when all IRI nodes [validate the transaction](root://iri/concepts/transaction-validation.md) that sent the tokens to you.

## What makes the IOTA token valuable?

The IOTA token is valuable for the following reasons:

* **It's finite:** All IRI nodes agree that a mamimum of 2,779,530,283 277,761 tokens exist in the network. This maximum number is built into the network and can't ever be changed.
* **It's useful:** To transfer value in an IOTA network, you must use the IOTA token. 

## What are the benefits of IOTA?

IOTA is an open-source technology that can streamline, secure, and automate any process that sends data or transfers value among different devices.

### Trust

All transactions in the ledger are immutible and transparent.

Each IRI node in an IOTA network validates and stores transactions in its ledger, then sends its contents to other IRI nodes that do the same. As a result, all valid transactions are agreed on by all nodes, removing the need to trust a single one in the network.

### Security

IOTA uses quantum-resistant cryptography to secure the network and prevent attackers from stealing IOTA tokens.

IOTA networks are peer-to-peer networks. No central authority controls the ledger of transactions, instead all IRI nodes hold a copy and run the software that contains the IOTA protcol to automate the agreement on its contents.

### Cost saving

IOTA is free to use. You don't need to pay a subscription, or sign a contract. Even transactions are free to send.

### Scalable

For each transaction that's appended to the ledger, two previous transactions are validated. This process makes IOTA incredibly scalable because the more new transactions that propagate through the network, the faster other transactions are validated.

This process forms a data structure called a directed acyclic graph (DAG), which we call [the Tangle](root://the-tangle/introduction/overview.md).

## For what industries is IOTA useful?
Many industries such as the following could benefit from using IOTA:

* [Mobility](https://www.iota.org/verticals/mobility-automotive)
* [Global trade and supply chains](https://www.iota.org/verticals/global-trade-supply-chains)
* [Industrial IoT (Internet of things)](https://www.iota.org/verticals/industrial-iot)
* [Healthcare](https://www.iota.org/verticals/ehealth)
* [Energy](https://www.iota.org/verticals/smart-energy)


## How do I get started?

* Start your IOTA journey by [sending your first data transaction with the Trinity wallet](tutorials/send-your-first-data-transaction-with-the-trinity-wallet.md).

* Take a look at some [applications that are already using IOTA](references/use-cases.md).

* Learn to program with IOTA by [sending your first data transaction with Node.js](tutorials/send-your-first-data-transaction-using-nodejs.md)!
