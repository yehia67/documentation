# What is a transaction?

**If you want to send anything to an IOTA network, you must send it to a node in the form of a transaction. A transaction is a single operation that can be either an input or an output.**

An **input transaction** withdraws IOTA tokens from an address. This transaction must contain the signature that signs the bundle and proves ownership of the address. If the signature is too large, it's fragmented over zero-value output transactions in the bundle.

An **output transaction** deposits IOTA tokens into a recipient's address or contains no value (a zero-value transaction).

Before you send transactions to a node they're always grouped into a bundle.
