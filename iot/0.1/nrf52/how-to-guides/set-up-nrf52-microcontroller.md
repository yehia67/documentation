# Set up an nRF52-series microcontroller

**Before you can start using your microcontroller, you need to set it up with the correct hardware and software requirements.**

## Hardware

To complete this guide you need the following hardware:

- An nRF52-series microcontroller
- A Linux-based PC
- A J-Link, J-Link on-board clone, or DAPLink [programmer](https://www.engineersgarage.com/how-to-guides/microcontroller-programmer-burner) 
- A USB-to-UART connector

:::info:
Some development boards have an integrated programmer and/or an integrated USB-to-UART connector. If you have one of these boards, you don't need an additional programmer and/or USB-to-UART connector.

To find out if your board has an integrated programmer and/or USB-to-UART connector, see its datasheet.
:::

## Step 1. Set up the hardware for your microcontroller
    
1. If the pins on your microcontroller aren't soldered onto the board, solder them.
    
    :::info:
    Pimoroni has a [useful soldering guide](https://learn.pimoroni.com/tutorial/sandyj/the-ultimate-guide-to-soldering).
    :::
    
2. If your microcontroller doesn't have an integrated programmer, [connect your external one to it](../how-to-guides/connect-programmer.md)

3. If your microcontroller doesn't have an integrated USB-to-UART connector, [connect your external one to it](../how-to-guides/connect-to-serial-interface.md)

## Step 2. Set up the software on your PC

To program and flash a microcontroller, you need a Linux-based PC that has the necessary tools (known as a toolchain).

1. Install Git

2. [Install the ARM toolchain](../how-to-guides/install-arm-gcc-toolchain.md), which allows you to compile code into binary that your microcontroller can run

3. [Install OpenOCD](https://github.com/RIOT-OS/RIOT/wiki/OpenOCD), which includes scripts to make it easy to flash the binary onto your microcontroller

4. Install Python 3 and the `pip` installer

    ```bash
    sudo apt-get install -y python3-all
    sudo apt-get install -y python-pip3
    ```

5. If your Linux distribution has Python 2 pre-installed, make sure that it uses Python 3 by default

    ```bash
    echo "alias python=python3" >> ~/.bashrc
    ```

6. Install one of these programmer toolchains, depending on the programmer that you're using
 
   **Option 1:** [Install the J-Link or J-Link OB toolchain](https://gnu-mcu-eclipse.github.io/debug/jlink/install/)
    
   **Option 2:** [Install the DAPLink toolchain](https://github.com/mbedmicro/pyOCD#installing). Make sure that you install this toolchain using the `pip3` command.

7. Clone our forked RIOT OS repository and change into the `BLE-environment-sensor/examples/hello-world` directory

    ```bash
    git clone https://github.com/iota-community/BLE-environment-sensor.git
    cd BLE-environment-sensor/examples/hello-world
    ```

    :::info:
    RIOT OS is a modular [microkernel operating system](https://wiki.osdev.org/Microkernel).
    The modularity helps keep the operating system as small as possible by allowing you to compile only the modules that are essential for your application. This feature is beneficial for microcontrollers because they often have a small amount of available memory space.
    :::

8. Find the path to your USB-to-UART connector by removing it, executing the `ls /dev/ttyUSB*` command, plugging the USB-to-UART connector back into your PC, then executing the `ls /dev/ttyUSB*` command again. The new entry is your connector.

9. Change the permissions for your USB-to-UART connector. Replace the `$USB_PORT` placeholder with the path to your USB-to-UART connector such as `/dev/ttyUSB0`.

    ```bash
    sudo chmod 777 $USB_PORT
    ```

10. Flash the 'hello world' example onto your microcontroller. Replace the `$BOARD` AND `$USB_PORT` placeholders with the name of your board and the path to your USB-to-UART connector such as `/dev/ttyUSB0`

    :::info:
    To [find the name of your board](https://api.riot-os.org/group__boards.html), see the RIOT documentation.
    :::

    ```bash
    BOARD=BOARD PORT=/dev/ttyUSB0 make flash term
    ```

    You should see something like the following in the shell:

    ```
    2019-08-27 09:17:09,359 - INFO # main(): This is RIOT! (Version: 2019.10-devel-488-g1b1c9)
    2019-08-27 09:17:09,359 - INFO # Hello World!
    2019-08-27 09:17:09,361 - INFO # You are running RIOT on a(n) nrf52832-mdk board.
    ```

:::success: Congratulations :tada:
Now that you can compile code and flash it onto your microcontroller, you're ready to build some real applications.
:::

## Troubleshooting

These are known issues that you may find while following this guide and some suggested steps to resolve them.

### Permission denied

If you're using a DAPLink programmer, create a udev rule by doing the following:

1. Clone the pyOCD repository

  ```bash
  git clone https://github.com/mbedmicro/pyOCD.git
  ```

2. Change into the `pyOCD/udev` directory

  ```bash
  cd pyOCD/udev
  ```

3. [Follow the pyOCD instructions](https://github.com/mbedmicro/pyOCD/tree/master/udev) for creating a udev rule

Now, try and flash your microcontroller again.

### arm-none-eabi-gcc version not supported

Install the latest version of the toolchain by doing the following:

1. Uninstall the old toolchain packages

  ```bash
  sudo apt remove binutils-arm-none-eabi gcc-arm-none-eabi libnewlib-arm-none-eabi
  ```

2. [Download the latest toolchain from developer.arm.com](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads)

3. Untar the toolchain in your `home` directory. Replace the `$FILENAME` placeholder with the name of the file that you downloaded

  ```bash
  tar -xjvf $FILENAME
  ```

4. Add the toolchain to your path. Replace the `$PATHTOFILE` placeholder with the path to your untarred toolchain

  ```bash
  echo "export PATH=$PATH:/home/$PATHTOFILE/bin/" >> ~/.bashrc
  ```

5. Close the terminal window, and open a new one

Now, you have a supported version of the toolchain

### Recipe for target 'flash' failed

When you use a J-Link OB clone for the first time, you may see the following message:

```bash
recipe for target 'flash' failed
make: *** [flash] Error 1
```

This error is caused because the first time you use a J-Link OB clone, it upgrades itself and fails to flash. 

Try and flash a second time and it should succeed.

### No connected debug probes

If you're using an external programmer, make sure that it is connected.

## Next steps

Follow one of the our microcontroller guides:

- [Read data from a sensor on your microcontroller](../how-to-guides/read-sensor-data.md)
- [Run an environment sensor server and client](../how-to-guides/run-an-environment-sensor-and-client.md)
- [Attach sensor data to the Tangle](../projects/run-an-environment-to-tangle-app.md)



  


    
    