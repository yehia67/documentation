# Outsource proof of work

**Before you send a transaction, it must include a [proof of work](root://dev-essentials/0.1/concepts/minimum-weight-magnitude.md). Proof of work requires a computer to use energy to do computations. By default proof of work is done on the computer that is running Trinity.**

You can use the **Outsouce proof of work** option to ask a specific node to do the proof of work for your transactions.

:::info:
All nodes in Trinity must communicate over HTTPS.
:::

1. Go to **Settings** > **Node** > **Add custom nodes**,  and enter the URL or IP address of the nodes you want to add

    :::info:
    To connect to a quorum of custom nodes, add more than one.
    :::

2. Enable the **Outsource proof of work** option

3. In the **PROOF OF WORK NODE** dropdown, select your node

    :::warning:Devnet nodes
    If your node is a Devnet node, you must also [connect to a primary Devnet node](../how-to-guides/connect-to-a-custom-node.md).
    :::

4. Click **Save**

:::success:Congratulations! :tada:
Whenever you send a transaction, the proof of work is done by your custom proof-of-work node.
:::