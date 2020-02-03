# Run a GoShimmer node

**In this guide, you install and run a node on the GoShimmer network. By running a node, you can test the network and keep up to date with regular changes. When all the modules become available, this network will become a release candidate for the next IOTA protocol.**

You have the following options for running a node:

- Quickstart
- Docker
- Native install

## Prerequisites

To run a node, you need the following:

- [Git](https://git-scm.com/downloads)
- [Forward ports](root://general/0.1/how-to-guides/expose-your-local-device.md) 14626(TCP/UDP) and 14666 (TCP) to the device that's running the node
- A public IP address

## Quickstart

If you just want to run a node on your native filesystem as quickly as possible, do the following:

1. Clone the repository

    ```bash
    git clone https://github.com/iotaledger/goshimmer.git
    ```

2. Change into the `goshimmer` directory

    ```bash
    cd goshimmer
    ```

3. Open the `config.json` file and replace the `enablePlugins` field with the following to enable the spammer API endpoint, the dashboard, and the Tangle visualizer

    ```bash
    "enablePlugins":["spammer", "graph", "dashboard"]
    ```

    :::info:
    You can run the file with the `-h` or `--help` flag to see a list of all configuration options.
    :::

4. Use one of the following commands to execute the pre-built `goshimmer` file, depending on your operating system:

    ```bash
    # Linux and macOS
    ./goshimmer
    # Windows
    .\ goshimmer
    ```

    :::info:
    If you see a `permission denied` error, try executing the file as an administrator.
    :::

:::success:Congratulations :tada:
You're now running a GoShimmer node.
:::

![GoShimmer status screen](../images/goshimmer.png)

The status screen displays the following statistics in the top-right corner:

- **TPS:** The number of transactions per second, which are separated into two categories. The **received** transactions are those that the node has just appended to its ledger. The **new** transactions are solid transactions.
- **Node ID:** The node's public key that gives it a unique identity
- **Neighbors:** The number of neighbors that the node is connected to. All nodes can have a maximum of 8 neighbors. Each node chooses 4 neighbors to connect to and accepts incoming connections from 4 other neighbors that chose it.
- **Known peers:** The total number of nodes in the network. At the moment, the number of **neighborhood** nodes is the same as the number of **total** nodes. When the network allows sharding, the **neighborhood** nodes will be those that are in the node's shard.
- **Uptime:** The total amount of time during which the node has been running

:::info:
If you don't have any accepted neighbors, make sure that you've forwarded your `autopeering` TCP/UDP port (14626) to your device.
:::

## Docker

When you run a node in a Docker container, it's similar to running it in a lightweight virtual machine.

Some of the advantages of running a node in a Docker container include the following:

- You don't need to install all the tools and dependencies such as a compiler and the Go programming language
- The node runs in the same way on any supported system architecture
- It's easier to run the node in the background, to stop it, and to see the logs

### Prerequisites

To complete this guide, you need [Docker](https://docs.docker.com/install/#supported-platforms) installed on your device.

The Docker container is suitable for the following operating systems:
- Linux
- macOS
- Windows

:::info:
If you're using a Debian-based operating system, add `sudo` before all the commands in the following tasks.
:::

### Build and run the GoShimmer image

1. Clone the `goshimmer` repository
    
    ```bash
    git clone https://github.com/iotaledger/goshimmer.git
    git submodule init
    git submodule update
    ```

2. Change into the `goshimmer` directory

    ```bash
    cd goshimmer
    ```

3. Build the Docker image

    ```bash
    docker build -t goshimmer .
    ```

4. Open the `docker.config.json` file and replace the `enablePlugins` field with the following to enable the spammer API endpoint, the dashboard, and the Tangle visualizer

    ```bash
    "enablePlugins":["spammer", "graph", "dashboard"]
    ```

    :::info:
    You can run the image with the `-h` or `--help` flag to see a list of all configuration options.
    :::

5. Run the Docker image

    :::info:
    If you have [Docker Compose](https://docs.docker.com/compose/), you can also use the `docker-compose up -d` command.
    :::

    ```bash
    sudo docker run -d --rm -p 14666:14666 -p 14626:14626 -p 14626:14626/udp -p 8080:8080 -p 8081:8081 -it -v mainnetdb:/app/mainnetdb goshimmer
    ```   

    The container ID is displayed in the console.

6. Copy the container ID, and use it to read the node's logs. Replace the `$ContainerID` placeholder with your container ID.

    ```bash
    docker logs -f $ContainerID
    ```

7. To see the status screen, attach the Docker container by doing the following. Replace the `$ContainerID` placeholder with your container ID.

    ```bash
    docker attach $ContainerID
    ```

:::success:Congratulations :tada:
You're now running a GoShimmer node.
:::

![GoShimmer status screen](../images/goshimmer.png)

The status screen displays the following statistics in the top-right corner:

- **TPS:** The number of transactions per second, which are separated into two categories. The **received** transactions are those that the node has just appended to its ledger. The **new** transactions are solid transactions.
- **Node ID:** The node's public key that gives it a unique identity
- **Neighbors:** The number of neighbors that the node is connected to. All nodes can have a maximum of 8 neighbors. Each node chooses 4 neighbors to connect to and accepts incoming connections from 4 other neighbors that chose it.
- **Known peers:** The total number of nodes in the network. At the moment, the number of **neighborhood** nodes is the same as the number of **total** nodes. When the network allows sharding, the **neighborhood** nodes will be those that are in the node's shard.
- **Uptime:** The total amount of time during which the node has been running

:::info:
If you don't have any accepted neighbors, make sure that you've forwarded your `autopeering` TCP/UDP port (14626) to your device.
:::

## Native install

When you run a node on your native filesystem, you gain performance over using a Docker container.

For a discussion on the differences between native and Docker, see [this article](https://www.linode.com/docs/applications/containers/when-and-why-to-use-docker/).

### Prerequisites

To complete this guide, you need the following:

- At least version 1.13 of the Go programming language (we recommend the latest version)
- GCC: For macOS, you can install GCC using [Homebrew](https://brew.sh/) (`brew install gcc`). For Windows, you can [install TDM-GCC](http://tdm-gcc.tdragon.net/download). For Linux (Ubuntu 18.04), you can [install GCC from the `build-essential` package](https://linuxize.com/post/how-to-install-gcc-compiler-on-ubuntu-18-04/).

### Build and run the GoShimmer executable

1. In the command-line interface, check your `GOPATH` environment variable

    ```bash
    go env GOPATH
    ```

    :::info:
    This directory is called `$GOPATH`.
    :::

2. Clone the `goshimmer` repository anywhere outside of `$GOPATH`
    
    ```bash
    git clone https://github.com/iotaledger/goshimmer.git
    git submodule init
    git submodule update
    ```

3. Change into the `goshimmer` directory

    ```bash
    cd goshimmer
    ```

4. Use one of the following commands to build your executable file, depending on your operating system

    ```bash
    # Linux and macOS
    go build -o goshimmer
    # Windows
    go build -o  goshimmer.exe
    ```

    :::info:
    If you're using Windows PowerShell, enclose `goshimmer.exe` in single quotation marks. For example: `go build -o 'goshimmer.exe'`.
    :::

    Now, you have a file called `goshimmer` that you need to execute.

5. Open the `config.json` file and replace the `enablePlugins` field with the following to enable the spammer API endpoint, the dashboard, and the Tangle visualizer

    ```bash
    "enablePlugins":["spammer", "graph", "dashboard"]
    ```

    :::info:
    You can run the file with the `-h` or `--help` flag to see a list of all configuration options.
    :::

6. Use one of the following commands to execute the `goshimmer` file, depending on your operating system:

    ```bash
    # Linux and macOS
    ./goshimmer
    # Windows
    .\ goshimmer
    ```

    :::info:
    If you see a `permission denied` error, try executing the file as an administrator.
    :::

:::success:Congratulations :tada:
You're now running a GoShimmer node.
:::

![GoShimmer status screen](../images/goshimmer.png)

The status screen displays the following statistics in the top-right corner:

- **TPS:** The number of transactions per second, which are separated into two categories. The **received** transactions are those that the node has just appended to its ledger. The **new** transactions are solid transactions.
- **Node ID:** The node's public key that gives it a unique identity
- **Neighbors:** The number of neighbors that the node is connected to. All nodes can have a maximum of 8 neighbors. Each node chooses 4 neighbors to connect to and accepts incoming connections from 4 other neighbors that chose it.
- **Known peers:** The total number of nodes in the network. At the moment, the number of **neighborhood** nodes is the same as the number of **total** nodes. When the network allows sharding, the **neighborhood** nodes will be those that are in the node's shard.
- **Uptime:** The total amount of time during which the node has been running

:::info:
If you don't have any accepted neighbors, make sure that you've forwarded your `autopeering` TCP/UDP port (14626) to your device.
:::

## Next steps

Now that your node is running, you can [send it spam transactions](../how-to-guides/send-spam.md) to test how many transactions per second your node can process.

To see the transactions in the GoShimmer network's Tangle, open the visualizer by going to `http://127.0.0.1:8082` in a web browser.

![GoShimmer visualizer](../images/visualizer.png)

