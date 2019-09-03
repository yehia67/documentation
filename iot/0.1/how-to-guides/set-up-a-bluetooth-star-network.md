# Set up a Bluetooth star network (6LoWPAN network)

**In this guide, we set up a a Bluetooth star network, using state-of-the-art IoT industry standards.**

## Prerequisites

- [Configure a Linux-based PC as a border router](../how-to-guides/set-up-a-ble-ipv6-border-router.md)
- [Configure and flash the microcontroller to use as a sensor server](../how-to-guides/set-up-ipv6-ble-host.md) node

:::info:
To create the star network, we use 6LoWPAN. You may want to read about [IPv6 mesh network concepts](../concepts/ipv6-mesh-network.md) before you complete this guide.
:::

---

1. Scan for BLE devices on your border router

    ```bash
    hcitool lescan
    ```

    You can also verify the address by executing the following command on the serial console of your microcontroller

    ```bash
    ifconfig
    ```
    
    The Long HWaddr is the Bluetooth MAC address. It must be the same as the MAC address in the hcitool.

2. Connect your sensor server to your border router. Replace the `00:AA:BB:XX:YY:ZZ` placeholder with the address of your BLE border router

    :::info:
    You can connect multiple sensor servers to your border router.
    :::
    
    ```bash
    echo "connect 00:AA:BB:XX:YY:ZZ 1" >> /sys/kernel/debug/bluetooth/6lowpan_control
    ``` 
