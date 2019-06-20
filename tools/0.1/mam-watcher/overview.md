# MAM watcher overview

**[MAM](https://blog.iota.org/introducing-masked-authenticated-messaging-e55c1822d50e) (masked authenticated messaging) is a communication protocol that allows you to publish and subscribe to an encrypted data stream called a channel. The MAM watcher allows you to sign and send encrypted messages on a channel, then subscribe to that channel to validate, decrypt, and read the messages.**

:::info:Go to GitHub
For quickstart instructions or to read the source code, [go to the GitHub repository](https://github.com/iota-community/mam-watcher).
:::

![MAM watcher](../images/mam-watcher.gif)

## Prerequisites

To use this application, you need the following:

* [An LTS version or the latest version of Node.js and NPM](https://nodejs.org/en/download/)

* [Git](https://git-scm.com/download/linux)

## Run the application

1. Clone this repository

    ```
    git clone https://github.com/iota-community/mam-watcher
    ```
2. Change into the `mam-watcher` directory

    ```bash
    cd mam-watcher
    ```
3. Install the dependencies

    ```bash
    npm install
    ```
4. Start sending messages to a MAM stream

    ```bash
    node sender.js
    ```
  
5. Copy the first address that appears in the console

    <img src="../images/copy-mam-root.png" width="400">

6. Open a new command-prompt window

7. Subscribe to the MAM stream by using the address you just copied

    ```
    node fetcher.js <address (also called the MAM root)>
    ```
  
    <img src="../images/paste-mam-root.png" width="400">

In the console, you should see that the `sender.js` window sends transactions and the `fetcher.js` window subscribes to the channel and retrieves the messages from the Tangle.

## Next steps

Try running your own private Tangle and sending the sending the MAM messages to it.

:::info:
Make sure to change the node URL `https://nodes.devnet.thetangle.org:443` to the URL of your node (`http:127.0.0.1:14265`) in both the `sender.js` file and the `fetcher.js` file.
:::





