# Connect to custom nodes

**Trinity interacts with the [Tangle](root://getting-started/0.1/network/the-tangle.md) through a [quorum](../concepts/node-quorum.md) of default nodes. In this guide, you learn how to add one of your own nodes to the quorum, connect to a quorum of custom nodes such as those on the [Devnet](root://getting-started/0.1/network/iota-networks.md), or connect to a specific node to use for outsourced proof of work.**

![Node management in Trinity](../images/node-management.png)

## Connect Trinity to a quorum of custom nodes

As well as connecting to a single custom node, you can also add multiple custom nodes and use them as a node quorum. This way, you aren't restricted to using the built-in remote list of Trinity nodes.

1. Go to **Settings** > **Node** > **Add custom nodes**,  and enter the URL or IP address of the nodes you want to add

    :::info:
    All nodes in Trinity must communicate over HTTPS.
    :::

2. If you want to outsource [proof of work](root://getting-started/0.1/transactions/proof-of-work.md), enable the **Outsource proof of work** option

    :::info:
    By default proof of work is done on the computer that is running Trinity.
    :::

3. Disable the **Automatic node management** option

4. Disable the **Primary node autoswitching** option

    :::warning:
    When enabled, this option allows Trinity to connect to one of its default nodes if the primary one goes offline.

    By disabling this option, Trinity won't be able to connect to any nodes if the primary node goes offline.
    :::

5. Select your node from the dropdown menu

    :::warning:Devnet nodes
    If your custom node is a Devnet node, you must also disable the **Use remote list** option. The nodes in that list are Mainnet nodes, so they're incompatible with the Devnet.
    :::

6. If you added more than one custom node, choose the size of your node quorum

7. Click **Save**

:::success:
All the information that Trinity displays about the Tangle is now sent from your custom nodes.
:::

## Next steps

[Send a transaction](../how-to-guides/send-a-transaction.md) to your new nodes.





