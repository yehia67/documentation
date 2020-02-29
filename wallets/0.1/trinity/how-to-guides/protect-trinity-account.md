# Protect your Trinity account

**Between 17 December 2019 and 17 February 2020, some users’ Trinity seeds and passwords were compromised during an attack on the wallet. In this guide, you learn what you can do to secure your IOTA tokens.**

To stop attackers from further transferring IOTA tokens, the IOTA Foundation paused the Coordinator and [released an updated version of Trinity](#install-the-latest-version-of-trinity). This version is no longer vulnerable to the attack.

While the [Coordinator](root://getting-started/0.1/network/the-coordinator.md) is paused, no one can transfer their IOTA tokens on the Mainnet.

To help you to secure your IOTA tokens before the Coordinator is restarted, the IOTA Foundation built the Seed Migration Tool. This tool takes your existing Trinity seed and migrates all your IOTA tokens to a secure, randomly generated one.

Depending on when and how you used the Trinity wallet, you may need to take steps to protect your Trinity account.

**Read the headings below and follow the instructions below the one that best describes you.**

## I use Trinity with a Ledger hardware wallet

Seeds never leave the [Ledger hardware wallet](https://www.ledger.com/), therefore your seed is still safe. However, your Trinity password may have been compromised.

### What to do

[Install the latest version of Trinity and update your password](#install-the-latest-version-of-trinity).

## I use Trinity Mobile

Although all evidence points towards mobile not being affected we cannot totally rule it out at this point. We recommend to use the seed migration tool anyway and change your password as a precaution.

### What to do

Although Trinity Mobile was not affected, we recommend that you [migrate your IOTA tokens to a new seed](#migrate-your-iota-tokens-to-a-new-seed).

## I have not opened Trinity Desktop since 16 December 2019

The attack affected users who opened Trinity Desktop version 1.2.0, 1.2.1, and 1.2.2 between 17 December 2019 and 17 February 2020.

If you did not open Trinity in this timeframe, your seed, username, and password are safe.

### What to do

[Install the latest version of Trinity Desktop and update your password](#install-the-latest-version-of-trinity).

Although you were not affected, we recommend that you [migrate your IOTA tokens to a new seed](#migrate-your-iota-tokens-to-a-new-seed).

## I know that my IOTA tokens were stolen during this attack

Unfortunately, the attacker managed to steal IOTA tokens from some users' Trinity accounts.

To prevent any further movement of the stolen IOTA tokens, the IOTA Foundation has notified all exchanges.

### What to do

Please join our [Discord](https://discord.iota.org/) and message an IOTA Foundation member directly.

## I’m not sure

For anyone else, you should assume that your Trinity seed and password are no longer secret. Therefore, when the Coordinator is restarted, your IOTA tokens may be at risk.

### What to do

1. [Install the latest version of Trinity and update your password](#install-the-latest-version-of-trinity)
2. [Migrate your IOTA tokens to a new seed](#migrate-your-iota-tokens-to-a-new-seed)

---

:::success:
You've downloaded the latest version of Trinity. This version no longer has the vulnerability.
:::


## Install the latest version of Trinity

In this step, you upgrade the Trinity wallet to the latest version.

1. [Download and install the latest version of Trinity](https://trinity.iota.org/) by clicking the **Download** button in the right-hand corner and selecting your operating system

    By installing this version, you overwrite any existing versions.

    ![Download Trinity](../images/download-trinity.png)

2. Open Trinity and go to **Trinity** > **Settings** > **Change password** to change your existing password

3. If you have used the same password for other services or websites, change those as well

## Migrate your IOTA tokens to a new seed

In this step, you use the Seed Migration Tool to migrate your IOTA tokens to a new seed.

:::info:
Due to technical limitations, only balances of over 1 Mi can be migrated to a new seed with this tool.
:::

1. [Download the Seed Migration Tool](http://status.iota.org/)

    Please make sure to check that the URL in the address bar is http://status.iota.org/

2. If you are using Linux, you need to [make the downloaded file executable](https://medium.com/@peey/how-to-make-a-file-executable-in-linux-99f2070306b5).

3. Open the Seed Migration Tool, and either import your existing SeedVault file or enter your seed manually

    :::info:
    To find your existing seed in Trinity, go to **Account** > **Account management** >  **View seed**. Here, you can export your seed to a SeedVault file or see it in plain text.
    :::

    ![Seed Migration home page](../images/seed-migration-home.png)

4. Make sure your displayed balance is correct

    The displayed balance is the balance the tool could find on your seed’s addresses.

    :::info:
    This is the total amount of IOTA tokens which will be migrated to your new seed.
    :::

5. If you think your balance is wrong, or you know that you have IOTA tokens on more addresses, click **Scan more addresses**

    The tool will check the balance of 50 more addresses each time you click this button.

    ![Seed migration balance](../images/seed-migration-balance.png)

6. Follow the prompts to generate a seed and save it to a SeedVault file

    :::info:
    The tool randomly generates a new seed for you. If you want to choose your own seed or use a Ledger hardware wallet, make sure to use the tool first, and then [create a new seed in Trinity](../how-to-guides/create-an-account.md) after the Coordinator is restarted.
    :::

7. Save your migration log file

    This file contains details about the transactions that migrate the IOTA tokens to your new seed. You can use this file to check the status of your migration. Keep this log safe!

    ![Migration log file](../images/seed-migration-log.png)

8. Click **Begin Migration** to migrate all your IOTA tokens to the first address of your new seed

    The migration may take a minute. If you close the window before the migration is finished, you may need to go through the [Identity Verification Process](../references/faq.md#what-is-the-idenitity-verification-process).

    :::info:
    When your migration is finished, it will be sent to the IOTA Foundation’s server, where it will be given priority for confirmation when the Coordinator is restarted.
    :::

    Your migration can have one of the following migration statuses:

    **Secured:** The Coordinator has confirmed your migration. You are free to send value transactions, using your new seed.

    **Submitted:** Your migration is waiting to be processed. Check back after the migration period because further action may be required.

    **ID Required:** Someone else tried to use the Seed Migration Tool with your seed. Please see the [Identity Verification Process](../references/faq.md#what-is-the-idenitity-verification-process) for more information. You will need your migration log file.

    Make sure you check the status page after the migration period because further action may be required.

9. Open Trinity and [create a new account](../how-to-guides/create-an-account.md), using your new SeedVault file

    :::info:
    Until the Coordinator is restarted, your new seed’s balance will be 0. After the Coordinator is restarted, your transfers will be confirmed and you will see your correct balance.
    :::

10. To see your new seed, go to **Account** > **Account management** >  **View seed**, and enter the password you created in step 5

    ![View seed](../images/view-seed.png)

You can repeat this process for any other seeds that you own.

:::danger:
Do not repeat this process for the same seed again. Otherwise, you may need to go through the [Identity Verification Process](../references/faq.md#what-is-the-idenitity-verification-process).
:::

:::success:
You've migrated your IOTA tokens to a new seed.

Now, you just need to wait until the Coordinator is restarted for your transactions to be confirmed.
:::

## Next steps

If you have any questions, check the [FAQ](../references/faq.md) or reach out to the IOTA community in the #help channel on [Discord](https://discord.iota.org/).

If you want to use a Ledger hardware wallet, see [the guide on the official Trinity website](https://trinity.iota.org/hardware/).
