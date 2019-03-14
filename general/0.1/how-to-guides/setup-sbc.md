# Set up a single-board computer

**A single board computer (SBC) is a small computer in which a single circuit board includes memory, input/output ports, a microprocessor and any other necessary features. SBCs are lighter, more compact, more reliable and much more power efficient then multi-board computers such as desktops. You can set up an SBC for a purpose-built embedded application that uses IOTA technology.**

## Prerequisites

To complete this guide, you need the following:

- A Linux-based operating system (OS) with SSH enabled and a configured network. In this guide, we use Ubuntu, however other Linux distributions as well as MacOS should work.

    :::info:Windows users
    You can use [a virtual machine (VM)](../how-to-guides/set-up-virtual-machine.md) or the [Linux Subsystem.](https://docs.microsoft.com/en-us/windows/wsl/install-win10). With the subsystem, you can run Linux without the overhead of a VM. If you are an advanced user, you can also replace the Linux tools with the Windows equivalents.
    :::

- If possible, you should use a display and a keyboard to set up your device.

- If your SBC doesn't have an Ethernet port, use a USB-to-UART adapter. The [CP2102](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers) 
is a well-known and inexpensive adapter, but your SBC might have an integrated one. To find out, look at the documentation for your SBC.

---

## Prepare your SD card

In single-board computers, the operating system must be flashed onto an SD card.

1. [Flash an operating system on your SD card](https://www.raspberrypi.org/documentation/installation/installing-images/)

:::info:
This process is similar for many SBCs such as the Orange Pi. 
If you have a separate guide for your SBC, you should follow that. Otherwise, use [Armbian](https://www.armbian.com/download/) because it supports many development boards.
:::

2. Insert your SD card and turn on your SBC

## Connect to your SBC

To connect to your SBC and run commands on it, you can do one of the following:

* Connect to the SBC through SSH
* If you're using a USB-UART adapter, connect to the SBC through that interface

### Connect to the SBC through SSH

To remotely connect to your SBC from a host system through SSH, you need the IP address of your SBC.

:::info:
Although, IPv6 is the preferred IP version, if you consider yourself a beginner, you should use IPv4.
:::

1. Plug in the keyboard and the display
				
2. Log into your SBC with the default username and password 

    :::info:
    If you don't know the default username or password, search the website of your Linux distribution.
    :::
		
3. Get the SBC's IP address

    If you're connected to the Internet through Ethernet, do the following:

    ```bash
    ifconfig
    ```

    If you want to connect to the Internet through Wi-Fi, do the following and replace `<mySSID>` with the name of your network and replace `<myPassword>` with your WiFi password:

    ```bash
    nmcli dev wifi connect <mySSID> password <myPassword>
    ```

    Do the following to check if your SBC is connected through WiFi:

    ```bash
    ping iota.org
    ```

    The `ifconfig` command returns all network interfaces and their given IP addresses.
    The interfaces starting with `eth` are Ethernet network interfaces, and the ones starting with `wl` are the Wi-Fi network interfaces.

4. Find the IP addresses in your local network

    The subnet bytes to be set to zero and the netmask must be set in nmap.

    For example:
    Internal IP address: 10.197.0.57
    Netmask: 255.255.255.0

    The netmask is 24, because every place in the IP address takes 8 bits (256 states) and the netmask is set on 3 bytes. 3x8=24.

    ```bash
    nmap -sn 10.197.0.0/24
    ```

    Another example:
    Internal IP address: 10.197.3.57
    Netmask: 255.255.0.0

    So, now it is just 2x8=16. So, you need to use 16 instead of 24.

    ```bash
    nmap -sn 10.197.0.0/16
    ```

    Depending on the subnet, this process can take some time because the `nmap` command scans all IP addresses in the network. For a small subnet (`netmask=24`), this process takes only seconds. In a large network (`netmask=16`), this process takes longer because the `nmap` command scans 256*256 addresses. Therefore, if you're in a large local network, you should consider using another variant.

5. Connect to your SBC through SSH

    ```bash
    ssh USERNAME@IP_ADRESS
    ```

    :::info:IPv6
    If you use IPv6, you must add the `-6` command line argument to the SSH program. 
    You must also add the network interface name. Without the name the client cannot find the SBC.

    For example:
    Host-system Wi-Fi interface name: wlp3s0
    The SBCs' local IPv6 address: fe80::c0a2:76c6:4ed5:a44

    In this example, the host system and the SBC are both connected to the router through Wi-Fi. 
    You must use the interface which is connected to the correct router.

    As a result, this is the command to execute for the example:

    ```bash
    ssh -6 USERNAME@fe80::c0a2:76c6:4ed5:a442%wlp3s0
    ```

    If you found more than one IP address, you should check every IP address until you find the correct one.
    If you can log in with the your username and password, this IP address is probably your SBC.
    If you want to make sure that this IP address is your SBC, just check it with the `cat /proc/cpuinfo` command.

    :::

:::success:Congratulations
:tada: You're remotely connected to your SBC. Now you can run commands on the SBC through SSH from another computer.
::: 
	
### Connect to the SBC through a USB-UART adapter

If your SBC doesn't have an Ethernet port, you can connect to it from a host system through a USB-UART adapter.

1. Install PlatformIO

    You need additional software to connect to the serial port. 
    We recommend [PlatformIO](https://docs.platformio.org/en/latest/userguide/cmd_device.html?highlight=monitor#platformio-device-monitor).
    PlatformIO provides a simple command tool to interact with your SBC.

2. Plug in your USB-UART adapter

3. Find the correct USB port

    USB ports are available in the `/dev/ttyUSBX` directory. `X` stands for the result of the following calculation: 0 - AMOUNT_OF_PORTS.

    The simplest way to find the correct USB port is to unplug the USB-Adapter, check for the USB SBCs with the 
    `ls /dev/ttyUSB*` command, plug in the USB-Adapter and check again. The newly added USB port is the one you're looking for.

4. Change the rights on the connected USB

    Some adapters have an unexpected behavior with their access rights. Just in case, change it with the following command:

    ```bash
    sudo chmod 777 /dev/ttyUSBX
    ```

5. Connect to your USB port

    To find the baud rate for your SBC, search its documentation. For example, for the Orange Pi Zero, the baud rate is 115200.

    ```bash
    platformio SBC monitor -b BAUD_RATE -p /dev/ttyUSBX
    ```

6. Turn on or restart your SBC 

7. Log into your SBC

    When the system asks for it, log in with the default username and password.
    You should change the root password and create a new user.
    Most systems require you to do so after the first login.

:::success:Congratulations
:tada: You're connected to your SBC through your USB-UART adapter. Now you can run commands on the SBC through this adapter.
:::

