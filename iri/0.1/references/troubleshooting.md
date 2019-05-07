# Troubleshooting

**You may find some of these common issues while installing, configuring, or running the IRI.**

## Error - trustAnchors parameter must be non-empty

When you compile the IRI on Ubuntu 18, you may see the following error:
```
java.security.InvalidAlgorithmParameterException: the trustAnchors parameter must be non-empty
```

See some details about this error and the solution in this [Stack Overflow answer](https://stackoverflow.com/questions/6784463/error-trustanchors-parameter-must-be-non-empty).

## The IRI won't synchronize with its neighbors

It may take some time for the IRI to synchronize. Wait a while to see if the IRI synchronizes by itself.

* [Make sure that you have 6 or 7 neighbors](../how-to-guides/find-neighbor-iri-nodes.md)

* Make sure that you're running the [latest version of the IRI](https://github.com/iotaledger/iri/releases)

* Make sure that the IRI and its neighbors are sending data among each other. Call the getNeighbors API method to see both the incoming transactions (`numberOfAllTransactions`) and the number of outgoing transactions (`numberOfSentTransactions`). If your neighbors aren't sending you data, find new neighbors to connect to.

    ```bash
    curl http://localhost:14265 -X POST -H 'Content-Type: application/json' -H 'X-IOTA-API-Version: 1' -d '{"command": "getNeighbors"}'
    ```

* Ask for more support on [Discord](https://discordapp.com/invite/fNGZXvh) in our #help and #fullnodes channels

:::info:
You can download the latest database files from [dbfiles.iota.org](https://dbfiles.iota.org/?prefix=).
By downloading and extracting the latest database files, your node can synchronize faster with its neighbors.
:::