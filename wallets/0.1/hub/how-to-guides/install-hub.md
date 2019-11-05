# Run Hub

**By running Hub, you expose an API that your application can use to manage users' accounts. In this guide, you'll install and run an instance of Hub as a service on a Linux server.**

You have two options for running Hub. You either can run Hub as a service in a Docker container, or you can build it from source.

## Run Hub in a Docker container

When you run Hub in a Docker container, it's similar to running it in a lightweight virtual machine.

Some of the advantages of running Hub in a Docker container include the following:

- You don't need to install all the tools and dependencies yourself such as a compiler
- Hub runs in the same way on any supported system architecture
- It's easier to run Hub in the background, to stop it, and to see the logs

### Prerequisites

To complete this guide, you need [Docker](https://docs.docker.com/install/#supported-platforms).

:::info:
If you're using a Debian-based operating system, add `sudo` before all the commands in the following tasks.
:::

### Step 1. Install the database server

By default, Hub uses [MariaDB 10.2.1+](https://mariadb.com/) because it supports CHECK constraints, which restrict the data you can add to the table.

1. Create a network called hub

	```bash
	sudo docker network create hub
	```

2. Install the MariaDB Docker image
    
    ```bash
    docker run \
	--name mariadb \
	--rm \
	--hostname mariadb.local \
	--net=hub \
	-e MYSQL_ROOT_PASSWORD=arootpassword \
	-e MYSQL_USER=hubuser \
	-e MYSQL_PASSWORD=hubpassword \
	-e MYSQL_DATABASE=hubdb \
	-v ~/db-conf:/conf \
	-v ~/db-data:/var/lib/mysql \
	mariadb/server:10.3
    ```

2. Change into the `goshimmer` directory

    ```bash
    cd goshimmer
    ```

3. Build the Docker image

    ```bash
    docker build -t goshimmer .
    ```

4. Run the Docker image

    Here, we run the Docker image in the background, forward the ports from your host device to the Docker container, and and use the [command-line options](../references/command-line-options.md) to enable the spammer, ZMQ, and dashboard plugins. These plugins allow you to send spam transactions to your node, monitor it for incoming transactions, and view the total number of transactions that it's processing in a web dashboard.

    :::info:
    If you have [Docker Compose](https://docs.docker.com/compose/), you can also use the `docker-compose up -d` command.
    :::

    ```bash
    sudo docker run -d --rm -p 14666:14666 -p 14626:14626 -p 14626:14626/udp -p 8080:8080 -p 8081:8081 -it -v mainnetdb:/app/mainnetdb goshimmer --node-enable-plugins "spammer zeromq dashboard"
    ```

    The container ID is displayed in the console.

    :::info:
    To have the Docker container restart on every reboot, add the `--restart=always` flag to the `run` command.
   :::

5. Copy the container ID, and use it to read the node's logs. Replace the `$ContainerID` placeholder with your container ID.

    ```bash
    docker logs -f $ContainerID
    ```

6. To see the status screen, attach the Docker container by doing the following. Replace the `$ContainerID` placeholder with your container ID.

    ```bash
    docker attach $ContainerID
    ```

:::success:Congratulations :tada:
You're now running a GoShimmer node.
:::

## Build a node from source

When you build the node from the source code, you need to make sure that you have the prerequisites such as GCC, and the Go programming language.

## Prerequisites

To complete this guide, you need an [Ubuntu 18.04 LTS](https://www.ubuntu.com/download/server) server. If you are on a Windows or Mac operating system, you can [create a Linux server in a virtual machine](root://general/0.1/how-to-guides/set-up-virtual-machine.md).

## Step 1. Install the dependencies

To build and run Hub, you need to install a compiler, Python, and Git.

1. Make sure that your local `apt` repository is up to date

	```bash
	sudo apt update 
	sudo apt upgrade
	```

2. Install a compiler, such as GCC, Clang, or a toolchain from [@iota_toolchains](https://github.com/iotaledger/toolchains)

	```bash
	sudo apt install -y gcc-7
	```

3. Install the dependencies for the Bazel binary installer

	```bash
	sudo apt install -y pkg-config zip g++ zlib1g-dev unzip python
	```

4. Download the binary installer for the [latest version of Bazel](https://github.com/bazelbuild/bazel/releases)

	```bash
	wget https://github.com/bazelbuild/bazel/releases/download/0.29.1/bazel-0.29.1-installer-linux-x86_64.sh
	```
	The download may take some time.
	
	If everything went well, you should see the following in the output:

	```
	HTTP request sent, awaiting response ... 200 OK
	```

5. Give yourself permission to execute the script

	```bash
	chmod +x bazel-0.29.1-installer-linux-x86_64.sh
	```

6. Install Bazel

	```bash
	./bazel-0.29.1-installer-linux-x86_64.sh --user
	```

	The `--user` flag installs Bazel in the `$HOME/bin` directory on your system.

7. Add the `$HOME/bin` directory to your `$PATH` variable

	```BASH
	PATH="$PATH:$HOME/bin"
	```

8. Install the `pyparsing` package for Python

	```bash
	sudo apt install -y python-pyparsing
	```

9. Install Git

	```bash
	sudo apt install -y git
	```

## Step 2. Install the database server

By default, Hub uses [MariaDB 10.2.1+](https://mariadb.com/) because it supports CHECK constraints, which restrict the data you can add to the table.

The default repositories for Ubuntu 18.04 LTS don't provide a package that can be used for the database. Instead, you can install a custom Personal Package Archive (PPA) for the official MariaDB repository.

1. Request a GNU Privacy Guard (GPG) key to download the PPA

	```bash
	sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xF1656F24C74CD1D8
	```

2. Add the MariaDB repository
	
	```bash
	sudo add-apt-repository 'deb [arch=amd64,arm64,ppc64el] http://ftp.utexas.edu/mariadb/repo/10.3/ubuntu bionic main'
	```

3. Make sure that your local `apt` repository is up to date

	```bash
	sudo apt update
	```

4. Install the MariaDB server

	```bash
	sudo apt install mariadb-server
	```

	During the installation, you'll be prompted to enter a root password for MariaDB. Enter a secure password and remember it. You will need it later on.

	![MariaDB password prompt](../images/mariapassword.png)

5. Make sure that MySQL is installed

	```bash
	mysql --version
	```

The output should display something like the following:

```shell
mysql  Ver 15.1 Distrib 10.3.10-MariaDB, for debian-linux-gnu (x86_64) using readline 5.2
```
 
Here, you can see that MariaDB 10.3.10 is installed, which is a later version than the minimum of 10.2.1.

## Step 3. Build Hub

After setting up all these dependencies, you need to install and build Hub.

1. Clone the GitHub repository

	```bash
	git clone https://github.com/iotaledger/hub.git
	```

2. Change into the `hub` directory

	```bash
	cd hub
	```

3. Build Hub from the source code:

	```bash
	bazel build -c opt //hub:hub
	```

	This process can take a while, depending on the hardware or virtual machine.

	After the build is complete, the output should display something like the following:

	```shell
	Target //hub:hub up-to-date:
		bazel-bin/hub/hub
	INFO: Elapsed time: 1531.342s, Critical Path: 208.27s
	INFO: 1377 processes: 1377 linux-sandbox.
	INFO: Build completed successfully, 1811 total actions
	```

## Step 4. Create the database

After Hub is installed, you need to create the database tables that store Hub's data.

:::info:
In these commands, make sure to replace the `myrootpassword` placeholder with the root password you chose when you installed the MariaDB database.
:::

1. Create a database called hub

	```bash
	echo "CREATE DATABASE hub" | mysql -uroot -pmyrootpassword
	```

2. Load the database schema from the Hub source code into the database

	```bash
	mysql -h127.0.0.1 -uroot -pmyrootpassword hub < schema/schema.sql
	```

3. Import the database triggers

	```bash
	mysql -h127.0.0.1 -uroot -pmyrootpassword hub < schema/triggers.mariadb.sql
	```

## Step 5. Run Hub

To run Hub, you need to execute the binary file that was created during the build process. This binary file is located in the `./bazel-bin/hub/hub` directory.

1\. Create a shell script file called `start.sh`

```bash
nano start.sh
```

2\. In the start.sh file, add the command for running hub with the [command line options](../references/command-line-options.md) that you want to use

### Best practice

To avoid connecting to a malicious node, we recommend connecting Hub to a local Mainnet node that you control. If you don't have a local Mainnet node, [read about the IRI node software](root://node-software/0.1/iri/introduction/overview.md) for guides on setting one up.

--------------------
### gRPC API

This command connects to a local Mainnet node on port 14265, and exposes the gRPC API server on port 50051 of the local host.

```shell
#!/bin/bash
	
./bazel-bin/hub/hub \
	--salt CHANGETHISTOSOMETHINGMORESECURE \
	--db hub \
	--dbUser root \
	--dbPassword myrootpassword \
	--apiAddress 127.0.0.1:14265 \
	--minWeightMagnitude 14 \
	--listenAddress 127.0.0.1:50051
```
---

### RESTful API

This command connects to a local Mainnet node on port 14265, and exposes the RESTful API server on port 50051 of the localhost.

```shell
#!/bin/bash
	
./bazel-bin/hub/hub \
	--salt CHANGETHISTOSOMETHINGMORESECURE \
	--db hub \
	--dbUser root \
	--dbPassword myrootpassword \
	--apiAddress 127.0.0.1:14265 \
	--minWeightMagnitude 14 \
	--listenAddress 127.0.0.1:50051
	--serverType http
```
---

### HTTPS Devnet node

For testing purposes, you may want to connect to a remote [Devnet](root://getting-started/0.1/references/iota-networks.md#devnet) node. Most remote nodes use an HTTPS connection, so this command has the [`--useHttpsIRI` flag](../references/command-line-options.md#useHttpsIRI) set to `true`.

```shell
#!/bin/bash
	
./bazel-bin/hub/hub \
	--salt CHANGETHISTOSOMETHINGMORESECURE \
	--db hub \
	--dbUser root \
	--dbPassword myrootpassword \
	--apiAddress nodes.devnet.iota.org:443 \
	--minWeightMagnitude 9 \
	--listenAddress 127.0.0.1:50051 \
	--useHttpsIRI true
```
--------------------

:::warning:Warning
Replace the value of the `salt` flag with a string of at least 20 characters. This value is used by Hub to create seeds, so keep it secret.
:::
	
3\. Give yourself permission to execute the script

```bash
chmod a+x start.sh
```

4\. Run the shell script to start Hub

```bash
./start.sh
```

You're running Hub in your shell session. If you close this session, Hub will stop. To keep Hub running in the background, you can use a screen/tmux session, a system-wide service, or a supervised process.

For this guide, you'll use a supervisor process to make sure that Hub always runs and automatically restarts after a reboot or a crash. 

5\. Install the `supervisor` package (press `CTRL+C` to exit the current shell session):

```bash
sudo apt install -y supervisor
```

6\. Create a configuration file for the supervised process

```bash
sudo nano /etc/supervisor/conf.d/hub.conf
```

7\. Add the following lines to the hub.conf file. Replace the value of the `user` field with your username, and make sure that the paths in the `command`, `directory`, `stderr_logfile`, and `stdout_logfile` fields are correct for your user.

```shell
[program:hub]
command=/home/dave/hub/start.sh
directory=/home/dave/hub/
user=dave
autostart=true
autorestart=true
stderr_logfile=/home/dave/hub/err.log
stdout_logfile=/home/dave/hub/info.log
```

8\. Save the hub.conf file and reload supervisor

```bash
sudo supervisorctl reload
```

Hub should now be running in the background and should automatically start again after a server reboot or a crash.

9\. Check the supervisor status

```bash
sudo supervisorctl status
```

The output should display something like the following:

```shell
hub                              RUNNING   pid 9983, uptime 0:01:22
```

:::success:Congratulations :tada:
Hub is running in the background! Now, you can use its API to start creating user accounts.
:::

## Next steps

Depending on how you started Hub, it exposes either a gRPC API server or a RESTful API server for you to interact with:

- [Get started with the gRPC API](../how-to-guides/get-started-with-the-grpc-api.md)
- [Get started with the RESTful API](../how-to-guides/get-started-with-the-grpc-api.md)

To improve the security of your Hub, connect it to a [signing server](../how-to-guides/install-the-signing-server.md).
