**This page describes an example architecture that can be used for solving the Tangle data storage use case.**

**Disclaimer:** Running an open source project, like any human endeavor, involves uncertainty and trade-offs. We hope the architecture described below helps you to deploy similar systems, but it may include mistakes, and can’t address every situation. If you have any questions about your project, we encourage you to do your own research, seek out experts, and discuss with IOTA community.

## Prerequesites for creating the project

This projects asumes some level of programming knowledge, specifically in: Javascript, React and NodeJS.

## Instructions and technical concepts 

- [PoC source code](https://github.com/iotaledger/poc-ipfs/blob/master/README.md) - 
Consists of two parts a front-end GUI written in React and a back-end written as a NodeJS API.
In order to reproduce this PoC there is no requirement to deploy dedicated hardware.
- [Front-end deployment instructions](https://github.com/iotaledger/poc-ipfs/blob/master/client/DEPLOYMENT.md)
- [NodeJS API deployment instructions](https://github.com/iotaledger/poc-ipfs/blob/master/api/DEPLOYMENT.md)

The presented infrastructure makes use of the IOTA Tangle and an `InterPlanetary File System` (IPFS) node that you run yourself. The following image shows the main architecture components.

![Data Storage PoC - IOTA/IPFS - Architecture](../data-storage-ipfs.png)

The PoC implements two simple APIs:

- storeFile
- retrieveFile
  
## Store File

To store a file using the API we take the following steps in the client.
1.	Select the file to upload
2.	Generate SHA256 hash of the file content
3.	Capture additional file meta data
4.	Send the meta data, SHA256 hash and file content to the api (POST /ipfs)

Within the API we do the following:
1.	Upload the file content to IPFS which returns the IPFS unique hash
2.	Store the metadata, SHA256 and IPFS hash on the tangle which gives us the transaction hash
3.	Return the Tangle transaction hash to the client

The communication sequence used for the storeFile API is shown in the following image.

![Data Storage PoC - IOTA/IPFS - Store File](../data-storage-store.png)

## Retrieve File

To retrieve a file and validate its contents we perform the following in the client:

1. Request the metadata, SHA256 and IPFS hash using the transaction hash from the API (GET /ipfs)
2. Get the file contents from IPFS using the IPFS hash
3. Perform a SHA256 on the retrieved file content
4. Compare the calculated SHA256 with the one returned from the API

The communication sequence used for the retrieveFile API is shown in the following image.

![Data Storage PoC - IOTA/IPFS - Retrieve File](../data-storage-retrieve.png)

## Data Security

Note that anyone who has the IPFS hash can download and read the content since it is stored in the distributed database and is discoverable via the hash. 

While the solution outlined in this blueprint doesn’t show how to encrypt the data, the data could always be encrypted prior to upload to prevent unauthorized entities from reading the data even if they discover it. 

## Alternative Data Storage Solutions

Upload of data to IPFS is used as an example in this blueprint, however the same principles would apply when uploading to an alternative data storage solution, whether it is hosted internally or externally to an organization.

To use alternative storage solutions such as Amazon S3 or Azure Storage you would just have to upload the data to the storage with a unique hash (the SHA256 of the file would suffice).

## API

The main bulk of the work performed in this PoC is in the API. The storeFile API requires a JSON payload in the form shown below:

```javascript
IPFSStoreRequest {
   /**
    * The filename of the file to store.
    */
   name: string;

   /**
    * The description of the file to store.
    */
   description: string;

   /**
    * The size of the file to store.
    */
   size: number;

   /**
    * The modified date of the file to store.
    */
   modified: Date;

   /**
    * The sha256 hash of the file to store.
    */
   sha256: string;

   /**
    * The data of the file to store in base64.
    */
   data: string;
}
```

### Uploading data

On receipt of the request data the code which uploads the data to IPFS is very straightforward.

```javascript
import ipfsClient from "ipfs-http-client";

const buffer = Buffer.from(request.data, "base64");
const ipfs = ipfsClient(config.ipfs);
const addResponse = await ipfs.add(buffer);
```

The response from the add contains the IPFS hash, we then combine this with the metadata and SHA256 to attach to the tangle.

```javascript
const nextAddress = generateAddress(config.seed, 0, 2);

const tanglePayload = {
   name: request.name,
   description: request.description,
   size: request.size,
   modified: request.modified,
   sha256: request.sha256,
   ipfs: addResponse[0].hash
};

const iota = composeAPI({
        provider: config.provider
    });

const trytes = await iota.prepareTransfers(
   "9".repeat(81),
   [
	   {
		   address: nextAddress,
		   value: 0,
		   message: TrytesHelper.toTrytes(tanglePayload)
	   }
   ]);

const bundle = await iota.sendTrytes(trytes, config.depth, config.mwm);
   
```

The bundle returned from the sendTrytes will contain the transaction hash we return to the client.

### Retrieving and Validating Data

In order to retrieve and validate the file we first get the transaction from the tangle.

```javascript
const iota = composeAPI({
        provider: config.provider
    });

const transactions = await iota.getTrytes([request.transactionHash]);
const txObject = asTransactionObject(transactions[0]);
const ascii = trytesToAscii(txObject.signatureMessageFragment);
const payload = JSON.parse(ascii)
```

Then we retrieve the IPFS file using any public IPFS gateway such as [Cloudflare](https://cloudflare-ipfs.com/ipfs/:hash)

Assuming we have retrieved the file into a buffer we generate the SHA256 of the file and compare it with the one from the payload.

```javascript
const sha256 = crypto.createHash("sha256");
sha256.update(fileBuffer);
const ipfsSha256 = sha256.digest("hex");
if (ipfsSha256 === payload.sha256) {
   console.log("All Is Well");
} else {
   console.log("Oh no, hash does not match");
}
```

Now that the functionality is defined, you continue to [Deployment and testing](deployment-and-testing.md).