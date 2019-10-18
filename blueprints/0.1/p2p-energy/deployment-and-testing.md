# Deploy the P2P energy grid app

**To start using the P2P energy grid app, deploy your own application.**

## Prerequisites

To deploy the P2P energy grid app, you must have the following:

### Hardware

* The sources, producers, and consumers can run on Raspberry Pis (RPi)
* The grid must be run on a server that's capable of web APIs, database storage and background tasks

### Software

* [Node.js](https://nodejs.org/)

* [MAM (Masked Authenticated Messaging)](https://github.com/iotaledger/mam.client.js)

Choose from one of the following cloud services or a local server:

* Amazon
    * [Web server](https://aws.amazon.com/s3/)
    * [API server](https://aws.amazon.com/api-gateway/)
    * [NoSQL database](https://aws.amazon.com/dynamodb/)
    * [Background tasks](https://aws.amazon.com/lambda/)

* Local server
    * Storage: local file system
    * Web server: Nginx
    * API server: Node.js with Express
    * NoSQL database: MongoDB
    * Background tasks: Task scheduler running Node.js tasks

### Programming knowledge

* JavaScript/TypeScript
* HTML/CSS
* [React framework](https://github.com/facebook/create-react-app)
* Required third-party licenses
* Cloud services

### IOTA knowledge

An understanding of MAM channels.

## Deploy the P2P energy grid app

<!--The deployment instructions are documented in the [GitHub repository](https://github.com/iotaledger/poc-p2p-energy).-->

:::info:
The deployment instructions will be available in May.
:::

Sources running on RPi need the following:
* Local area network (LAN) or wide area network (WAN) connection to the grid
* Connection to an IOTA node (can be internal)
* [Node.js](https://github.com/audstanley/NodeJs-Raspberry-Pi)

Producers running on RPi need the following:
* Local area network (LAN) or wide area network (WAN) connection to the grid
* Connection to an IOTA node (can be internal)
* [Node.js](https://github.com/audstanley/NodeJs-Raspberry-Pi)

Consumers running on RPi need the following:
* Local area network (LAN) or wide area network (WAN) connection to the grid
* Connection to an IOTA node (can be internal)
* [Node.js](https://github.com/audstanley/NodeJs-Raspberry-Pi)

Grids running in the cloud or on a local server need the following:
* WAN connection
* Connection to an IOTA node
