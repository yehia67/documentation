# Set up a sensor server

**By setting up a sensor as a server, you can allow other devices to request data from it over the internet. This is useful for applications that need to access this data and perform calculations on it.**

:::info:
Due to a bug in RIOT OS, the nRF52832 is the only supported microcontroller at the moment. An implementation for state-of-the-art hardware such as the nRF52840 is in progress.
:::

## Prerequisites

- [Set up an nRF52832 microcontroller](../how-to-guides/set-up-nrf52-microcontroller.md)
- [Connect a BME/BMP 280 sensor to the microcontroller](../how-to-guides/connect-bosch-bme-280-bmp-280.md)
- Linux-based PC that's connected to your microcontroller

## Start the server

1. Change into the `BLE-environment-sensor/examples/env_sensor_network` directory

    ```bash
    cd BLE-environment-sensor/examples/env_sensor_network/
    ```
    
2. Flash the example onto the microcontroller. Replace the `$BOARD` AND `$USB_PORT` placeholders with the name of your board AND the path to your USB-to-UART connector such as `/dev/ttyUSB0` 
    
    ```bash
    BOARD=BOARD PORT=/dev/ttyUSB0 make flash term
    ```

    :::info:
    See the RIOT documentation to [find the name of your board](https://api.riot-os.org/group__boards.html).
    :::

    :::info:
    This is an example application. You can edit the `BLE-environment-sensor/examples/env_sensor_network/server.c` and `BLE-environment-sensor/examples/env_sensor_network/sensor.c` files to support different sensors to the BME/BMP 280.
    :::

If everything went well, you should see no errors, and if you do `help`, you should see a list of available commands.
`server` must be one of the available options.

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

If you haven't already set up a border router, [do it now](../how-to-guides/set-up-a-ble-ipv6-border-router.md).

If you've already set up a border router, then you have a complete Bluetooth star network, and you're ready to try one of our sample applications:

* [Request data from the sensor server](../how-to-guides/run-an-environment-sensor-and-client.md)
* [Attach sensor data to the Tangle](../how-to-guides/run-an-environment-to-tangle-app.md)
