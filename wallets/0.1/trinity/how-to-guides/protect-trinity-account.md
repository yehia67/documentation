# Protect your Trinity account

**On 11 February 2020, the IOTA Foundation became aware of an attack on the Trinity wallet, during which some users’ seeds and Trinity passwords were compromised. In this guide, you secure your IOTA tokens by transferring them onto a secure, randomly generated seed.**

To stop attackers from further transferring IOTA tokens, the IOTA Foundation made a decision to pause the Coordinator. A full report will be published shortly.

The Coordinator will remain paused for seven days to give users a chance to secure their Trinity accounts.

Depending on when and how you used the Trinity wallet, you must complete one of the following actions to secure your Trinity account before the IOTA Foundation restarts the Coordinator:

## I use Trinity with a Ledger hardware wallet

Seeds never leave the [Ledger hardware wallet](https://www.ledger.com/), therefore your seed is still safe. However, your Trinity password may have been compromised.

### What to do

[Install the latest version of Trinity and update your password](#install-the-latest-version-of-trinity).

## I have not opened Trinity since 17 December 2019

The attack affected users who opened Trinity version 1.2.0, 1.2.1, and 1.2.2 between 17 December 2019 and 16 February 2020.

If you did not open Trinity in this timeframe, your seed, username, and password are safe.

### What to do

[Install the latest version of Trinity and update your password](#install-the-latest-version-of-trinity).

## I know that my IOTA tokens were stolen during this attack

Current information suggests that the attacker transferred IOTA tokens from a limited number of seeds. The IOTA Foundation has notified all exchanges of these transfers to prevent any further movement of the stolen IOTA tokens.

### What to do

1. [Install the latest version of Trinity and update your password](#install-the-latest-version-of-trinity)
2. [Transfer your IOTA tokens to a new seed](#transfer-your-iota-tokens-to-a-new-seed)

When you have completed these steps, you will also need to go through the [Identity Verification Process](#what-is-the-idenitity-verification-process) to reclaim any of your stolen IOTA tokens.

## I’m not sure

For anyone else, you should assume that your seed and Trinity password are no longer secret. Therefore, when the Coordinator is restarted, your IOTA tokens may be at risk.

### What to do

1. [Install the latest version of Trinity and update your password](#install-the-latest-version-of-trinity)
2. [Transfer your IOTA tokens to a new seed](#transfer-your-iota-tokens-to-a-new-seed)

## Install the latest version of Trinity

The IOTA Foundation have released an updated version of Trinity, which is no longer vulnerable to the attack. By upgrading to this new version, you will remove the vulnerability from your wallet.

1. [Download the latest version of Trinity](https://github.com/iotaledger/trinity-wallet/releases/tag/desktop-1.4.1) and install it, overwriting any existing versions

2. Open Trinity and go to **Trinity** > **Settings** > **Change password** to change your existing password

3. If you have used the same password for other services or websites, you should change those as well

## Transfer your IOTA tokens to a new seed

While the Coordinator is paused, you cannot transfer your IOTA tokens. Therefore, to help you to secure your IOTA tokens, the IOTA Foundation built the [Seed Migration tool], which takes your existing seed and transfers all of your IOTA tokens onto a secure, randomly generated one.

When your transfer is finished, it will be sent directly to the IOTA Foundation’s server, where it will be given priority for confirmation when the Coordinator is restarted.

Due to technical limitations, only balances of over 1 Mi can be transferred to a new seed with this tool. If you have a balance of less than 1 Mi that you want to transfer, you need to go through the [Identity Verification Process](#what-is-the-idenitity-verification-process).

:::info:
If more than one person uses the Seed Migration tool to transfer IOTA token from the same seed, the owner of the seed will need to go through the Identity Verification Process to validate their ownership.
:::

1. [Download the Seed Migration tool] from the official IOTAledger Github repository

    Please make sure that you do not download the tool from any other source.

    The URL in the address bar should be xxx

2. Open the Seed Migration tool, and either import your existing SeedVault file or enter your seed manually

    To find your existing seed in Trinity, go to **Account** > **Account management** >  **View seed**. Here, you can export your seed to a SeedVault file or see it in plain text.

3. Make sure your displayed balance is correct

    This is the total amount of IOTA tokens which will be transferred to your new seed.
    The displayed balance is the total balance of your seed’s first 50 addresses.

4. If you think you’re balance is wrong, or you know that you have IOTA tokens on more than the first 50 addresses, click Sync Addresses

    The tool will check the balance of 50 more addresses each time you click this button.

5. Choose an option to create a new seed, and follow the prompts

6. Save your migration log file

    This file contains details about the transfer to your new seed. You can use this file to check the status of your transfer, and you will need it in case you need to go through the [Identity Verification Process](#what-is-the-idenitity-verification-process).

7. Click **Begin Transfer** to transfer all your IOTA tokens to the first address of your new seed

    The transfer can take a few minutes. Please do not close the tool until the transfer is finished, otherwise you may need to go through the [Identity Verification Process](#what-is-the-idenitity-verification-process).

    When your transfer is finished, it will be sent directly to the IOTA Foundation’s server, where it will be given priority for confirmation when the Coordinator is restarted.

    Your transfer can have one of the following statuses:

    **Secured:** The Coordinator has confirmed your transfer. You are free to send value transactions, using your new seed.

    **Custody period:** Your transfer has been sent to the IOTA Foundation, and now you just need to wait for the Coordinator to be restarted

    **ID required:** Your transfer either includes stolen IOTA tokens or someone else tried to use the Seed Migration tool with your seed. Please complete the [Identity Verification Process](#what-is-the-idenitity-verification-process).

8. Open Trinity, and either enter your new seed or import your new SeedVault file

    :::info:
    Until the Coordinator is restarted, your new seed’s balance will be 0. After the Coordinator is restarted, your transfers will be confirmed and you will see your correct balance.
    :::

9. To see your new seed, go to **Account** > **Account management** >  **View seed**, and enter the password you created in step 5

You can repeat this process for any other seeds that you may own.

## What is the Identity Verification Process?

To protect certain users' IOTA tokens, the IOTA Foundation will temporarily transfer any that are deemed ‘at risk’ to another seed for safekeeping. This process will take place during a global snapshot, which will be validated by the IOTA community's nodes.

At-risk IOTA tokens include:

- Those that are known to have been stolen during the attack
- Those that belong to a seed, which was entered into the Seed Migration tool by two or more people

If you own any at-risk IOTA tokens, you will need to complete a KYC (know your customer) process with a third party to reclaim them.

More information on the process as well as the consequences for all affected users will be provided soon.

## Next steps

If you have any questions about Trinity, check the [Troubleshooting guide](../references/troubleshooting.md), or reach out to the IOTA community in the #help channel on [Discord](https://discord.iota.org/).

