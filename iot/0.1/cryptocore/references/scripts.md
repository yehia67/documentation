# Utility scripts

**To make it easier to use the CryptoCore with a Raspberry Pi, we have the following scripts that take care of some common tasks.**

:::info:
All scripts are in the `raspberry_scripts` directory in the [`iccfgpa_utils` repository](https://gitlab.com/iccfpga-rv/iccfpga-utils).
:::

---------------
#### **download_bin.sh** ####
[download_bin.sh](https://gitlab.com/iccfpga-rv/iccfpga-utils/blob/master/raspberry_scripts/download_bin.sh)

Downloads the latest CryptoCore program files for the RISC-V soft CPU into the `bin` directory.
---
#### **upload_core.sh** ####
[upload_core.sh](https://gitlab.com/iccfpga-rv/iccfpga-utils/blob/master/raspberry_scripts/upload_core.sh)

Uploads the CryptoCore program into RAM. 
---
#### **flash_core.sh** ####
[flash_core.sh](https://gitlab.com/iccfpga-rv/iccfpga-utils/blob/master/raspberry_scripts/flash_core.sh)

Flashes the CryptoCore program into the SPI flash.
---
#### **flash_erase.sh** ####
[flash_erase.sh](https://gitlab.com/iccfpga-rv/iccfpga-utils/blob/master/raspberry_scripts/flash_erase.sh)

Deletes any programs in the SPI flash.
---
#### **start_xvc_server.sh** ####
[start_xvc_server.sh](https://gitlab.com/iccfpga-rv/iccfpga-utils/blob/master/raspberry_scripts/start_xvc_server.sh)

Starts a Virtual Cable Server (VCS), which is a software replacement for a Xilinx JTAG programmer.
For more information on what you can do with the VCS, see the [CryptoCore manual](https://gitlab.com/iccfpga-rv/iccfpga-manual/blob/master/iccfpga.pdf).
---
#### **upload_riscv.sh** ####
[upload_riscv.sh](https://gitlab.com/iccfpga-rv/iccfpga-utils/blob/master/raspberry_scripts/upload_riscv.sh)

Uploads RISC-V firmware to the soft CPU. Although the CryptoCore program comes with the latest firmware, you may want to use this script to upload custom firmware.
---
#### **start_debugger.sh** ####
[start_debugger.sh](https://gitlab.com/iccfpga-rv/iccfpga-utils/blob/master/raspberry_scripts/start_debugger.sh)

Starts the OpenOCD debugger for the RISC-V soft CPU. See the [CryptoCore manual](https://gitlab.com/iccfpga-rv/iccfpga-manual/blob/master/iccfpga.pdf) for information on debugging the RISC-V firmware with a Raspberry Pi.
---
#### **start_serial.sh** ####
[start_serial.sh](https://gitlab.com/iccfpga-rv/iccfpga-utils/blob/master/raspberry_scripts/start_serial.sh)

Starts the `picocom` serial terminal. If jumpered correctly on the dev-board \ref{devboard}, the serial terminal can be used to both send data to the CryptoCore and receive data from it through the `/dev/ttyS0` serial device.
---------------