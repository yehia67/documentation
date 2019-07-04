# Run a node on the Coordicide Alphanet

**When you run the Coordicide Alphanet software, your computer becomes a node in the network. By running a node, you can test the network and keep up to date with regular changes. When all the modules become available, this network will become a testnet, which is a candidate for an official release.**

## Prerequisites

To complete this guide, you need the following:

* Administrator access to your router
* An Internet connection
* A [public IP address](root://general/0.1/how-to-guides/expose-your-local-device.md) that's either static or connected to a dynamic DNS service such as [duckdns.org](https://www.duckdns.org)
* At least version 1.12 of the Go programming language (we recommend the latest version)
* GCC: For macOS, you can install GCC using [Homebrew](https://brew.sh/) (`brew install gcc`). For Windows, you can [install TDM-GCC](http://tdm-gcc.tdragon.net/download). For Linux (Ubuntu 18.04), you can [install GCC from the `build-essential` package](https://linuxize.com/post/how-to-install-gcc-compiler-on-ubuntu-18-04/).
* [Git](https://git-scm.com/downloads)


## Step 1. Download the code

1. In the command prompt, check your `GOPATH` environment variable

    ```bash
    go env GOPATH
    ````

2. In any directory outside of the one in your `GOPATH` environment variable, clone the `goshimmer` GitHub repository

    ```bash
    git clone https://github.com/iotaledger/goshimmer.git
    ```

3. Change into the `goshimmer` directory

    ```bash
    cd goshimmer
    ```

4. Install the dependencies

    ```bash
    go get
    ```

## Step 2. Run the node

You have two options to run the node. You can either run the `main.go` file (`go run main.go`) or you can build an executable file (`go build -o shimmer`) and execute it.

If you build the executable file, you'll have a file called `shimmer` that you need to execute.

To execute this file on Linux or macOS, do `./shimmer`.

To execute this file on Windows, rename it to `shimmer.exe`, then execute it by double clicking the file, or by doing `.\shimmer.exe` in the command prompt.

## Next steps

Send some transactions to your node and see that transaction data by subscribing to events.

Run another node

See that it autopeers with that node

Explain what happened (entry node facilitates the connection? What's the maximum number of neighbors? What are the critera for auto removing/adding neighbors?)

How is the node ID used? Is voting implemented yet?

