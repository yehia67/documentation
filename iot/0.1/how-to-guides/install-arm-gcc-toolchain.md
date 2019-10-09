# Install the ARM GCC toolchain

**The ARM toolchain allows you to compile code into binary that your microcontroller can run.**

1. [Download the latest ARM toolchain](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads)

2. Remove the old ARM toolchain

    ```bash
    sudo apt remove binutils-arm-none-eabi gcc-arm-none-eabi libnewlib-arm-none-eabi
    ```

3. Untar the new ARM toolchain. Replace the `NAME_AND_VERSION_OF_TOOLCHAIN` placeholder with the name of the toolchain file you downloaded
    
    ```bash
    tar -xjvf NAME_AND_VERSION_OF_TOOLCHAIN.tar.bz2
    ```
    
4. Move the toolchain to the `/opt/` directory. Replace the `GCC_ARM_DIRECTORY_NAME` placeholder with the directory where you untarred the toolchain
    
    ```bash
    sudo mv GCC_ARM_DIRECTORY_NAME/ /opt/
    ```

5. Open the `.bashrc` file in your `$HOME` directory
    
    ```bash
    sudo nano .bashrc
    ```

6. At the bottom of the file, add the path to the ARM toolchain's `bin` directory

    ```bash
    export PATH=$PATH:~/.local/bin/:/opt/GCC_ARM_DIRECTORY_NAME/bin
    ```
