# Get started

**To start integrating IOTA into your app or website you need complete three simple steps: Create a [seed](../clients/seeds.md), install a [client library](root://client-libraries/0.1/introduction/overview.md), and connect to a [node](../network/nodes.md).**

:::info:Not a developer?
If you want to use IOTA without having to write code, you can use the [official Trinity wallet](root://wallets/0.1/trinity/introduction/overview.md).
:::

## Step 1. Create a seed

A seed is a unique password that gives you the ability to prove your ownership of either messages and/or any [IOTA tokens](../clients/token.md) that are held on your [addresses](../clients/addresses.md).

:::warning:
You must keep your seed safe and back it up. If you lose your seed, you can't recover it.
:::

--------------------
### Linux
1\. Do the following in a command-line interface:

```bash
cat /dev/urandom |tr -dc A-Z9|head -c${1:-81}
```

2\. Copy and paste your seed into a file and back it up
---
### macOS
1\. Do the following in a command-line interface:

```bash
cat /dev/urandom |LC_ALL=C tr -dc 'A-Z9' | fold -w 81 | head -n 1
```

2\. Copy and paste your seed into a file and back it up
---
### Windows
1\. [Download the KeePass installer](https://keepass.info/)

KeePass is a password manager that stores passwords in encrypted databases, which can be unlocked with one master password or key file.

2\. Open the installer and follow the on-screen instructions

3\. Open KeePass and click **New**

![Creating a new KeePass database](../images/keypass-new.png)

4\. After you've followed the instructions and saved the KeePass file on your computer, right click the empty space and click **Add entry**

![Adding a new KeePass entry](../images/keepass-add-entry.png)

5\. Click **Generate a password**

![Selecting the Keepass password generator](../images/keypass-password-generator.png)

6\. Select only the following options and click **OK**:

- Length of generated password: 81
- Upper-case (A, B, C, ...)
- Also include the following characters: 9
    
7\. Click **OK** to save your seed
--------------------

## Step 2. Install a client library

The IOTA Foundation maintains the [Go, Java, and JavaScript client libraries](root://client-libraries/0.1/introduction/overview.md).

If you want to use another programming language, the IOTA community maintains some [community client libraries](root://client-libraries/0.1/introduction/overview.md).

--------------------
### Node.js
To use the JavaScript library, you must have one of the following supported versions of Node.js:

- Node.js 10 or higher. We recommend the [latest LTS](https://nodejs.org/en/download/).
- Node.js 8

To install the library packages, you must have one of the following package managers:

- [npm](https://www.npmjs.com/) (included in Node.js downloads)
- [Yarn](https://yarnpkg.com/)

To install the `core` package with npm:

```bash
npm install @iota/core
```

To install the `core` package with Yarn:

```bash
yarn add @iota/core
```

You now have a `package.json` file and a `node_modules` directory, which contains the `core` package and its dependencies.

[For all available packages, see the JavaScript GitHub repository](https://github.com/iotaledger/iota.js/tree/next/packages).
---
### Java
To download the library with Gradle:

Add the following repository to your **root** `build.gradle` file (not your module file):

```java
allprojects {
    repositories {
        maven { url 'https://jitpack.io' }
    }
}
```

Find the [latest release](https://github.com/iotaledger/iota-java/releases), and add it as a dependency to your **module** `build.gradle` file:

```java
dependencies {
    compile 'com.github.iotaledger:iota-java:1.0.0-beta7'
}
```
You now have all the client library functions and their dependencies.

[For more information, see the Java GitHub repository](https://github.com/iotaledger/iota-java).
---
### Go
To download the Go client library and its dependencies, we recommend that you use [Go modules](https://github.com/golang/go/wiki/Modules) (available since version 1.11) to manage dependencies in your project.

In any directory outside of GOPATH, initiate your project. Change the placeholder to your chosen path such as github.com/me/awesome-project.


```bash
go mod init <your-module-path>
```

Download the `api` library and its dependencies:

```bash
go get github.com/iotaledger/iota.go/api
```

This command downloads the latest version of the IOTA Go client library and writes the version into the `go.mod` file.

[For more libraries, see the Go GitHub repository](https://github.com/iotaledger/iota.go).
--------------------

## Step 3. Connect to a node

It's best practice to make sure that you're connected to a [synchronized node](../network/nodes.md#synchronized-nodes) before you start sending requests to it. This way, you know that it has an up-to-date view of [the Tangle](../network/the-tangle.md).

1. Go to the IOTA Foundation [Discord](https://discord.iota.org) and enter **!milestone** in one of the channels

    ![Entering !milestone on Discord](../images/discord-milestone-check.PNG)

    The Discord bot should return the current `latestMilestoneIndex` field from a [node quorum](../network/nodes.md#node-quorum).

2. To check if your node is synchronized, call the `getNodeInfo()` method

    :::info:
    Here, we connect to a node on the [Devnet](../network/iota-networks.md#devnet), which is one of the IOTA networks that you can use for testing.
    :::

--------------------
### JavaScript
```js
// Require the core package
const Iota = require('@iota/core');

// Create a new instance of the IOTA API object
// Use the `provider` field to specify which node to connect to
const iota = Iota.composeAPI({
provider: 'https://nodes.devnet.iota.org:443'
});

// Call the `getNodeInfo()` method for information about the node and the Tangle
iota.getNodeInfo()
// Convert the returned object to JSON to make the output more readable
.then(info => console.log(JSON.stringify(info, null, 1)))
.catch(err => {
    // Catch any errors
    console.log(err);
});
```
---
### Java
```java
// Create a new instance of the IOTA API object
IotaAPI api = new IotaAPI.Builder().build();
IotaAPI api = new IotaAPI.Builder()
        .protocol("https")
        .host("nodes.devnet.iota.org")
        .port("443")
        .build();
// Call the `getNodeInfo()` method for information about the node and the Tangle
GetNodeInfoResponse response = api.getNodeInfo();
// Print the response to the console
System.out.println(response);
```
---
### Go
```golang
package main

import (
    . "github.com/iotaledger/iota.go/api"
    "fmt"
)

var endpoint = "https://nodes.devnet.iota.org:443"

func main() {
	// Create a new instance of the IOTA API object
	api, err := ComposeAPI(HTTPClientSettings{URI: endpoint})
	handleErr(err)

    // Call the `getNodeInfo()` method for information about the node and the Tangle
	nodeInfo, err := api.GetNodeInfo()
    handleErr(err)

    // Print the response to the console
	fmt.Println(nodeInfo)
}

func handleErr(err error) {
	if err != nil {
		panic(err)
	}
}
```
--------------------

The node returns a [response object](root://node-software/0.1/iri/references/api-reference.md#getNodeInfo):

```json
{
    "appName": "IRI Testnet",
    "appVersion": "1.5.6-RELEASE",
    "jreAvailableProcessors": 8,
    "jreFreeMemory": 12052395632,
    "jreVersion": "1.8.0_181",
    "jreMaxMemory": 22906667008,
    "jreTotalMemory": 16952328192,
    "latestMilestone": "FPRSBTMKOP9JTTQSHWRGMPT9PBKYWFCCFLZLNWQDFRCXDDHZEFIEDXRIJYIMVGCXYQRHSZQYCTWXJM999",
    "latestMilestoneIndex": 1102841,
    "latestSolidSubtangleMilestone": "FPRSBTMKOP9JTTQSHWRGMPT9PBKYWFCCFLZLNWQDFRCXDDHZEFIEDXRIJYIMVGCXYQRHSZQYCTWXJM999",
    "latestSolidSubtangleMilestoneIndex": 1102841,
    "milestoneStartIndex": 434525,
    "neighbors": 3,
    "packetsQueueSize": 0,
    "time": 1549482118137,
    "tips": 153,
    "transactionsToRequest": 0,
    "features": ["snapshotPruning", "dnsRefresher", "testnet", "zeroMessageQueue", "tipSolidification", "RemotePOW"],
    "coordinatorAddress": "EQQFCZBIHRHWPXKMTOLMYUYPCN9XLMJPYZVFJSAY9FQHCCLWTOLLUGKKMXYFDBOOYFBLBI9WUEILGECYM",
    "duration": 0
}
```

If the `latestMilestoneIndex` field is equal to the one you got from Discord and the `latestSolidSubtangleMilestoneIndex` field, the node is synchronized.

If not, try connecting to a different node. The [iota.dance website](https://iota.dance/) includes a list of Mainnet nodes. Or, you can [run your own node](../tutorials/run-your-own-iri-node.md).

:::success: Congratulations :tada:
You've confirmed your connection to a synchronized node.
:::

## Sample code

We use the [REPL.it tool](https://repl.it) to allow you to run sample code from the [JavaScript client library](root://iota-js/0.1/introduction/overview.md) in the browser.

Click the green button to run the code and see the results in the window.

<iframe height="600px" width="100%" src="https://repl.it/@jake91/Connect-to-a-node?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## Get involved

[Join our Discord channel](https://discord.iota.org) where you can:

- Take part in discussions with IOTA developers and the community
- Ask for help
- Share your knowledge to help others

We have many channels, including the following:

- `-dev`: These channels are read-only and are where developers discuss topics with each other and where you can see any code updates from GitHub.

- `-discussion`: These channels are where you can participate.

## Next steps

Now you're connected to a synchronized node, continue learning by completing our beginner's walkthrough in one of the following client libraries to learn the basics: 

- [JavaScript](root://iota-js/0.1/workshop/get-started.md)

If you've got an idea for building an application on IOTA, [read our developer's handbook](../references/quickstart-dev-handbook.md) for guidance on whether you should run your own node, whether you need a private IOTA network, and what you need to consider for both.

**Non-developers:** Use the [official Trinity wallet](root://wallets/0.1/trinity/introduction/overview.md) to create and store your seed, send and receive transactions, and more.

**Exchanges:** Use the [official Hub wallet](root://wallets/0.1/hub/introduction/overview.md) to integrate IOTA into your exchange.