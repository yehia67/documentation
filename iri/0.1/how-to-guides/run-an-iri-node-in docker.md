# Run an IRI node in a Docker container

**When you run the IRI in a Docker container, your computer becomes an IRI node that gives you direct access to an IOTA network. By running an IRI node, you help the IOTA network to become more distributed by adding to the number of ledgers and validating your neighbor IRI node's transactions.**

## Prerequisites

* To run the IRI, your computer must meet the following minimum requirements:
    * 4GB RAM
    * 64-bit processor
    * A public IP address: Either a static IP address or a dynamic IP address that's connected to a dynamic DNS such as [noip.com](https://www.noip.com/remote-access)

* By default, the IRI uses the following ports. You must forward these ports to your computer's public IP address.

    * **UDP neighbor peering port:** 14600
    * **TCP neighbor peering port:** 14600
    * **TCP API port:** 14265

<hr>

The IRI Docker container is suitable for the following operating systems:
* Linux
* MacOSX
* Windows

You have two options for downloading the IRI Docker container:
* [Download the pre-built Docker container](#download-the-pre-built-iri-docker-container)(quickest option)
* [Build the Docker container from the source code](#build-the-iri-docker-container-from-the-source-code)

## Install Docker

To build the IRI Docker container, Docker 17.05+ (for multi-stage build support) must be installed on your computer.

1. [Install Docker](https://docs.docker.com/install/#supported-platforms)

2. Make sure that Docker is installed

    ```bash
    $ docker run hello-world
    ```

    You should see some Docker information in the output.
  
## Download the pre-built IRI Docker container

The Docker container for the pre-built IRI Java file is available on the IOTA GitHub repository.

```bash
$ docker pull iotaledger/iri:latest
```

## Build the IRI Docker container from the source code

Instead of downloading the pre-built Docker container, you may want to build the file from the source code the any of the following reasons:
* You want to be sure that the code you run is the same as the source code
* You want to modify the code before you run it

1. [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

2. Make sure that Git is installed

    ```bash
    $ git --version
    ```

    You should see the version number of your Git installation.

3. Build the latest version of the IRI

    ```bash
    $ git clone https://github.com/iotaledger/iri.git
    $ cd iri
    $ export TAG=$(git describe --tags $(git rev-list --tags --max-count=1))
    $ git checkout ${TAG}
    $ docker build -t iri .
    ```
## Run the IRI

You can configure the IRI by passing in [IRI configuration options](../references/iri-configuration-options.md) as flags.

1. Run the IRI with the default configuration options as flags

    ```bash
    $ docker run -d -p 14265:14265 -p 15600:15600 -p 14600:14600/udp --name iri iotaledger/iri:latest --remote -p 14265
    ```

    If you want to save your configuration options in an IRI configuration file, you must pass the path to that file along with the `-c` flag. For example, if you save a config.iri file in the `/path/to/conf/config.ini` on your docker host, then add `-c /path/to/conf/config.ini` to docker run arguments.

    **Notes:**
    * If you built the IRI Docker container from the source code, you must change the value of the `-name` flag to `iri iri:latest`
    * To have the IRI Docker container restart on every boot, add the `--restart=always` flag to the Docker RUN command

2. Allow the IRI to log its output to the console

    ```bash
    $ docker logs -f iri
    ```

    Congratulations :tada: You're now running an IRI node! You'll notice in the output that the the logs are showing 0 transactions. That's because you're not connected to any [neighbor IRI nodes](../concepts/neighbor-iri-node.md) yet.

3. [Find neighbors](../how-to-guides/find-neighbor-iri-nodes.md) and add their URL or IP addresses to your config.iri file

Now that your node is up and running, it'll start to [synchronize its ledger with the network](../concepts/the-ledger.md#ledger-synchronization). Give your node some time to synchronize, or read our troubleshooting guide if your IRI node isn't synchronizing.

## Check that the IRI is synchronized

The IRI is considered synchronized when the `latestMilestoneIndex` field is equal to the `latestSolidSubtangleMilestoneIndex` field.

The `latestMilestoneIndex` field is the index of the latest milestone that the IRI has received from its neighbors.

The `latestSolidSubtangleMilestoneIndex` field is the index of the latest milestone for which the IRI node's ledger has all the transactions that the milestone directly and indirectly references.

To check these fields, call the `getNodeInfo` API endpoint

```bash
$ sudo apt install curl jq
$ curl -s http://localhost:14265 -X POST -H 'X-IOTA-API-Version: 1' -H 'Content-Type: application/json' -d '{"command": "getNodeInfo"}' | jq
```

**Notes:**
* The [jq](https://stedolan.github.io/jq/) tool is a command-line JSON processor that helps you to display and manipulate JSON data. This tool is optional.
* It may take some time for the IRI to synchronize. For help with any issues, read our [troubleshooting guide](../references/troubleshooting.md).

## Next steps

* [Interact with the IRI](../how-to-guides/interact-with-the-iri.md)
* [Subscribe to events in the IRI](../how-to-guides/subscribe-to-events-in-the-iri.md)