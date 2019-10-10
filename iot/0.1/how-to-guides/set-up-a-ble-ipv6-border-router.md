# Set up a border router

**To allow the sensor servers in a star network to access the Internet, you need a border router that can pass on their data. In this guide, you use set up a border router on a Linux device.**

## Prerequisites

To complete this guide, you need the following:

- Either a single-board computer such as a Raspberry Pi or a Linux-based PC to use as the border router
- A Linux distribution such as Ubuntu
- Bluetooth <= 4.0 (USB dongle or integrated)

## Step 1. Install a compatible Linux kernel

Due to [a bug in RIOT OS](https://github.com/RIOT-OS/RIOT/issues/11147), you need to use an older Linux kernel (maximum version 4.12) to set up a border router.

1. Check which version of the Linux kernel your device has

    ```bash
    uname -a
    ```

    If you see a version number that's greater than 4.12, continue to step 2. Otherwise, skip the rest of these steps and install the 6LoWPAN dependencies.

2. Select your architecture and download the generic kernel image from the 
    [Ubuntu Linux mainline kernel builds](https://kernel.ubuntu.com/~kernel-ppa/mainline/v4.11.12/)


3. Install the kernel

    ```bash
    sudo dpkg -i linux-image*.deb
    ```

4. Restart your system while holding the `SHIFT` key until you see the option to select a kernel 
    
5. Select the kernel version 4.11.12

## Step 2. Install the 6LoWPAN dependencies

:::info:
You need to do these steps for every session. So, if you close your session, for example after a reboot, you have to reinstall these dependencies.
:::

1. Install bluez

    ```bash
    sudo apt-get install -y bluez
    ```

2. Log in as the root user

    ```bash
    sudo su
    ```

3. Mount the `debugfs` file system

    ```bash
    mount -t debugfs none /sys/kernel/debug
    ```

4. Load the Bluetooth 6LoWPAN Linux module

    ```bash
    modprobe bluetooth_6lowpan
    ```

5. Enable the 6LoWPAN module

    ```bash
    echo 1 > /sys/kernel/debug/bluetooth/6lowpan_enable
    ```

6. Find any available Bluetooth devices

    ```bash
    hciconfig
    ```

    You should see something like the following:

    ```bash
    hci0:   Type: Primary  Bus: UART
        BD Address: B8:27:EB:57:16:51  ACL MTU: 1021:8  SCO MTU: 64:1
        UP RUNNING
        RX bytes:1528 acl:0 sco:0 events:92 errors:0
        TX bytes:2558 acl:0 sco:0 commands:92 errors:0
    ```

7. To test your connection to a device, reset one. Replace the `YOUR_DEVICE_ID` placeholder with the ID of your device.

    ```bash
    hciconfig YOUR_DEVICE_ID reset
    ```

    For example:

    ```bash
    hciconfig hci0 reset
    ```

The Bluetooth device should reset.

## Next steps

If you haven't already set up a sensor server, [do it now](../how-to-guides/set-up-ipv6-ble-host-example.md).

If you've already set up a sensor server, then you have a complete Bluetooth star network, and you're ready to try one of our sample applications:

* [Request data from the sensor server](../how-to-guides/run-an-environment-sensor-and-client.md)
* [Attach sensor data to the Tangle](../how-to-guides/run-an-environment-to-tangle-app.md)


