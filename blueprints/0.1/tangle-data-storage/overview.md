# Tangle data storage overview

**Data boosts innovation for public and private sector organisations, and can be used to create new revenue streams. However, without a vendor-neutral way of verifying data, it can't be trusted. This blueprint uses the IOTA Tangle as an immutable data structure to verify the contents of a file in a third-party storage solution.**

## Business case

Storing, sharing and trading data is a cornerstone of business in the connected world and boosts innovation for public and private sector organisations. However, if you can't trust that the data has not been altered, then the data becomes nearly useless. By using the IOTA Tangle, businesses and connected machines will be able to easily provide veracity, security, and privacy for the data they share.

### Challenge

A common requirement for nearly all use cases or applications is that data must be stored for later use, for example:

* **Supply chain:** Shipping documents or images must be stored to form a permanent record of events
* **Digital twin of a vehicle:** All data such as the odometer readings, maintenance record, and ownership change should be stored to form a permanent record of the entire lifecycle of the vehicle

To clarify, the Tangle is not a database designed to store data.  The Tangle is an immutable, distributed ledger where a hash of data can be stored along with a pointer to third-party data storage.  The IOTA Foundation (IF) are developing a network to retain a full transaction history called a "Permanode".  A permanode can be used to store a permanent record of supply chain events, a permanent record of vehicle maintenance and ownership, or other similar use cases.

### Solution

By creating a cryptographic hash of the document at the source and storing the hash in the Tangle, you have a method of proving that the data is unchanged. In addition, you may also want the data to remain private and allow only authorized users to view it as well as be able to revoke this authorization when needed. By using any standard encryption method, the data can be secured and only visible to those with the corresponding decryption key.

When you use the Tangle with a third-party data storage solution as described in this blueprint, your data is immutably secured and timestamped, without having to attach all of it to the Tangle.

## Demo

See this website for a [demonstration of the application](https://ipfs.iota.org/).

## Abbreviations

- IF - IOTA Foundation
- HW - Hardware
- SW - Software
- JS - JavaScript
- IRI - IOTA reference implementation, the SW written in Java that allows users to become part of the [IOTA network](root://iri/0.1/introduction/overview.md) as both a transaction relay and network information provider through the easy-to-use [API](root://iri/0.1/references/api-reference.md).
- SHA256 - [Secure Hash Algorithm - 2](https://en.wikipedia.org/wiki/SHA-2)

## Additional Resources

- [PoC Repository](https://github.com/iotaledger/poc-ipfs)
- [iota.js Repository](https://github.com/iotaledger/iota.js)
- [NodeJS](https://nodejs.org/)
- [IPFS](https://ipfs.io/)
