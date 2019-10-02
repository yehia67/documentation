# Install the ARM gcc toolchain
**In this guide, we are going to install the ARM gcc toolchain**

1. [Download the ARM toolchain](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads)

2. Remove the old ARM toolchain

    ```bash
    sudo apt remove binutils-arm-none-eabi gcc-arm-none-eabi libnewlib-arm-none-eabi
    ```

3. Unpack the ARM toolchain

    NAME_AND_VERSION_OF_TOOLCHAIN => In my case `gcc-arm-none-eabi-7-2019-q3-update-linux`
    This might be different for you, if you got a newer version.
    
    ```bash
    tar -xjvf NAME_AND_VERSION_OF_TOOLCHAIN.tar.bz2
    ```
    
4. Move toolchain to `/opt/`

    Replace the variable
    
    GCC_ARM_DIRECTORY_NAME => In my case `gcc-arm-none-eabi-8-2019-q3-update`
    
    ```bash
    sudo mv GCC_ARM_DIRECTORY_NAME/ /opt/
    ```

5. Add ARM Toolchain bin directory to your path
    
    Edit the .bashrc file in your home directory with your favourite editor. e.g. vim.
    
    ```bash
    vim .bashrc
    ```
    
    Add this to the end of the file
    ```bash
    export PATH=$PATH:~/.local/bin/:/opt/GCC_ARM_DIRECTORY_NAME/bin
    ```
