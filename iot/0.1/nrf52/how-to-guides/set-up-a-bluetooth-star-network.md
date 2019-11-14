# Set up a Bluetooth star network

**Star networks are useful for setting up sensor server networks that communicate through a border router. In this guide, you set up a [6LoWPAN](../concepts/ipv6-mesh-network.md) over Bluetooth Low-Energy star network, using state-of-the-art IoT industry standards.**

## Hardware

To complete this guide, you need the following:

- [A border router](../how-to-guides/set-up-a-ble-ipv6-border-router.md)
- [A sensor server node](../how-to-guides/set-up-ipv6-ble-host-example.md)

## Architecture

In the star topology, all devices directly communicate with the border router, which acts as a switch to pass on their messages through the Internet.

You could connect more than one sensor server node to the border router, but in this example we connect only one.

![Star network topology](../images/star_topology.png)

## Step 1. Connect the border router to the nodes

1. In the serial console of your sensor server node, find the Bluetooth MAC address

    ```bash
    ifconfig
    ```

    :::info:
    The Long HWaddr is the Bluetooth MAC address.
    :::

2. On your border router, scan for BLE devices 

    ```bash
    hcitool lescan
    ```

    You should see the Bluetooth MAC address of the sensor server node.

3. Connect your sensor server node to your border router. Replace the `00:AA:BB:XX:YY:ZZ` placeholder with the address of your sensor server
    
    ```bash
    echo "connect 00:AA:BB:XX:YY:ZZ 1" >> /sys/kernel/debug/bluetooth/6lowpan_control
    ```

    :::info:
    You can connect more than one sensor server node to your border router by adding other addresses.
    :::

## Step 2. Request data from the sensor servers

**In this guide, you request data from the sensors in your Bluetooth star network**

## Run the sensor server and client

The environment sensor runs a server application that waits for incoming UDP requests from a client.

The server accepts UDP packets instead of TCP ones because UDP is a connection-less protocol, which is more efficient and more resilient than TCP.

Responses are sent back to the client on the same port from which the request was sent. For example, if the client (the SBC or the PC) sends a UDP packet on port 90 (outgoing-port at the SBC) to port 51037 (incoming-port on the sensor), the sensor sends the response to port 90 (on the SBC or PC).

1. [Install the Go programming language on a Linux device](../how-to-guides/install-go-on-sbc.md)

2. Start the server on your microcontroller
    
    :::info:
    You need to execute the following command in the serial console of your microcontroller.

    The serial terminal of your microcontroller is opened in the terminal where you executed the `make flash term` command.
    :::
    
    ```bash
    server start
    ```
    
3. Clone the client code onto your Linux device

    ```bash
    git clone https://github.com/iota-community/BLE-environment-sensor-client.git $GOPATH/src/github.com/citrullin/udp_client
    ```

4. In the `client.go` file, replace the `"fe80::2ca:46ff:fed3:1967"` IPv6 address with the IPv6 address of your sensor server to allow the client to connect to it

    ```c
    var seedSensorConfig = SensorNode{
        Config: SensorConfig{
            Address: net.UDPAddr{
                IP: net.ParseIP("fe80::2ca:46ff:fed3:1967"), Port: 51037, Zone: interfaceName,
            },
        },
    }
    ```

    :::info:
    To find out the IPv6 address of your sensor server, execute the `ifconfig` command in the serial interface of the microcontroller.
    :::
    
5. Run the client application

    ```bash
    cd $GOPATH/src/github.com/citrullin/udp_client && go run client.go
    ```

## Next steps

Now, you're ready to [attach this sensor data to the Tangle](../projects/run-an-environment-to-tangle-app.md).