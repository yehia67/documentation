# Set up a border router

**We are setting up an 6LoWPAN over Bluetooth interface on Linux. This makes it possible to use a UDP/IP (IPv6) stack on an IoT BLE devices**

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

    If you see a version number that's greater than 4.12, continue with this guide. Otherwise, skip the rest of these steps and install the 6LoWPAN dependencies.

2. Select your architecture and download the generic kernel image from the 
    [Ubuntu Linux mainline kernel builds](https://kernel.ubuntu.com/~kernel-ppa/mainline/v4.11.12/)

    :::info:
    
    :::

3. Install the kernel

    ```bash
    sudo dpkg -i linux-image*.deb
    ```

4. Restart your system while holding the SHIFT key until you see the option to select a kernel 
    
5. Select the kernel version 4.11.12

## Step 2. Install the 6LoWPAN dependencies

:::info:
You need to do these steps for every session. So, if you close your session,
for example after a reboot, you have to reinstall the dependencies.
:::

1. Install bluez

    ```bash
    sudo apt-get install -y bluez
    ```

2. Log in as root

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

7. Reset the device you want to use. Replace the `YOUR_DEVICE_ID` placeholder with the ID of your device.

    ```bash
    hciconfig YOUR_DEVICE_ID reset
    ```

    For example:

    ```bash
    hciconfig hci0 reset
    ```

    The Bluetooth device should reset.


