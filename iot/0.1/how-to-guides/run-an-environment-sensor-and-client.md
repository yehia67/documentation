# Request data from the sensor servers

**In this guide, you request data from the sensors in your Bluetooth star network**

## Prerequisites

To complete this guide, you need the following:

- [Configure a 6LoWPAN network](set-up-a-bluetooth-star-network.md)
- [Install the Go toolchain on a single-board computer (SBC) or a PC](https://golang.org/doc/install)

## Architecture

The environment sensor runs a server application that waits for incoming UDP requests from a client.

The server accepts UDP packets instead of TCP ones because UDP is a connection-less protocol, which is more efficient and more resilient than TCP.

Responses are sent back to the client on the same port from which the request was sent. For example, if the client (the SBC or the PC) sends a UDP packet on port 90 (outgoing-port at the SBC) to port 51037 (incoming-port on the sensor), the sensor sends the response to port 90 (on the SBC or PC).

## Run the sensor server and client

1. Start the server on your microcontroller
    
    :::info:
    You need to execute the following command in the serial console of your microcontroller.

    The serial terminal of your microcontroller is opened in the terminal where you executed the `make flash term` command.
    :::
    
    ```bash
    server start
    ```
    
2. Clone the client onto your SBC or PC

    ```bash
    git clone https://github.com/iota-community/BLE-environment-sensor-client.git $GOPATH/src/github.com/citrullin/udp_client
    ```

3. In the `client.go` file, replace the `"fe80::2ca:46ff:fed3:1967"` IPv6 address with the IPv6 address of your sensor server to allow the client to connect to it

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
    
4. Run the client application

    ```bash
    cd $GOPATH/src/github.com/citrullin/udp_client && go run client.go
    ```

## Next steps

Now, you're ready to [attach this sensor data to the Tangle](../how-to-guides/run-an-environment-to-tangle-app.md).