# Update the Ict

**The Ict is in a beta development stage, so it's likely to change, meaning that you'll need to update it.**

When a new version of the Ict is released on GitHub, we recommend that you update your local Ict to the new version.

1. Stop the Ict

    ```bash
    sudo systemctl stop ict
    ```

2. Install any updates to the installation script

    ```bash
    cd ict-install
    git pull
    ```

3. Run the installation script

    ```bash
    sudo bash install-ict.sh RELEASE
    ```