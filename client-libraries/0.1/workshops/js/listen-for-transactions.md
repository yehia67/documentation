# Listen for live transactions in Node.js

**[Nodes](root://getting-started/0.1/network/nodes.md) that run the [IRI node software](root://node-software/0.1/iri/introduction/overview.md) can enable their [zero message queue (ZMQ)](https://zeromq.org/), which allows you to subscribe to events such as transaction confirmations. In this guide, you subscribe to all transactions and those that were sent to a specific address.**

## Packages

To complete this guide, you need to install the `zeromq` package:

--------------------
### npm
```bash
npm install zeromq
```
---
### Yarn
```bash
yarn add zeromq
```
--------------------

## IOTA network

In this guide, we connect to a node on the [Devnet](root://getting-started/0.1/network/iota-networks.md#devnet).

## Run the code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code in the browser.

Click the green button to run the sample code in this guide and see the results in the window.

:::info:
It may take a minute or two to receive data from the node.
:::

<iframe height="600px" width="100%" src="https://repl.it/@jake91/ZMQ-example-Nodejs?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Code explanation

This code connects to the zero message queue of a node on the Devnet.

When you execute this script in a command-line interface, you can use an optional address argument to subscribe only to transactions that were sent to that address.

If you execute the script with no additional arguments, you subscribe to all transactions.

For details of the returned data, see the [ZMQ events table](root://node-software/0.1/iri/references/zmq-events.md).

:::success:Congratulations :tada:
You're listening to a node's ZMQ and receiving real-time transactions.
:::

## Next steps

[Start using Masked Authenticated Messaging](../../mam/introduction/overview.md) to send encrypted streams of data that others can subscribe to on the Tangle.

Take a look at our [app blueprints](root://blueprints/0.1/introduction/overview.md) for inspiration