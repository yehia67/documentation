# Application architecture

**The Document immutability application consists of two parts: A graphical user interface (GUI), written in React and a back-end API, written in NodeJS.**

:::warning:Disclaimer
Running an open source project, like any human endeavor, involves uncertainty and trade-offs. We hope the architecture described below helps you to deploy similar systems, but it may include mistakes, and can’t address every situation. If you have any questions about your project, we encourage you to do your own research, seek out experts, and discuss them with the IOTA community.
:::

This blueprint uses the following architecture whereby the application takes file data from a client, saves it to a database, and attaches it to the Tangle through an IOTA node.

![Document immutability architecture](../images/document-immutability-architecture.png)

## Building blocks

The application allows users to upload their documents to the Tangle and then verify that they haven't changed.

### Uploading a document

When a user uploads a document, the application does the following:

1. Hash the document
2. Save the document in a database
3. Attach the hash to the Tangle
4. Save the transaction hash to the database

![Document hashing](../images/document-immutability-hashing.png)

#### Hashing a document

The document is hashed, using one of the following hashing algorithms.

We recommend using at least a 128-bit hashing algorithm such as the following:

- SHA256 - 2<sup>128</sup>
- SHA512 - 2<sup>256</sup>
- SHA-3	- Up to 2<sup>512</sup>
- BLAKE2s - 2<sup>128</sup>
- BLAKE2b - 2<sup>256</sup>

#### Saving a document

After being hashed, the document is stored in a database and the document ID that the database returns is saved elsewhere so the application can find it again.

#### Attaching the hash to the Tangle

The document hash is put in the `signatureMessageFragment` field of a transaction and sent to the IOTA node to attach it to the Tangle.

#### Saving the transaction hash to the database

The transaction hash on the Tangle is saved in the database so that the application can ask the node to return it when necessary.

### Verifying a document

When a user wants to verify a document, the application does the following:

1. Get the transaction hash from the database
2. Download the document from the database
3. Read the transaction on the Tangle
4. Hash the document and compare the results

#### Getting the transaction hash from the database

To be able to read the document hash on the Tangle, we need the hash of the transaction it's in.

#### Downloading the document

To be able to hash the document, we need to download it from the database.

#### Reading the transaction on the Tangle

When we have the transaction hash, we can ask the IOTA node to return us the transaction, which contains the document hash in its `signatureMessageFragment` field.

#### Calculating and comparing the document hash

Now we have the original document and the hash of that document that was attached to the Tangle, we hash the original document again (using the same hashing algorithm as before).

If the two hashes match, the file is unchanged.

if the hashes do not match, we know that the file has been changed between now and the time it was attached to the Tangle.

![Document hashing](../images/document-immutability-verification2.png)



