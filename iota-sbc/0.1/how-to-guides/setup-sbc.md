# Setting up an SBC (Single-board computer) for IOTA

*Before you start using this guide:*

- The preferred and simplest solution is to connect your device via HDMI/VGA to a display & plugin a keyboard via USB.

- If you are able to connect your device via Ethernet to your router, you should do that.

- Worst case scenario: Use a USB-to-UART adapter. (Wi-Fi only device)

*_Note:_* The [CP2102](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers) 
is a well-known and highly available chip. Ready to use USB-to-UART adapters are available for around 1-$2.
Your device might have an integrated adapter. Take a look into the documentation of your device.


## 1. Install/Flash an Operation System to a SD-Card.

*_Note:_* This process is similar for other devices like the Orange Pi. 
If there is a special guide for your device, stick to that guide instead. 
[Armbian](https://www.armbian.com/download/) supports a variety of different development boards. 
So, you should consider to use Armbian for this guide.

Just follow [this guide](https://www.raspberrypi.org/documentation/installation/installing-images/).

## 2. Plugin your SD card and start your device.

## 3. Setup your network for your device & get the IP address

*_Note:_* IPv6 is the preferred IP version. 
(If you consider yourself as beginner, you might want to start with IPv4, since IPv6 is a bit more complicated to understand.)


### 3.1 Use keyboard & display to find the devices IP address
				
#### 3.1.1. Connect keyboard & display to your device. Login with the default user & password. 

*_Note:_* If you do not know the username & password, just take a look onto the distributions' website.
		
#### 3.1.2. Get the IP address (Skip if your device does not have Ethernet or if it is not connected)

Execute the command ```ifconfig```. This returns you all network interfaces and the given IP addresses.
The interfaces starting with eth are Ethernet network interfaces. The ones starting with wl are the Wi-Fi network interfaces.

#### 3.1.4. Setup Wi-Fi

If you want to use Wi-Fi or your device has only Wi-Fi, continue with 3.4. After the configuration of the Wi-Fi network interface you are able
to get your IP address with ```ifconfig```.


### 3.2 Find your devices IP address via network-scans (IPv4 only, Ethernet connected)

#### 3.2.1 Find IP addresses in your local network

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
For a small subnet (netmask 24) is just takes some seconds, since nmap just need to scan 256 addresses.
In a bigger network that can take more time. e.g. netmask 16: nmap needs to scan 256*256 addresses. 
In my test-case this took 2944.17 seconds. If you are in a huge local network, you should consider using another variant.

#### 3.2.2. Continue with 3.4. (Even if you found more than one IP address)

	
### 3.3. Setup of an USB-to-UART adapter (No Ethernet, No HDMI/VGA)
	
#### 3.3.1. Install PlatformIO
You need additional software to connect to the serial port. We recommend [PlatformIO](https://docs.platformio.org/en/latest/userguide/cmd_device.html?highlight=monitor#platformio-device-monitor).
PlatformIO provides a simple command tool to interact with your device.

#### 3.3.2. Plugin your USB-to-UART adapter

#### 3.3.3. Find the right USB port

USB ports are available at /dev/ttyUSBX. X stands for the number (0 - AMOUNT_OF_PORTS).
The simplest way to find the right USB port is to plug out the USB-Adapter, check for the USB devices with
```ls /dev/ttyUSB*```, plugin the USB-Adapter and check again. The new added USB-port is the one you are looking for.

#### 3.3.4. Change rights on connected USB device. 

Some adapters have an unexpected behavior with their access rights. Just in case, change it with:
```sudo chmod 777 /dev/ttyUSBX```

#### 3.3.5. Connect to your USB port

Take a look into the documentation of your device to find the baud rate. In case of the Orange Pi Zero it is 115200.
```bash
platformio device monitor -b BAUD_RATE -p /dev/ttyUSBX
```

#### 3.3.6. Power up your device or restart your device 

#### 3.3.7 Login with the default username & password

#### 3.3.8. Configure your Wi-Fi network interface

Just continue with 3.5. After the configuration of the Wi-Fi network interface, you are able to get your IP address with ```ifconfig```.

### 3.4. Optional: Configure the Wi-Fi network interface

```bash
nmcli dev wifi connect <mySSID> password <myPassword>
```

Check if your device is connected to the Internet
```bash
ping iota.org
```

### 3.5. Connect via SSH to your device

##### IPv4

If you found your IP address, you can now connect to your device via SSH. So, at this point you do not need to interact with the device anymore.
You just connect via SSH to the device. Just use the following command on your host system:
```bash
ssh USERNAME@IP_ADRESS
```

##### IPv6

If you are using IPv6, you need to use the command line argument -6 for ssh. You also need to add the network interface name.
Without it the client does not know how to reach the local IPv6 address. So, e.g. in my case:
My Wi-Fi network interface on my host machine is named wlp3s0. (My Wi-Fi is connected to same router as my device is connected to. Otherwise it would not work.)
The devices local IPv6 address is fe80::c0a2:76c6:4ed5:a44.

So, I need to execute the following command:
```bash
ssh -6 USERNAME@fe80::c0a2:76c6:4ed5:a442%wlp3s0
```

If you found more than one IP address, just check every IP address.
If you are able to login with the default username & password, this is probably your device.
(You can get some information about the device with ```cat /proc/cpuinfo```. Just take a look into the documentation what properties your device should have.)
Some variants of the setup require to change your password. If you changed your password, you have to use the new one to connect via ssh to your device.
	