# Proof of work

**Proof of work is the answer to a mathematical problem that's difficult to calculate, but easy to verify. In IOTA, proof of work protects the network from spam transactions. Each transaction in a bundle must include a proof of work to be valid.**

Proof of work (PoW) is calculated using trial and error, therefore it requires the use of computational power.

Originally, PoW was introduced as a concept to reduce large amounts of email spam. This concept is known as [hashcash](https://en.wikipedia.org/wiki/Hashcash), and is a method of preventing email spam by requiring a proof of work for the contents of every email.

## Proof of work in IOTA

Similar to hashcash, each transaction must include a PoW before it can be validated. This PoW provides spam protection for an IOTA network by increasing the time and computational power it takes to create a valid transaction. Furthermore, to reduce the effect that spam transactions have on the network, nodes ignore transactions that don't contain a valid PoW.

### How proof of work is calculated

To calculate the PoW for a transaction, the following [contents of the transaction](root://iota-basics/0.1/references/structure-of-a-transaction.md) are converted from trytes to trits, then those trits are hashed to result in a transaction hash:

* **Bundle hash:** Hash that's calculated using the `address`, `obsoleteTag`, `timestamp`, `value`, `currentIndex`, and `lastindex` fields of all transactions in a bundle. These fields are called the **bundle essence**.
* **Signature:** Signature of the transaction (if it withdraws IOTA tokens from an address)
* **Trunk transaction and branch transaction:** Two transactions that the transaction references and approves

If the transaction hash ends in the correct number of 0 trits ([minimum weight magnitude](root://iota-basics/0.1/concepts/minimum-weight-magnitude.md)), it's considered valid.

:::info:
[Three 0 trits are encoded to a 9 in trytes](root://iota-basics/0.1/references/tryte-alphabet.md).
:::

If the transaction hash doesn't end in the correct number of 0 trits, the value of the transaction's `nonce` field is incremented and the transaction hash is hashed again.

This process continues until a transaction hash is found that ends in the correct number of 0 trits.

The `nonce` field of a transaction contains a string of 27 trytes that IRI nodes use to validate the PoW, for example:

```javascript
{
...
nonce: "POWSRVIO9GW99999FMGEGVMMMMM"
...
}

```

Because the the contents of the transaction are hashed, if any of the contents change, the transaction hash will change and make the proof of work invalid.

:::info:
The function that calculates PoW is called the [PearlDiver](https://github.com/iotaledger/iri/blob/fcf2d105851ee891b093e2857592fa05258ec5be/src/main/java/com/iota/iri/crypto/PearlDiver.java).
:::


### Options for doing proof of work

Clients have the following options for doing PoW:

|**Option**|**Advantages**|**Disadvantages**|
|:-------|:---------|:------------|
|Choose remote PoW on a node|Remote PoW is when clients asks a node to do PoW for a transaction. Clients do this by calling the [`attachToTangle` endpoint](root://node-software/0.1/iri/references/api-reference.md#attachToTangle). This way, clients can avoid using the computational power needed to do PoW.|Depending on how powerful the node is and how many requests it receives, it may time out and not complete the PoW |
|Do local PoW|Local PoW is when clients do PoW for each transaction that they want to attach to the Tangle. This way, clients aren't reliant on unreliable nodes to do PoW.|The client device may not be powerful enough to complete PoW in a satisfactory amount of time|
|Outsource PoW to a paid service|A paid PoW service is a third-party server that accepts IOTA transactions, completes PoW and returns it to the client. PoW is done faster more more reliably by a dedicated third-party server. An example of such a service is [powsrv.io](https://powsrv.io/#quickstart)|It costs money to use the service and you don't have control over it|
|[Install a PoW proxy server](root://iri/0.1/how-to-guides/install-a-pow-proxy.md)|PoW is done faster more more reliably by your own dedicated server|You need to maintain the PoW proxy server|