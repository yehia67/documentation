# Run an nRF52 sensor server and a client

**In this guide you set up a 6LoWPAN IoT sensor server that accepts UDP requests for data.**

## Prerequisites

To complete this guide, you need the following:

- [Configure a 6LoWPAN network](set-up-a-bluetooth-star-network.md)
- [Install the Go toolchain on either your SBC or your PC](https://golang.org/doc/install)

## Architecture

The environment sensor runs a server application that waits for incoming UDP requests.

The response is sent back to the client on the same port the client sends a message. For example, if the client (the SBC or the PC) sends a UDP packet on port 90 (outgoing-port at the SBC) to port 51037 (incoming-port on the sensor), 
the sensor sends the response to port 90 (SBC or PC).

The server accepts UDP packets instead of TCP ones because UDP is a connection-less protocol, which is more efficient and more resilient than TCP.

## Run the sensor server and client

1. Start the server on your microcontroller
    
    :::info:
    You need to execute the following command in the serial console of your microcontroller.

    The serial terminal of your microcontroller is opened in the terminal where you executed the `make flash term` command.
    :::
    
    ```bash
    server start
    ```
    
2. Clone the client onto your Linux-based SBC or PC

    ```bash
    git clone https://github.com/iota-community/BLE-environment-sensor-client.git $GOPATH/src/github.com/citrullin/udp_client
    ```
    
3. Run the client application

    ```bash
    cd $GOPATH/src/github.com/citrullin/udp_client && go run client.go
    ```