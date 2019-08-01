# What is a transaction?

**If you want to send anything to an IOTA network, you must send it to a node in the form of a transaction. A transaction is a single operation that can be either an input or an output.**

An **input transaction** withdraws IOTA tokens from an address. This transaction must contain the signature that signs the bundle and proves ownership of the address.

An **output transaction** deposits IOTA tokens into a recipient's address or contains no value (a zero-value transaction).

Before you send transactions to a node they're always grouped into a bundle.

Bundles are necessary so that nodes know which transactions contain related information. For example, if a transaction's signature is too large, it's fragmented over several zero-value output transactions in the same bundle.

Another example is that to transfer IOTA tokens, you need at least one input transaction to withdraw the IOTA tokens and one output transaction to deposit the tokens into a new address. To do so, you group those transactions in the same bundle.
