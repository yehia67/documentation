# What is a bundle?

**A bundle is an atomic group of transactions that are a mixture of inputs and outputs.**

An output transaction is one that debits IOTA tokens from an addresses and contains the signature that proves ownership of the address. If the signature is too large, it's fragmented over another zero-value input transaction.

An input transaction is one that either credits IOTA tokens to a recipient's address or contains no value (a data transaction).

**Important:** You must not spend from an address more than once. Therefore, an extra input transaction may be needed to transfer the remaining balance of a spent address to a new address.

Bundles are atomic because the fate of each transaction depends on the rest in the bundle. Either all transactions in the bundle are valid or none of them are.

## Example of a bundle

You want to send 100Mi to recipient A.

Your balance is distributed among three addresses:

* **Address 0:** 20Mi
* **Address 1:** 30Mi
* **Address 2:** 55Mi

To send 100Mi to recipient A, you must create the following transactions and send them to an IRI node as a bundle:

* **Output transaction:** Debit 100Mi from my balance and check the signature to verify that I own those IOTA tokens
* **Input transaction:** Credit 100Mi to the recipient's address
* **Input transaction:** Transfer the remaining 5Mi from address 2 to address 3

[Learn more about bundles](root://iota-basics/concepts/bundle.md).

