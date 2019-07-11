# Run an Ict node

**When you execute the Ict Java file on a Linux server, it becomes an Ict node that can send and receive transactions in the Ict network. By running a node, you help the network to become more distributed by adding to the total number of nodes.**

## Prerequisites

To complete this guide, you need the following:

* Administrator access to your router
* An Internet connection
* A Linux server (this guide has been tested on [Raspbian Stretch Lite](https://www.raspberrypi.org/downloads/raspbian/))
* A [public IP address](root://general/0.1/how-to-guides/expose-your-local-device.md) that's either static or connected to a dynamic DNS service such as [duckdns.org](https://www.duckdns.org)

Ict can run on any Internet-connected device that can run a Java runtime environment (JRE). For example, Ict can run on a Raspberry Pi, a laptop, a VPS, a virtual machine, or an Android phone.

## Step 1. Set up your system

Before you download the Ict, make sure your system is up to date, create a new user called `ict`, and download and install the Java 8 OpenJDK.

1. Install the latest security patches for your system

    ```bash
    sudo apt-get update
    sudo apt-get upgrade -y
    ```

2. Create a new user called `ict` and set its home directory to `/home/ict`

    ```bash
    sudo useradd ict -d /home/ict -m
    ```

3. Change into the `/home/ict` directory

    ```bash
    cd /home/ict
    ```

4. Download and install the Java 8 OpenJDK

    ```bash
    sudo add-apt-repository universe
    sudo apt-get install -y software-properties-common --no-install-recommends
    sudo apt-get install openjdk-8-jdk
    sudo apt-get update
    ```

## Step 2. Download the Ict Java file

You have two options for downloading the latest Ict software:

* Download the pre-built Java file from GitHub (quickest option)
* Build the Java file from the source code on GitHub

### Download the pre-built Java file

The pre-built Java file is available on the [IOTA GitHub repository](https://github.com/iotaledger/ict/releases). Downloading and executing this file is the quickest and simplest way to install the Ict.

1. Download the latest Ict Java file into your `/home/ict` directory. Replace the `${VERSION}` variable with the [latest version](https://github.com/iotaledger/iri/releases) of the Ict.

    ```bash
    sudo wget https://github.com/iotaledger/ict/releases/download/${VERSION}/ict-${VERSION}.jar
    ```

    The download may take some time. If everything went well, you should see the following line near the end of the output:

    ```
    HTTP request sent, awaiting response ... 200 OK
    ```

2. List the files

    ```bash
    ls
    ```

    You should see the Ict Java file (.jar). This file is the one that you need to execute to run the node.

### Build the Ict Java file from the source code

Instead of downloading the pre-built Ict Java file, you may want to build the file from the source code the any of the following reasons:
* You want to be sure that the code you run is the same as the source code
* You want to modify the source code before you run it

1. Change into your `/home` directory

    ```bash
    cd /home
    ```

2. Install Git

    ```bash
    sudo apt-get install -y git
    ```
    :::info:
    To make sure that Git is installed, do the following: `git --version`. You should see a version number. If not, try installing Git again.
    :::

3. Install npm

    ```bash
    sudo apt-get install -y npm
    ```

    :::info:
    To make sure that npm is installed, do the following: `npm -v`. You should see a version number. If not, try installing npm again.
    :::

4. Install Gradle

    ```bash
    sudo apt-get install -y gradle
    ```

    :::info:
    To make sure that Gradle is installed, do the following: `gradle -v`. You should see a version number. If not, try installing NPM again.
    :::

5. Clone the source code from GitHub

    ```bash
    sudo git clone https://github.com/iotaledger/ict
    ```

6. Change into the `ict` directory

    ```bash
    cd ict
    ```

7. Build the Ict Java file

    ```bash
    sudo gradle fatJar
    ```

    If everything went well, you should see the `BUILD SUCCESSFUL` message in the output.

8. Install the dependencies for the ict website and build the files

    ```bash
    cd web
    sudo npm install
    sudo npm run build
    `````

    If everything went well, you should see the `Built in xxxs.` message in the output.

9. Change into the `/home/ict` directory and list the files

    ```bash
    cd ..
    ls
    ```

    You should see the Ict Java file (.jar). This file is the one that you need to execute to start the node. But, before you do that, you need to configure the Ict.

## Step 3. Run and configure the Ict

Before a node can start receiving and sending transactions, you need to configure it so that it can connect to neighbors.

1. Execute the Ict Java file with the `--config-create` flag to create the directories and the default configuration file. Replace the `${VERSION}` variable with the version of the Ict that you downloaded.

    ```bash
    sudo java -jar ict-${VERSION}.jar --config-create
    ```

    :::info:
    [See more command-line flags](../references/command-line-flags.md).
    ::: 

    You should see the following at the end of the output:

    ```
    ALL   |NEW   |REQ   |INV   |IGN   |ADDRESS
    ```

    This line means that your node is running and that it's not yet configured because it's not receiving any transactions. That's OK. By executing the file, all the directories that you need are created for you.
    
    You should have the following directories as well as an `ict.cfg` configuration file:

    * `logs`: This directory stores all the log messages that the node creates
    * `modules`: This directory stores the IXI modules that are installed on your node
    * `web`: This directory stores the JavaScript, HTML, and CSS files that render the Ict website

2. [Forward the following ports from your router to your device](root://general/0.1/how-to-guides/expose-your-local-device.md):

    * **2187 (GUI port):** Forward through the UDP and TCP protocols
    * **1337 (Ict port):** Forward through the UDP protocol

3. In a web browser, enter the URL of your node followed by `:2187` and log in

    ![Ict login](../images/ict-password.png)

    :::info:
    If you can't access this page, [make sure that you've forwarded the GUI port (default is 2187) to your device through the UDP and TCP protocols](root://general/0.1/how-to-guides/expose-your-local-device.md).
    :::

4. [Find some neighbors](../how-to-guides/find-neighbors.md)

5. Go to **NEIGHBORS** > **ADD NEW** and enter the IP address or URL of one of your neighbors followed by a colon and the Ict port

    ```
    example.com:1337
    ```

    :::info:
    Repeat this step for each neighbor.
    :::

6. Click **Log** and check that you are receiving transactions from your neighbors. You should see something like the following:

    ```
    1 |1 |0 |0 |0 neighbor URL/neighbor IP:neighbor port
    ```

    :::info:
    This line means that your neighbor has sent you one transaction in total.

    This number will continue to increase as your neighbor sends you more transactions.
    :::

:::success:Success
Congratulations :tada: Your node is running, connected to neighbors, and sending and receiving transactions. [Find out what the data in these logs means](../references/log-data.md).
:::

## Step 4. Create a systemd service to control your node

A `systemd` service runs when a Linux system boots up. By using a `systemd` service, you can start, stop, restart, and control logging for the Ict with simple one-line commands. You can also make sure that the Ict start automatically when you restart your device.

1. If you're node is running, press **Ctrl**+**C** to stop it

2. Create a new `systemd` file

    ```bash
    sudo nano /etc/systemd/system/ict.service
    ```

3. Copy and paste the following into the file. Replace the `${VERSION}` variable with the version of the Ict that you downloaded.

    ```
    [Unit]
    Description=IOTA Ict Service
    After=network-online.target
    
    [Service]
    WorkingDirectory=/home/ict
    ExecStart=/usr/bin/java -jar /home/ict/ict-${VERSION}.jar
    KillMode=process
    Type=simple
    User=ict
    StandardOutput=inherit
    StandardError=inherit

    [Install]
    WantedBy=multi-user.target
    ```

4. Save the file by pressing **Ctrl**+**X**, **y** then **Enter**

5. Give yourself permission to execute the `ict` service and enable it to start at boot

    ```bash
    chmod u+x /etc/systemd/system/ict.service
	sudo systemctl daemon-reload
	sudo systemctl enable ict
    ```

6. Start the Ict and check that it's running

    ```bash
    sudo systemctl start ict
    systemctl status ict
    ```

    If the Ict is running, you should see the `active (running)` message in the output.

7. Display the log messages

    ```bash
    journalctl -fu ict
    ```

8. To stop displaying the log messages press **Ctrl**+**C**. The Ict will continue running in the background

### Stop and restart the Ict

You can use the following `systemd` commands to start, stop, and restart the Ict:

```bash
# Start the Ict
sudo systemctl start ict
# Restart the Ict
sudo systemctl restart ict
# Stop the Ict
sudo systemctl stop ict
```

### View log messages

You can view the log messages as they are written by doing the following:

```bash
journalctl -fu ict
```

If you want more detailed log messages, you can stop the Ict and execute the Ict Java file with the `--debug` flag. Replace the `${VERSION}` variable with the version of the Ict that you downloaded.

```bash
systemctl stop ict
java -jar /home/ict/ict${VERSION}.jar --debug
```

:::info:
[See more command-line flags](../references/command-line-flags.md).
::: 

## Next steps

[Send API requests to your node](../how-to-guides/getting-started-api.md).

[Install some IXI modules](../how-to-guides/install-ixi-modules.md) to extend the functionality of your node.

