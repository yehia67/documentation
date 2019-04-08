# Tangle and data storage

**This blueprint describes a real solution for how to integrate permanent 3rd party data storage with the Tangle.**

## Use case

A common feature of nearly all use cases or applications that utilize the Tangle is that they require data to be stored for later use. For example, in the case of a supply chain application, shipping documents or images might need to be stored to form a permanent record of events that occured. Another example could be the case of creating a permanent digital twin of a vehicle. All data, such as the odometer readings, maintenance record, ownership changes, etc. should be permanently stored for the entire lifecycle of the vehicle.

The IF does not recommend storing data in the Tangle as it is not a database and thus not designed to store data permanently or even temporarily. The data payload in an IOTA Transaction is limited to 2187 trytes (approximately 1300 bytes) in size and there is no guarantee that data of any size stored in a Tangle transaction will still be available indefinitely after the transaction has been confirmed. This means that storing data off the Tangle is required if it is a large amount of data or it needs to be kept for any appreciable length of time.

The permanode functionality currently under development by the IF will address data permanence in the Tangle, however there will always be size limitations for data stored in the Tangle, so if a use case needs to store even a moderate amount of data permanently, using a 3rd party data storage solution in conjunction with the Tangle is needed.

## Business case

Storing, sharing and trading data is a cornerstone of business in the connected world and boosts innovation for public and private sector organisations. In the future, everything will be smart, autonomous and connected, and will be generating vast amounts of data that can be used to create new revenue streams and businesses or improve the efficiency of current business models. However, without data integrity, immutable records, and authenticated participants there will be no way to trust the data and be successful. By utilizing the IOTA Tangle, businesses and connected machines will be able to easily provide veracity, security, and privacy for the data they share.

In the use case above, the possibility of creating a permanent digital twin of a vehicle where data is collected and stored over the life cycle of the vehicle is described. If you cannot trust that the data has not been altered, then the data becomes nearly useless. By creating a cryptographic hash of the document at the source and storing the hash in the Tangle, you have a method of proving that the data is unchanged. In addition, you may also want the data to remain private and allow only authorized users to view it as well as be able to revoke this authorization when needed. By using any standard encryption method, the data can be secured and only visible to those with the corresponding decryption key.

When you utilize the Tangle in combination with a 3rd party data storage solution as described in this blueprint, your data is immutably secured and timestamped, without having to put your data in the Tangle.

You can now continue to [Architecture](architecture.md).

## List of abbreviations used in this blueprint

- IF - IOTA Foundation
- HW - Hardware
- SW - Software
- JS - Javascript
- IRI - IOTA Reference Implementation, the SW written in JAVA that allows users to become part of the [IOTA](root://iri/0.1/introduction/overview.md) network as both a transaction relay and network information provider through the easy-to-use [API](root://iri/0.1/references/api-reference.md).
- SHA256 - [Secure Hash Algorithm - 2](https://en.wikipedia.org/wiki/SHA-2)

## Additional Resources

- PoC Repository - https://github.com/iotaledger/poc-ipfs
- iota.js Repository - https://github.com/iotaledger/iota.js 
- Node.js - https://nodejs.org/
- IPFS - https://ipfs.io/
