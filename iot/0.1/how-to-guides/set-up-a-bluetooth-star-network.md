# Set up a Bluetooth star network

**Star networks are useful for setting up sensor server networks. In this guide, you set up a a [6LoWPAN](../concepts/ipv6-mesh-network.md) Bluetooth star network, using state-of-the-art IoT industry standards.**

## Prerequisites

- [Configure a Linux-based PC as a border router](../how-to-guides/set-up-a-ble-ipv6-border-router.md)
- [Configure and flash the microcontroller to use as a sensor server node](../how-to-guides/set-up-ipv6-ble-host-example.md)

---

1. Scan for BLE devices on your border router

    ```bash
    hcitool lescan
    ```

    You can also verify the address by executing the following command in the serial console of your microcontroller

    ```bash
    ifconfig
    ```
    
    The Long HWaddr is the Bluetooth MAC address. It must be the same as the MAC address that was returned by the `hcitool` scan.

2. Connect your sensor server to your border router. Replace the `00:AA:BB:XX:YY:ZZ` placeholder with the address of your sensor server

    :::info:
    You can connect multiple sensor servers to your border router by adding other addresses.
    :::
    
    ```bash
    echo "connect 00:AA:BB:XX:YY:ZZ 1" >> /sys/kernel/debug/bluetooth/6lowpan_control
    ```

## Next steps

Now that you have a Bluetooth star network, you're ready to try one of our sample applications:

* [Request data from the sensor server](../how-to-guides/run-an-environment-sensor-and-client.md)
* [Attach sensor data to the Tangle](../how-to-guides/run-an-environment-to-tangle-app.md)