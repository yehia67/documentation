# Troubleshooting

**You may find some of these common issues while following these guides.**

## Set up a IPv6 over Bluetooth Low Energy border router

### None already mounted or mount point busy.

If you see this response, ignore it. The file system is probably already mounted.

```bash
mount: /sys/kernel/debug: none already mounted or mount point busy.
```

## Set up an nRF52 microcontroller

### Permission denied

If you see a `permission denied` error while trying to flash your microcontroller, and you're using a DAPLink programmer, create a udev rule by doing the following:

1. Clone the pyOCD repository

  ```bash
  git clone https://github.com/mbedmicro/pyOCD.git
  ```

2. Change into the `pyOCD/udev` directory

  ```bash
  cd pyOCD/udev
  ```

3. [Follow the pyOCD instructions](https://github.com/mbedmicro/pyOCD/tree/master/udev) for creating a udev rule

### arm-none-eabi-gcc version not supported

If you see the `arm-none-eabi-gcc version not supported` message, install the latest version of the toolchain by doing the following:

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

Now, you should have a supported version of the toolchain

### Recipe for target 'flash' failed

When you use a J-Link OB clone for the first time, you may see the following message:

```bash
recipe for target 'flash' failed
make: *** [flash] Error 1
```

This error is caused because the first time you use a J-Link OB clone, it upgrades itself and fails to flash. 

Try and flash a second time and it should succeed.
