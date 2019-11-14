# Set up a sensor server

**By setting up a sensor as a server, you can allow other devices to request data from it over the Internet. This is useful for applications that need remote access to this data to perform calculations on it.**

:::info:
Due to a bug in RIOT OS, the nRF52832 is the only supported microcontroller at the moment.
:::

## Hardware

To complete this guide, you need the following:

- [An nRF52832 microcontroller](../how-to-guides/set-up-nrf52-microcontroller.md)
- [A BME/BMP 280 sensor](../how-to-guides/connect-a-i2c-sensor.md)
- A Linux-based device that's connected to your microcontroller

## Start the server

1. Change into the `BLE-environment-sensor/examples/env_sensor_network` directory

    ```bash
    cd BLE-environment-sensor/examples/env_sensor_network/
    ```
    
2. Flash the example onto the microcontroller. Replace the `$BOARD` AND `$USB_PORT` placeholders with the name of your board and the path to your USB-to-UART connector such as `/dev/ttyUSB0` 
    
    ```bash
    BOARD=BOARD PORT=/dev/ttyUSB0 make flash term
    ```

    :::info:
    Search the RIOT documentation to [find the name of your board](https://api.riot-os.org/group__boards.html).
    :::

If everything went well, you should see no errors, and if you enter `help`, you should see a list of available commands.

To see a list of all running processes, do `ps`.

## Troubleshooting

If you see the following error, install python-protobuf for your Linux distribution:

```bash
*************************************************************
*** Could not import the Google protobuf Python libraries ***
*** Try installing package 'python-protobuf' or similar.  ***
*************************************************************
```

For example, for Ubuntu, do the following:

```bash
sudo apt-get install python-protobuf
```

## Next steps

[Set up a border router](../how-to-guides/set-up-a-ble-ipv6-border-router.md).

If you've already set up a border router, then you're ready to [set up a Bluetooth star network](../how-to-guides/set-up-a-bluetooth-star-network.md).

This is an example application. To support sensors other than the BME/BMP 280, you can edit the `BLE-environment-sensor/examples/env_sensor_network/server.c` and `BLE-environment-sensor/examples/env_sensor_network/sensor.c` files.
