# Set up a single-board computer

**A single board computer (SBC) is a small computer in which a single circuit board includes memory, input/output ports, a microprocessor and any other necessary features. SBCs are lighter, more compact, more reliable and much more power efficient then multi-board computers such as desktops. You can set up an SBC for a purpose-built embedded application that uses IOTA technology.**

## Prerequisites

To complete this guide, you need the following:

- A Linux-based operating system (OS) with installed SSH client and a configured network. 
In this guide, we use Ubuntu, however other Linux distributions as well as MacOS should work.

    :::info:Windows users
    You can use [a virtual machine (VM)](../how-to-guides/set-up-virtual-machine.md) 
    or the [Linux Subsystem.](https://docs.microsoft.com/en-us/windows/wsl/install-win10). 
    With the subsystem, you can run Linux without the overhead of a VM. 
    If you are an advanced user, you can also replace the Linux tools with the Windows equivalents.
    :::

- An SBC. Our recommendation: Rasperry Pi Zero W

- If possible, you should use a display and a keyboard to set up your device.

- If your SBC doesn't have an Ethernet port, use a USB-to-UART adapter. The [CP2102](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers) is a well-known and inexpensive adapter, but your SBC might have an integrated one. To find out, look at the documentation for your SBC.

## Prepare your SD card

:::info:
This process is similar for many SBCs such as the Orange Pi. 
If you have a separate guide for your SBC, you should follow that. Otherwise, use [Armbian](https://www.armbian.com/download/) because it supports many development boards.
:::

In single-board computers, the operating system must be flashed onto an SD card.

1. [Flash an operating system on your SD card](https://www.raspberrypi.org/documentation/installation/installing-images/)

2. Insert your SD card and turn on your SBC

## Continue with the setup for your specific device

- If you can use a display and keyboard at your device, follow the ["Set up devices with keyboard and display"](#set-up-devices-with-keyboard-and-display) guide
- If you do not have display and keyboard, but an USB-to-UART-Adapter, follow the ["Set up your device through a USB-to-UART adapter"](#set-up-your-device-through-a-usb-to-uart-adapter) guide
- If you only have Ethernet, follow the ["Set up Ethernet devices"](#set-up-ethernet-devices) guide

## Set up devices with keyboard and display

1. Connect keyboard and display to your SBC

2. Log in with the default user and password

    :::info:
    If you don't know the default username or password, search the website of your Linux distribution.
    :::

3. Configure your network interface

    If you have Ethernet, just connect your SBC to your router. 
    If you want to use WiFi or your device only has WiFi, you need to connect to your router through WiFi.
    Do the following and replace `MY_SSID` with the name of your network and `MY_PASSWORD` with the password
    of your network:
    
    ```bash
    nmcli dev wifi connect MY_SSID password MY_PASSWORD
    ```
    
4. Check if your SBC is connected to the Internet
    
    ```bash
    ping iota.org
    ```

5. Get your IP address

    Execute the `ifconfig` command. The program returns all network interfaces and the given IP addresses.
    The interfaces starting with `eth` are Ethernet network interfaces, 
    and the ones starting with `wl` are the WiFi network interfaces.

6. Connect to your device through SSH

    :::info:IPv6
    If you use IPv6, you must add the `-6` command line argument to the SSH program. 
    You must also add the network interface name. Without the name the client cannot find the SBC.
    
    For example:
    Host-system WiFi interface name: wlp3s0
    The SBCs' local IPv6 address: fe80::c0a2:76c6:4ed5:a44
    
    In this example, the host system and the SBC are both connected to the router through WiFi. 
    You must use the interface which is connected to the correct router.
    
    As a result, this is the command to execute for the example:
    
    ```bash
    ssh -6 USERNAME@fe80::c0a2:76c6:4ed5:a442%wlp3s0
    ``` 
    :::
    
    If you found your IP address, you should connect to your SBC through SSH. 
    Use the following command on your host-system:
    ```bash
    ssh USERNAME@IP_ADRESS
    ```

:::success:Congratulations! :tada:
You're connected to your SBC through SSH. Now you can run commands on your SBC.
:::


## Set up your device through a USB-to-UART adapter

You must execute these commands on your host-system.

1. Install PlatformIO

    You need additional software to connect to the serial port. 
    We recommend [PlatformIO](https://docs.platformio.org/en/latest/userguide/cmd_device.html?highlight=monitor#platformio-device-monitor).
    PlatformIO provides a simple command tool to interact with your SBC.

2. Plug in your USB-to-UART adapter

3. Find the right USB port

    USB ports are available at /dev/ttyUSBX. X is the number of the USB port.
    The simplest way to find the right USB port is to plug out the USB-Adapter, check for the USB SBCs with
    ```ls /dev/ttyUSB*```, plug in the USB-Adapter and check again. The new added USB-port is the one you are looking for.

4. Some adapters have an unexpected behavior with their access permissions. Just in case, change the permissions

    ```
    sudo chmod 777 /dev/ttyUSBX
    ```

5. Connect to your USB port

    Take a look at the documentation for your SBC to find its baud rate. In case of the Orange Pi Zero it is 115200.
    ```bash
    platformio SBC monitor -b BAUD_RATE -p /dev/ttyUSBX
    ```

6. Restart your SBC

7. Log in to your SBC

    :::info:
    If you don't know the default username or password, search the website of your Linux distribution.
    :::
    
    When the system asks for it, log in with the default username and password.
    You should change the root password and create a new user.
    Most systems require this change after the first login.

8. If available and needed, connect your device to your router through Ethernet

9. If available and needed, configure the WiFi network interface 

    If you want to connect to the Internet through WiFi, 
    do the following and replace `MY_SSID` with the name of your network and replace `MY_PASSWORD` 
    with your WiFi password:
    
    ```bash
    nmcli dev wifi connect MY_SSID password MY_PASSWORD
    ```
    
    Check if your SBC is connected to the Internet
    ```bash
    ping iota.org
    ```

10. Get your IP address

    You can now find your IP address with the  `ifconfig` command. 
    The interfaces starting with `eth` are Ethernet network interfaces, 
    and the ones starting with `wl` are the WiFi network interfaces.

11. Connect to your SBC through SSH

    If you found your IP address, you should connect to your SBC through SSH. 
    Use the following command on your host-system:
    ```bash
    ssh USERNAME@IP_ADRESS
    ```

:::success:Congratulations! :tada:
You're connected to your SBC through SSH. Now you can run commands on your SBC.
:::

## Set up Ethernet devices

:::warning:
This task is only for IPv4 networks.
:::

You must execute these commands on your host-system.

1. Find IP addresses in your local network

    The subnet bytes to be set to zero and the netmask must be set in nmap.
    So, in my case:
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
    
    Depending on the subnet, this process can take some time, since nmap needs to scan all IP addresses within the network. 
    For a small subnet (netmask=24) is just takes some seconds, since nmap just need to scan 256 addresses.
    In a bigger network that can take more time. For example netmask=16: nmap needs to scan 256*256 addresses. 
    In my test-case this took 2944.17 seconds. If you are in a huge local network, you should consider using another variant.

2. Connect to the IP addresses

    If you found more than one IP address, just try every IP address until you found your address.
    Use the following command on your host-system:
    ```bash
    ssh USERNAME@IP_ADRESS
    ```

:::success:Congratulations! :tada:
You're connected to your SBC through SSH. Now you can run commands on your SBC.
:::
