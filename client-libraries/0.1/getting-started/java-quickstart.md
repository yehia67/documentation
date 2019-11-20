# Java quickstart

**In this quickstart, you learn the basics of IOTA development in Java, from setting up a development environment to listening for live transaction on the Tangle.**

In this quickstart, you will learn how to:

1. Set up a developer environment

2. Install packages

3. Connect to a node

## Step 1. Set up a developer environment

To use the Java client library, you need a set of programming tools, which make up a development environment.

1. Open a command-line interface and change into your project's directory

    Depending on your operating system, a command-line interface could be [PowerShell in Windows](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/getting-started-with-windows-powershell?view=powershell-6), the [Linux Terminal](https://www.howtogeek.com/140679/beginner-geek-how-to-start-using-the-linux-terminal/) or [Terminal for macOS](https://macpaw.com/how-to/use-terminal-on-mac).

2. If you don't know if you have the Java Development Kit (JDK) installed, run the following command to see which version you have:

    ```bash
    javac -version
    ```

    You should see something similar to this output:

    javac 1.8.0_92

If you don't have the JDK, you'll need to install it before going any further. Follow the directions for installing the Java OpenJDK for your platform (Windows, Mac, Linux) from the [OpenJDK download page](https://openjdk.java.net/install/).

Now you're ready to start installing packages.

## Step 2. Install packages

The Java client library is organized in packages, which contain related methods.

To download the IOTA Java client library and its dependencies, you can use one of the following options:

- Download the library with Gradle
- Download the library with Maven
- Download the library manually

If you are using a Java integrated development environment (IDE) to build your application, you can specify the group ID, artifact ID, and version number for your dependencies.

Regardless of the package manager you are using, remember to specify the latest version of the Jota library, which is on the [JitPack](https://jitpack.io/#iotaledger/iota-java) page.

--------------------
### Gradle

1. Add the JitPack repository to your root `build.gradle` file

    ```gradle
    allprojects {
        repositories {
            maven { url 'https://jitpack.io' }
        }
    }
    ```

2. Add the iotaledger dependency to your module `build.gradle` file

    ```gradle
    dependencies {
        compile 'com.github.iotaledger:iota-java:1.0.0-beta3'
    }
    ```
---
### Maven

1. Add the JitPack repository to your root `pom.xml` file
    
    ```xml
    <repositories>
        <repository>
            <id>jitpack.io</id>
            <url>https://jitpack.io</url>
        </repository>
    </repositories>
    ```

2. Add the iotaledger dependency to your module `pom.xml` file. Replace the `[VERSION_INFORMATION]` placeholder with either the latest release number such as `1.0.0-beta3` or the first 10 characters of a Git commit hash such as `a98de8ea50`.
    
    ```xml
    <dependency>
        <groupId>com.github.iotaledger.iota-java</groupId>
        <artifactId>jota</artifactId>
        <classifier>jar-with-dependencies</classifier>
        <version>[VERSION_INFORMATION]</version>
    </dependency>
    ```
---
### Manual install

1. Clone or download the [GitHub repository](https://github.com/iotaledger/iota-java)

Inside the project, you'll have a `jota` and `jota-parent` directory

2. Reference the `jota` directory in your project

3. In the `jota` directory, install the dependencies

    ```bash
    mvn clean install
    ```

Now, you have a `jota-[VERSION]-jar-with-dependencies.jar` file, depending on your version of the library.
--------------------

Now you can start coding.

## Step 3. Connect to a node

It's best practice to make sure that you're connected to a [synchronized node](root://getting-started/0.1/network/nodes.md#synchronized-nodes) before you start sending transactions to it. This way, you know that it has an up-to-date view of [the Tangle](root://getting-started/0.1/network/the-tangle.md).

Whenever you connect to a node, you need to know which [IOTA network](root://getting-started/0.1/network/iota-networks.md) it's in. Here, we connect to a node on the Devnet, which is the IOTA networks that you can use for testing.

1\. Go to the IOTA Foundation [Discord](https://discord.iota.org) and enter **!milestone** in the `botbox` channel

![Entering !milestone on Discord](../images/discord-milestone-check.PNG)

The Discord bot should return the current `latestMilestoneIndex` field from a [node quorum](root://getting-started/0.1/network/nodes.md#node-quorum).

2\. Create a new file called `ConnectToNode.java`

3\. To check if your node is synchronized, copy and paste the following code into the `ConnectToNode.java` file

```java
import jota.IotaAPI;
import jota.dto.response.getNodeInfo;
import jota.error.ArgumentException;

class ConnectToNode {
public static void main(String[] args) throws ArgumentException {

        // Create a new instance of the API object
        // and specify which node to connect to
        IotaAPI api = new IotaAPI.Builder()
            .protocol("https")
            .host("nodes.devnet.thetangle.org")
            .port("443")
            .build();

        // Call the `getNodeInfo()` method for information about the node and the Tangle
        GetNodeInfoResponse response = api.getNodeInfo();
        System.out.println(response);
    }
}
```

4\. Save your changes and compile this Java class from the command line

```bash
javac -cp jota-[VERSION]-jar-with-dependencies.jar ConnectToNode.java
```

5\. Run the compiled code from the command line

--------------------
### macOS and Linux
```bash
java -cp .:jota-[VERSION]-jar-with-dependencies.jar ConnectToNode
```
---
### Windows
```bash
java -cp .;jota-[VERSION]-jar-with-dependencies.jar ConnectToNode
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

If not, try connecting to a different node. The [iota.dance website](https://iota.dance/) includes a list of Mainnet nodes. Or, you can [run your own node](root://node-software/0.1/iri/how-to-guides/quickstart.md).

:::success: Congratulations :tada:
You've confirmed your connection to a synchronized node.
:::

## Support the project

If the Java library has been useful to you and you feel like contributing, consider posting a [bug report](https://github.com/iotaledger/iota-java/issues/new-issue), feature request or a [pull request](https://github.com/iotaledger/iota-java/pulls/).  
We have some [basic contribution guidelines](https://github.com/iotaledger/iota-java/blob/dev/CONTRIBUTING.md) to keep our code base stable and consistent.

If your changes affect the documentation, please update it.

## Get involved

[Join our Discord channel](https://discord.iota.org) where you can:

- Take part in discussions with IOTA developers and the community
- Ask for help
- Share your knowledge to help others

We have many channels, including the following:

- `-dev`: These channels are read-only and are where developers discuss topics with each other and where you can see any code updates from GitHub.

- `-discussion`: These channels are where you can participate.

## Next steps

Read our [developer's handbook](root://getting-started/0.1/references/quickstart-dev-handbook.md) for guidance on whether you should run your own node, whether you need a private IOTA network, and what you need to consider for both.