# Subscribe to events on a node

**If a node has the ZMQ port enabled, you can subscribe to its events such as transaction confirmations. These events give you real-time data from an IOTA network.**

You may want to subscribe to events in the [zero message queue (ZMQ)](../concepts/zero-message-queue.md) to do the following:

* Monitor an address for when a transaction is sent to it and confirmed
* Create a Tangle visualisation website, such as [thetangle.org](https://thetangle.org/)

You can subscribe to events in the ZMQ by doing the following:

1. Install the open-source ZMQ library

2. Create a ZMQ socket and connect it to an IRI node that has the [`ZMQ-enabled` configuration parameter](../references/iri-configuration-options.md#zmq-enabled) set to `true`

3. Subscribe to events from the ZMQ

In the following how-to guide we use Node.js and Python, but you could use any [programming language that is supported by the ZMQ library](http://zguide.zeromq.org/page:all).

## Prerequisites

To use the code samples in this guide, you must have the following:

* [Node.js (8+)](https://nodejs.org/en/) or [Python (3+)](https://www.python.org/downloads/) and [PIP](https://pip.pypa.io/en/stable/installing/)
* A code editor such as [Visual Studio Code](https://code.visualstudio.com/Download)
* Access to a command prompt
* An Internet connection

## Listen for recently confirmed transactions

You can subscribe to the `sn` event on the ZMQ of a node to listen for recently confirmed transactions. The following data is returned from the `sn` event:

* The index of the first milestone that referenced the transaction
* The transaction hash

1\. Install the zeromq library

--------------------
### Node.js

```bash
npm install zeromq --save
```
---
### Python

```bash
pip install pyzmq
```
--------------------

2\. Import the libraries and create a ZMQ subscribe socket

--------------------
### Node.js

```js
const zmq = require('zeromq');
const sock = zmq.socket('sub');
```
---
### Python

```python
import zmq

context = zmq.Context()
socket = context.socket(zmq.SUB)
```
--------------------

3\. Connect the socket to the node's address. If you want to connect do a different node, replace the `tcp://zmq.devnet.iota.org:5556` URL with the URL of your node.

--------------------
### Node.js

```js
sock.connect('tcp://zmq.devnet.iota.org:5556');
```
---
### Python

```python
socket.connect('tcp://zmq.devnet.iota.org:5556')
```
--------------------

4\. Subscribe to the `sn` event. This event is for confirmed transactions.

--------------------
### Node.js

```js
sock.subscribe('sn');
console.log("Socket connected");
```
---
### Python
```python
socket.subscribe('sn')
print ("Socket connected")
```
--------------------

5\. Process the event data that the node returns

--------------------
### Node.js

```js
sock.on('message', msg => {
    //Split the data into an array
    const data = msg.toString().split(' ');
    console.log(`Transaction confirmed by milestone index: ${data[1]}` );
    console.log(`Transaction hash: ${data[2]}` );
});
```
---
### Python
```python
while True:
    print ("Waiting for events from the node")
    message = socket.recv()
    data = message.split()
    print ("Transaction confirmed by milestone index: ", data[1])
    print ("Transaction hash: ", data[2])
```
--------------------

The output should display something like the following:
```shell
Transaction confirmed by milestone index: 964091
Transaction hash: QUU9NXGQBKF9XVIVOGAPEMELTEKANNJPUFCEEFWHQKRASFGDUQNSFMRXULPDSLXUZU9NVQQEBAQLVG999
Transaction confirmed by milestone index: 964091
Transaction hash: DXFNIOMKEOETZXSMGEDUIY9JFWCFQTGSVJHIUWMQWKCUMCTYZRWAMVURZYJPYGUBZPUELKVZSALNNU999
Transaction confirmed by milestone index: 964091
Transaction hash: OHRNZFLVXJVHBT9HNOQWIOQHICJ9NVTLKAPYLBUVVGIRTYGUSZKWINSUTSJJGPBBFLNCGUFTVYFNNF999
Transaction confirmed by milestone index: 964091
Transaction hash: QNCPDSSMPISSVXBENGGNNBTRBSLCBXTVBLTZLH9DFNXUWWPQNAIFJPAQENDUYL9XTWOMNURAGRFNWN999
```

## Run the code

Click the green button to run the sample code in this guide and see the results in the web browser.

:::info:
It may take a minute or so for the ZMQ to receive data from the node.

You can ignore any green text.
:::

### Node.js

<iframe height="600px" width="100%" src="https://repl.it/@jake91/ZMQ-example-Nodejs?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

### Python

<iframe height="600px" width="100%" src="https://repl.it/@jake91/ZMQ-example-Python?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Next steps

Use your knowledge of the ZMQ to build an application that monitors the IRI for other [events](../references/zmq-events.md).

:::info:
If your transactions aren't being confirmed, you can [promote or reattach them](root://dev-essentials/0.1/how-to-guides/confirm-pending-bundle.md) to increase the likelihood of this happening.
:::
