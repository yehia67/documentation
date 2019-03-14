# Set up a single-board computer

**A single board computer (SBC) is a small computer in which a single circuit board includes memory, input/output ports, a microprocessor and any other necessary features. SBCs are lighter, more compact, more reliable and much more power efficient then multi-board computers such as desktops. You can set up an SBC for s purpose-built embedded application that uses IOTA technology.**

## Prerequisites

To complete this guide, you need the following:

- A Linux-based operating system (OS) with SSH enabled and a configured network. In this guide, we use Ubuntu, however other Linux distributions as well as MacOS should work.

:::info:Windows users
You can use [a virtual machine (VM)](../how-to-guides/set-up-virtual-machine.md) or the [Linux Subsystem.](https://docs.microsoft.com/en-us/windows/wsl/install-win10). With the subsystem, you can run Linux without the overhead of a VM. If you are an advanced user, you can also replace the Linux tools with the Windows equivalents.
:::

- If possible, you should use a display and a keyboard to set up your device.

- If your device has an Ethernet port and you have access to your router, connect your SBC to it.

- For worst case scenarios, use a USB-to-UART adapter. (Wi-Fi only SBC). The [CP2102](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers) 
is a well-known and inexpensive adapter, but your SBC might have an integrated one. To find out, look at the documentation for your SBC.

## 1. Install/Flash an Operation System to a SD-Card.

:::info:
This process is similar for other SBCs such as the Orange Pi. 
If you have a separate guide for your SBC, you should follow that. Otherwise, use [Armbian](https://www.armbian.com/download/) because it supports many development boards.
:::

Follow [this guide](https://www.raspberrypi.org/documentation/installation/installing-images/) 
to flash an OS to your SD Card.

## 2. Plugin your SD card and start your SBC.

## 3. Setup your network for your SBC & get the IP address

:::info:
Although, IPv6 is the preferred IP version, if you consider yourself a beginner, you should use IPv4.
:::

### 3.1 Use keyboard & display to find the SBCs IP address
				
#### 3.1.1. Connect keyboard & display to your SBC. Login with the default user & password. 

:::info:
If you don't know the username or password, search the website of your Linux distribution.
:::
		
#### 3.1.2. Get the IP address (Skip if your SBC does not have Ethernet or if it is not connected)

Execute the `ifconfig` command. The program returns all network interfaces and their given IP addresses.
The interfaces starting with `eth` are Ethernet network interfaces, and the ones starting with `wl` are the Wi-Fi network interfaces.

#### 3.1.4. Setup Wi-Fi

If you want to connect to the Internet through Wi-Fi, continue to [step 3.4](#3.4.-optional:-configure-the-wi-fi-network-interface).

After configuring the Wi-Fi network interface, you can use the `ifconfig` command to get your IP address.

### 3.2 Find your SBCs IP address via network-scans (IPv4 only, Ethernet connected)

You must execute the following commands on your host system.

#### 3.2.1 Find IP addresses in your local network

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

#### 3.2.2. Continue with 3.5. (Even if you found more than one IP address)

### 3.3. Setup of an USB-to-UART adapter (No Ethernet, No HDMI/VGA)

You must execute the following commands on your host system.

#### 3.3.1. Install PlatformIO

You need additional software to connect to the serial port. 
We recommend [PlatformIO](https://docs.platformio.org/en/latest/userguide/cmd_device.html?highlight=monitor#platformio-device-monitor).
PlatformIO provides a simple command tool to interact with your SBC.

#### 3.3.2. Plugin your USB-to-UART adapter

#### 3.3.3. Find the right USB port

USB ports are available in the `/dev/ttyUSBX` directory. `X` stands for the result of the following calculation: 0 - AMOUNT_OF_PORTS.

The simplest way to find the correct USB port is to unplug the USB-Adapter, check for the USB SBCs with the 
`ls /dev/ttyUSB*` command, plug in the USB-Adapter and check again. The newly added USB port is the one you're looking for.

#### 3.3.4. Change rights on connected USB SBC. 

Some adapters have an unexpected behavior with their access rights. Just in case, change it with the following command:

```bash
sudo chmod 777 /dev/ttyUSBX
```

#### 3.3.5. Connect to your USB port

To find the baud rate for your SBC, search its documentation. For example, for the Orange Pi Zero, the baud rate is 115200.

```bash
platformio SBC monitor -b BAUD_RATE -p /dev/ttyUSBX
```

#### 3.3.6. Power up your SBC or restart your SBC 

#### 3.3.7 Login to your SBC

When the system asks for it: Login with the default username & password.
You should change the roots password. You should also create a new user.
Most systems require this after the first login. If your OS does this: Just follow the process.

### 3.4. Optional: Configure the Wi-Fi network interface

```bash
nmcli dev wifi connect <mySSID> password <myPassword>
```

Check if your SBC is connected to the Internet
```bash
ping iota.org
```

You can now get your IP address with  ```ifconfig```.

### 3.5. Connect via SSH to your SBC

At this point, you don't need to interact with the SBC. Instead, use your host system.

##### IPv4

If you found your IP address, you should connect to your SBC through SSH.

Use the following command on your host system:

```bash
ssh USERNAME@IP_ADRESS
```

##### IPv6

If you use IPv6, you must add the command line argument -6 to the ssh program. 
You must also add the network interface name.
Without the name the client cannot find the SBC.

For example:
Host-system Wi-Fi interface name: wlp3s0
The SBCs' local IPv6 address: fe80::c0a2:76c6:4ed5:a44

In this example, the host system and the SBC are both connected to the router through Wi-Fi. 
You must use the interface which is connected to the correct router.

As a result, this is the command to execute for the example:

```bash
ssh -6 USERNAME@fe80::c0a2:76c6:4ed5:a442%wlp3s0
```

If you found more than one IP address, you should check every IP address until you find the right one.
If you can log in with the your username and password, this IP address is probably your SBC.
If you want to make sure that this IP address is your SBC, just check it with the `cat /proc/cpuinfo` command. 
	