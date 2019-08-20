# Addresses and signatures

**To send transactions in an IOTA network, you need a secret password called a seed, which gives you access to all your addresses. These addresses hold your IOTA tokens and as such have a balance that's stored and kept up to date on all nodes in an IOTA network. To spend IOTA tokens, you must create a transaction and sign the bundle it's in to prove to a node that you own the address that holds them.**

All nodes in an IOTA network keep a record of the positive balances of all addresses.

This record looks something like this, where the address is on the left of the semicolon and the balance is on the right:

    ADDRESS....ENDOFADDRESS;1000

Nodes don't know which client owns an address because they don't have the clients' seeds. So, nodes use cryptography to validate a transaction.

When a node validates a transaction, it makes sure that, if it withdraws IOTA tokens, it was created by the owner of the seed that owns the address. The node does this by checking the transaction signature.

To create a valid signature, you need the private key that corresponds to the address from which IOTA tokens are being withdrawn.

The only way to create this private key is by owning the seed that was used to create the address. This way, signatures prove ownership of an address by proving ownership of the private key and thus the seed.

## How seeds are used in IOTA

Seeds are the master keys to the Kerl [hash function](https://www.techopedia.com/definition/19744/hash-function) in the IOTA protocol, which uses [Keccak-384](https://keccak.team/keccak.html). This hash function takes a seed, an index, and a security level to create an address and private key pair:

* **Seed:** Unique 81 [trytes](../references/tryte-alphabet.md) chosen by the client
* **Index:** Number that changes which address and private key pair is created
* **Security level:** Number between 1 and 3 that affects the length of a private key

A private key is used to sign bundles that withdraw IOTA tokens from an address to prove you own it. Each address has a corresponding private key. So, to withdraw IOTA tokens from an address, you need to prove you own it by creating a private key from the same seed, index, and security level as the address.

If you use the same seed, index, and security level, the hash function will always return the same address and private key pair. Seeds can be used to create an almost unlimited number of addresses and private key pairs (9<sup>57</sup>) by incrementing the index and using all three security levels.

:::info:
You can try this by using our JavaScript client library to [create a new address](../how-to-guides/create-an-address.md).
:::

The first step to generate an address is to derive a private key from the seed, index, and security level.

## How private keys are derived

Each private key is derived by hashing a seed, an index, and a security level with Kerl. 

First, the seed and index are combined and hashed to derive an 81-tryte **subseed**:

    Kerl(seed + index)

To derive a private key, the subseed is absorbed and squeezed in a [sponge function](https://keccak.team/sponge_duplex.html) 27 times per security level.

The result of the sponge function is a private key with a length that varies, depending on the [security level](../references/security-levels.md). The greater the security level, the longer and more secure the private key.

## How addresses are derived

To derive an address, the private key is split into **81-tryte segments**. Then, each segment is hashed 26 times. A group of 27 hashed segments is called a **key fragment**.

Because a private key consists of 2,187, 4,374, or 6,561 trytes, a private key has one key fragments for each security level. For example, a private key with security level 1 consists of 2,187 trytes, which is 27 segments, which results in one key fragment.

Each key fragment is hashed once to derive one **key digest** for each security level. For example, one key fragment results in one key digest.

Then, the key digests are combined and hashed once to derive an 81-tryte address.

:::info:
Some application such as Trinity require you to use addresses that include a 9-tryte checksum on the end.
:::

![Address generation](../images/address-generation.png)

:::info:Want to try this out?
Use the JavaScript client library to [derive addresses from private keys](../how-to-guides/derive-addresses-from-private-keys.md).
:::

## How private keys are used to sign bundles

Private keys sign the bundle hash of the transaction that withdraws IOTA tokens from the address, then the signature is put in the [`signatureMessageFragment` field](../references/structure-of-a-transaction.md) of the transaction.

By signing the bundle hash, it's impossible for attackers to intercept a bundle and change any transaction without changing the bundle hash and invalidating the signature.

:::info:
The bundle hash is derived from a hash of the values of each transaction's `address`, `value`, `obsoleteTag`, `currentIndex`, `lastIndex` and `timestamp` fields. This bundle hash is included in each transaction's `bundle` field to seal the package. If the values of any of these fields were to change, the nodes would invalidate the bundle hash.
:::

### Signatures

Signatures are created using the Winternitz one-time signature scheme (W-OTS). This signature scheme is quantum resistant, meaning that signatures are resistant to attacks from [quantum computers](https://en.wikipedia.org/wiki/Quantum_computing). But, this signature scheme also reveals an unknown amount of the private key.
<a id="address-reuse"></a>

:::danger:Spent addresses
If an address is withdrawn from (spent) more than once, more of the private key is revealed, so an attacker could brute force its signature and steal the IOTA tokens.
:::

To make sure that it's always safe to withdraw from an address once, first the bundle hash is normalized to make sure that only half of the private key is revealed in the signature.

Depending on the number of key fragments that a private key has, 27, 54, or 81 trytes of the normalized bundle hash are selected. These trytes correspond to the number of segments in a key fragment.

The selected trytes of the normalized bundle hash are [converted to their decimal values](../references/tryte-alphabet.md). Then, the following calculation is performed on each of them:

    13 - decimal value

The result of this calculation is the number of times that each of the 27 segments in the key fragment must be hashed to derive the signature fragment. Each signature fragment contains 2,187 trytes.

Because a transaction's [`signatureMessageFragment` field](../references/structure-of-a-transaction.md) can contain only 2187 trytes, any input address with a security level greater than 1 must fragment the rest of the signature over zero-value output transactions.

## How nodes verify signatures

Nodes verify a signature in a transaction by using the signature and the bundle hash to find the address of the input transaction.

To verify a signature, the bundle hash of a transaction is normalized.

Depending on the length of the signature, 27, 54, or 81 trytes of the normalized bundle hash are selected. These trytes correspond to the number of 81-tryte segments in a signature fragment.

The selected trytes of the normalized bundle hash are [converted to decimal values](../references/tryte-alphabet.md). Then, the following calculation is performed on each of them:

    13 + decimal value

The result of this calculation is the number of times that each of the 27 segments in the signature fragments must be hashed to derive the key fragments.

Each key fragment is hashed once to derive the **key digests**, which are combined and hashed once to derive an 81-tryte address.

If the address matches the one in the transaction, the signature is valid and the withdrawal is accepted.
