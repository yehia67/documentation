# Deploy and test Tangle data storage

**The section below describes how you can test, deploy and modify this blueprint (open source repositories are available).**

Please see a [demo of this app](https://ipfs.iota.org/).

For the source code and deployment instructions, see:

- [PoC source code](https://github.com/iotaledger/poc-ipfs/blob/master/README.md) - 
Consists of two parts a front-end GUI written in React and a back-end written as a Node.js API.
In order to reproduce this PoC there is no requirement to deploy dedicated hardware.
- [Front-end deployment instructions](https://github.com/iotaledger/poc-ipfs/blob/master/client/DEPLOYMENT.md)
- [Node.js API deployment instructions](https://github.com/iotaledger/poc-ipfs/blob/master/api/DEPLOYMENT.md)

**After deploying the application:**

1. When first loaded, you should be presented with the following image.

    ![Upload File for IOTA IPFS Data Storage PoC](../data-storage-upload.png)

    **Note:** the file size limitation is only for the purposes of this blueprint and sample app since it runs against a database with size restrictions. Real-world implementations can allow any file size needed. Make sure the database solution can support the data volume as you can quickly fill up the database or be charged a lot of money for the storage space used.

2. By selecting a file, other fields should automatically be populated with metadata for the file, as shown in the following image.

    ![Upload File for IOTA IPFS Data Storage PoC - Populated](../data-storage-upload2.png)

3. Once you click the Upload button the file and metadata will be sent to the API and stored on IPS and the Tangle. After this operation has beeen successfully performed you should get a confirmation.

    ![Uploaded File for IOTA IPFS Data Storage PoC](../data-storage-upload-finished.png)

4. To retrieve and validate a file first navigate to the retrieve file screen.

    ![Retrieve File for IOTA IPFS Data Storage PoC](../data-storage-upload-retrieve.png)

5. Enter a tangle transaction hash and click retrieve. The transaction hash will be passed to the api which will retrieve the payload. Contained within the payload is the IPFS hash which is used to download the file and validate its SHA256 against that stored in the tangle payload.

    ![Retrieve File for IOTA IPFS Data Storage PoC](../data-storage-upload-validated.png)

This completes the full lifecycle for storing, retrieving and validating a file. The file metadata, SHA256 and IPFS file hash on the tangle is immutable and if the file contents that you retrieve from IPFS do not match, then the file can no longer be trusted.
