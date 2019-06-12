# Peer-to-peer energy grid

**Although the supply of energy is often automated, the payment system is expensive to integrate and often requires manual intervention. By creating a peer-to-peer energy grid with IOTA, you can automate the transfer of power and the payment for that power. This automation makes your infrastructure more dynamic and easier to update.**

This blueprint demonstrates how entities in a peer-to-peer (P2P) energy grid can trade energy. The distributed and machine-based nature of the P2P energy grid make this an ideal use case for IOTA. Using IOTA technologies, you can create an infrastructure where even low-powered devices can communicate with the grid in a traceable and immutable way.

Trading energy on a P2P energy grid involves four high-level entities:

**Entity** | **Role**
---|---
**Source**|Generate electricity such as solar or wind for a producer|
**Producer**| Manage several sources and receive payment from the grid
**Consumer** |Use the power provided by the grid in return for payment|
**Grid**| Coordinate the distribution of power from the producers to the consumers, and distribute payments|
 

![P2P Energy PoC - Use Case Picture](../images/p2p_use_case.png)

:::info:
This blueprint can be replicated in any scenario where a resource is distributed to consumers in return for payment, for example water supply.

The full deployment instructions for this blueprint will be available in May.
:::

## Glossary

* IRI - The IOTA reference implementation is the reference implementation of the IOTA node software
* MAM - Masked Authentication Messaging is a second layer data communication protocol which adds functionality to emit and access an encrypted data stream, like RSS, over the Tangle
* source - an entity in the PoC that supplied energy
* producer - an entity in the PoC that aggregates information from Sources and supplied that information to the Grid
* consumer - an entity that uses power from the Grid and is charged for its use
* grid - the grid processes information from Producers and Consumers to create payment channels

## Additional resources

---------------
#### iota.js client library ####
[Link](root://iota-js/0.1/README.md)

Learn how to use the iota.js client library.
---
#### MAM eloquently explained ####
[Link](https://blog.iota.org/introducing-masked-authenticated-messaging-e55c1822d50e)

Learn what masked authenticated messaging is.
---
#### MAM GitHub repository ####
[Link](https://github.com/iotaledger/mam.client.js)

Read the code and some quickstart instructions to test MAM with JavaScript.
---------------


