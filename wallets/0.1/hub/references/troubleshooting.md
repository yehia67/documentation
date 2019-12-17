# Troubleshooting

**You may find some of these common issues while setting up or using Hub.**

## The gRPC binary module was not installed

You may see this error when you try to run the gRPC client in our [Get started with the API](../how-to-guides/get-started-with-the-grpc-api.md) guide.

For a solution to this issue, [read this StackOverflow topic](https://stackoverflow.com/questions/50479816/node-v57-linux-x64-glibc-grpc-node-node-missing-when-using-clasp-on-linux).

## Slow confirmation times and unconfirmed bundles

When Hub sends a sweep, you may find that the bundle takes a long time to be confirmed.

This issue could be caused by any of the following:

### The network is experiencing a high volume of transactions

On the Mainnet, the Coordinator sends milestones at two-minute intervals. As a result, the more transactions that are sent to the network, the longer confirmations can take.

In this case, you should make sure to [configure reattachments](../how-to-guides/configure-hub.md#--attachmentinterval) so that Hub does them according to the current confirmation rate of the network.

### The node is experiencing a high volume of transactions

If Hub is connected to a public node, that node may be receiving lots of transactions from different clients. As a result, the node may take a long time to validate the transactions in Hub's bundle.

We recommend [running your own node](root://node-software/0.1/iri/how-to-guides/quickstart.md) and connected Hub to it so that you have your own direct access to the network.

### Sweeps contains too many transactions

If a sweep contains too many transactions, it takes a long time to complete the proof of work for all of them. As a result, the branch and trunk transactions in Hub's bundle may no longer be valid by the time the transactions are sent to the node.

To decrease the time it takes for bundles to be confirmed, you can [configure sweeps](../how-to-guides/configure-hub.md#--sweepinterval) so that Hub sends them more often and so that they contain fewer transactions.

### Reattachments are too infrequent

If Hub waits too long between reattachments, bundles can take longer than necessary to be confirmed.

To improve the confirmation time of bundles, you can [configure reattachments](../how-to-guides/configure-hub.md#--attachmentinterval) so that Hub does them more often, according to the current confirmation rate of the network.
