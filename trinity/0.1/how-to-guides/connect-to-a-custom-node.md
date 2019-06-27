# Connect to custom nodes

**Instead of using the default [node quorum](../concepts/node-quorum.md), you can connect to one or more custom nodes. For example, you may want to connect to your own nodes or even connect to some nodes on the Devnet.**

:::info:
Your custom node must use the HTTPS protocol.
:::

![Node management in Trinity](../images/node-management.png)

## Connect to custom nodes

As well as connecting to a single custom node, you can also add multiple custom nodes and use them as a node quorum. This way, you aren't restricted to using the built-in remote list of nodes that Trinity uses.

1. Go to **Settings** > **Node** > **Add custom nodes**,  and enter the URL or IP address of the nodes you want to add

    :::info:
    To connect to a quorum of custom nodes, add more than one.
    :::

2. Disable the **Automatic node management** option

3. Disable the **Primary node autoswitching** option

    :::warning:
    When enabled, this option switches to a different node from Trinity's list of defaults if the primary one goes offline.

    If your node goes offline, Trinity won't be able to connect to any nodes to update the information it displays.
    :::

4. Select your node from the dropdown menu

    :::warning:Devnet nodes
    If your custom node is a Devnet node, you must also deselect the **Use remote list** option. The nodes in that list are Mainnet nodes, so they're incompatible with the Devnet.

    Doing so will automatically deselect the **Node quorum** option.
    :::

5. Click **Save**

:::success:Congratulations! :tada:
All the information that Trinity displays about the Tangle is now sent from your custom nodes.
:::



