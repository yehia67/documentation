# Run Chronicle on a Linux server

**When you run Chronicle, it subscribes to transaction events on one or more IRI nodes, then saves that transaction data to a ScyllaDB cluster. This way, all transaction data is saved no matter when/if the IRI node prunes it from its ledger during a local snapshot.**

These instructions will get you a copy of the project up and running on your local machine for testing purposes.

:::warning:
This project is not intended for production use. We are currently working on a Rust version for the final release.
:::

## Prerequisites

To complete this guide, you need the following:

- Independent running Scylla cluster using [ScyllaDB](https://docs.scylladb.com/getting-started/) version 3.0.6 or later

- [Elixir](https://elixir-lang.org/install.html) version 1.8.1 or later 

- [Phoenix](https://hexdocs.pm/phoenix/installation.html)

- [Bazel](https://docs.bazel.build/versions/master/install.html)

When setting up your Scylla cluster, consider the following:

- **Location:** Chronicle and ScyllaDB must be in the same datacenter, but can run on different devices. In future releases, Chronicle will support multiple datacenters.

- **Data transmission:** We recommend frames with an MTU (maximum transmission unit) of at least 9000 bytes for communications between ScyllaDB and Chronicle.  

- **Power outage:** Devices running Chronicle and ScyllaDB should have a backup power supply and Internet connection. A power outage for a number of nodes will not affect data consistency if you have at least one active node writing the same queries.

## Step 1. Configure Chronicle

1. Clone the repo and change into the `chronicle` directory

    ```bash
    git clone https://github.com/iotaledger/chronicle.git
    cd chronicle
    ```

2. Open the core `config.exs` file

    ```bash
    sudo nano apps/core/config/config.exs
    ```

3. In the `__ DATA_CENTERS__` object, change the IP address from `127.0.0.1` to the IP address of your ScyllaDB


4. Open the broker `config.exs` file

    ```bash
    sudo nano apps/broker/config/config.exs
    ```

5. Under the `config:broker __ TOPICS__, sn_trytes`, add the URL of any IRI node that has ZMQ enabled

    ```bash
    {'zmq.iota.org',5556}
    ```

## Step 2. Compile Chronicle

1. Install the required dependencies

    ```bash
    mix deps.get
    ```

2. Generate the phoenix secret and then copy the 64-bytes secret string

    ```
    mix phx.gen.secret
    ```

3. Compile the project

    ```
    mix deps.compile
    mix compile
    ```

## Step 3. Run Chronicle

To run Chronicle, execute the following command:

```
SECRET_KEY_BASE=theGenerated64-byteSecretString PORT=4000 HOST=localhost MIX_ENV=prod elixir --name app@hostname --cookie "MySecretChronicleCookie" -S mix run --no-halt
```

* `SECRET_KEY_BASE`: Your Phoenix secret from step 2.2
* `PORT`: The port that you want the API server to listen to
* `HOST`: The hostname or IP address that you want the API to listen to

:::info:
If the host is localhost, then the value of the `--name` flag can be `Chronicle@localhost`. Otherwise, replace localhost with your hostname.

The value of the `--cookie` flag should be kept secret.
:::

:::success: Congratulations :tada:
Chronicle is now saving all transaction data that it receives from your node to your Scylla cluster.
:::

## Step 4. Test Chronicle

To make sure that Chronicle is receiving transaction data, use the API to query your Scylla cluster.

1. Go to the-tangle.org and copy a transaction hash to your clipboard

2. In the command prompt create a cURL request to the `getTrytes` endpoint of the Chronicle API. Paste your transaction hash into the `hashes` array.

    ```bash
    curl http://host:port/api \
    -X POST \
    -H 'Content-Type: application/json' \
    -H 'X-IOTA-API-Version: 1' \
    -d '{
    "command": "getTrytes",
    "hashes": [""]
    }'
    ```

You should see something like the following:

```json
{
"trytes": [{"address":"JPYUAV9MBDZG9ZX9BAPBBMYFEVORNBIOOZCYPZDZNRGKQYT9HFEXXXBG9TULULJIOWJWQMXSPLILOJGJG","attachmentTimestamp":1567166602904,"attachmentTimestampLowerBound":0,"attachmentTimestampUpperBound":12,"branchTransaction":"OLZDBGOWXCLNZPJZMFUVYPL9COCBSHPIJGIN9L9SNUMMYVZQNDVOCWOYYGJXKHEJGWANXWRBVELB99999","bundle":"VVCRIZWRJ9GOUJRXRBWDEULYKIBIZNKIWGCWZCWVBTVIBAHKVTWLGYQNIZ9JCZJKVEAXABBAUEIGNGWP9","currentIndex":0,"lastIndex":0,"nonce":"JVF9999999RMF99999999999999","obsoleteTag":"HUIWONTO9999999999999999999","signatureMessageFragment":"ODGAHDLDGDNCGDIDRCRCTCTCSCTCSCGADBZAABZACBCBXAABQAGAHDLDGDNCUCPCXC9DTCSCGADB9BBBABQAGAQCPCSCNCQCFDPCBDRCWCGADBVAUAVAZAQAGAQCPCSCNCHDFDIDBDZCGADBVAUAVAZAQAGAQCPCSCNCHDF...","timestamp":1567166602,"trunkTransaction":"BXZWFMSFBAYWJKJUAKWYTUCZRY9GMNETX9MLN9UKRR9ORGRRIENPERNWCLHBCE9XBMYHAMGFYRRL99999","value":0}]
}
```

:::success: Congratulations :tada:
You can successfully query the data in the Chronicle database.
:::

## Step 5. Contribute

Now that you've got Chronicle running, see the [GitHub repository](https://github.com/iotaledger/chronicle) to contribute to issues and to keep up to date with development.

This is an alpha project that we will continue to develop and rewrite in Rust, which is faster and more efficient than Elixir in terms of resource and memory management.


