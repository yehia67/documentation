# Signatures

**Signatures are digital proof of ownership. To prove ownership of an [address](../clients/addresses.md) you sign a bundle with its private key so that others can verify that you own it.**

## Signature scheme

IOTA uses the Winternitz [one-time signature scheme](https://en.wikipedia.org/wiki/Hash-based_cryptography#One-time_signature_schemes) (W-OTS) to generate [digital signatures](https://en.wikipedia.org/wiki/Digital_signature). This signature scheme is quantum resistant, meaning that signatures are resistant to attacks from quantum computers. But, the scheme also reveals an unknown amount of the private key. As a result, it's safe to withdraw from an address only once, after which it is a [spent address](../clients/addresses.md#spent-addresses).

### How signatures are generated

To make sure that it's always safe to sign a bundle once, first the [bundle](../transactions/bundles.md) hash is [normalized](https://en.wikipedia.org/wiki/Canonical_form#Computing) so that only half of the private key is revealed in the signature.

Depending on the [number of key fragments that a private key has](../clients/addresses.md#how-addresses-are-generated), 27, 54, or 81 trytes of the normalized bundle hash are selected.

The selected trytes of the normalized bundle hash are [converted to their decimal values](../introduction/ternary.md#tryte-encoding). Then, the following calculation is performed on each of them:

```
13 - decimal value
```

The result of this calculation is the number of times that each of the 27 segments in the private key are hashed, using the [Kerl](https://github.com/iotaledger/kerl) [hash function](https://en.wikipedia.org/wiki/Hash_function).

Each hash of 27 segments is a signature fragment, which contains 2,187 trytes.

Because a transaction's `signatureMessageFragment` field can contain only 2,187 trytes, any address with a security level greater than 1 results in a signature that's too large to fit in one transaction. As a result, the rest of the signature is fragmented across zero-value transactions in the same bundle.

## How nodes validate signatures

Nodes validate a signature in a transaction by using the signature and the bundle hash to find the address of the transaction.

To validate a signature, nodes normalize the bundle hash. Then, depending on the length of the signature, the node selects 27, 54, or 81 trytes of the normalized bundle hash. These trytes correspond to the number of segments in a signature fragment. The selected trytes of the normalized bundle hash are [converted to their decimal values](../introduction/ternary.md#tryte-encoding). Then, the following calculation is performed on each of them:

```
13 + decimal value
```

The result of this calculation is the number of times that each of the 27 segments in the signature fragments must be hashed to derive the key fragments.

Each key fragment is hashed once to derive the key digests, which are combined and hashed once to derive an 81-tryte address.

If the address matches the one in the transaction, the signature is valid and the transaction is considered valid.