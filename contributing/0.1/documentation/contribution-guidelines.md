# Contribute to the developer documentation

We encourage everyone with knowledge of IOTA technology to contribute to our documentation.

To contribute new content:

1. See our [open issues](https://github.com/iotaledger/documentation/issues)
2. Choose something that you'd like to work on, or create a new issue to suggest new content
3. Comment on the issue to let us know that you'd like to work on it
4. Start writing your content, following our [style guide](../documentation/style-guide.md)

To make suggestions to existing content:

1. Find the article that you want to change
2. Start making your changes, following our [style guide](../documentation/style-guide.md)

Thanks! :heart:

## Do you have a question?

If you have a general or technical question, you can use one of the following resources instead of submitting an issue:

- [**Discord:**](https://discord.iota.org/) For communicating with the developers and community members
- [**IOTA cafe:**](https://iota.cafe/) For discussing technical questions with the Research Department at the IOTA Foundation
- [**StackExchange:**](https://iota.stackexchange.com/) For asking technical questions

## Get started with your first contribution

Our documentation is hosted on GitHub, which is a version control tool. To create new content, or suggest changes to existing content, you must use either Git or GitHub.

If you already have a GitHub account and Git is set up on your computer, go straight to [Create a new branch](#create-a-new-branch).

1. [Create a new GitHub account](https://github.com/) if you don't already have one

2. [Set up Git](https://help.github.com/articles/set-up-git/)

3. Go to our [documentation repository](https://github.com/iotaledger/documentation.git) and click **Fork** at the top of the page

4. Copy your fork to your local machine by doing the following in a command-line interface. Replace the `$USERNAME` placeholder with your GitHub username

    ```bash
    git clone https://github.com/$USERNAME/documentation
    ```

5. Create a reference to our repository from your fork

    ```bash
    cd documentation
    git remote add upstream https://github.com/iotaledger/documentation.git
    git fetch upstream
    ```

Now, your `documentation` directory will contain all the documentation files.

To find an existing article, you can use the URL of the documentation portal as a reference. The path to the article comes after `docs`.

For example, to find the article about minimum weight magnitude, which has the following URL, you would look in the `getting-started/0.1/network` directory, and find the article called `minimum-weight-magnitude.md`:

```
https://docs.iota.org/docs/getting-started/0.1/network/minimum-weight-magnitude
```

### Create a new branch

Branches help us to review content by separating your contributions into categories.

The following types of contribution are appropriate for a new branch:

- A new article ( a single markdown file)
- Grammar edits and spelling corrections, and any other suggestions for an existing article

1. Open a command-line interface

2. Do the following:

    ```bash
    git pull upstream develop:<your branch name>
    git push origin <your branch name>
    ```

3. To start working on your local copy of the branch, do the following:

    ```bash
    git checkout <your branch name>
    ```

Please follow our [style guide](../documentation/style-guide.md) when you write and edit articles.

### Validate your content

To make sure that you haven't introduced spelling errors or broken links, the next step is to validate your content.

1. [Install Node.js](https://nodejs.org/en/download/)

2. In the `documentation` directory, install the dependencies

    ```bash
    npm install
    ```

3. Run the `buildProjects` script

    ```bash
    node buildProjects
    ```

This script will do the following:

- Print errors to the console
- Create a `projects-summary.log` file, which shows the structure of the content and also highlights the errors
- Create a spelling-summary.md file, which contains any possible spelling mistakes and suggestions

To enhance the [Hunspell](https://en.wikipedia.org/wiki/Hunspell) spell checker, you can add words to the dictionary.json file, which supports regular expressions. For example:

```json
{
    "global": [
        "(P|p)ermission(less|ed)"
    ],
    "smartcity": [
        "AstroPi"
    ]
}
```

If you made changes to a single directory, you can validate it alone by adding its name to the end of the `node buildProjects` command. For example, to validate only the content in the `getting-started` directory, you'd do the following:

```shell
node buildProjects getting-started
```

### Push your content to our GitHub repository

After writing or editing content and validating it, the next step is to push it to our repository.

1. Add your changes

    ```bash
    git add .
    ```
    
    :::info:
    You may be asked to set your account's default identity.
    :::
  
    ```bash
    Please tell me who you are
    Run 
    git config --global user.email "you@example.com"
    git config --global user.name "Your Name"
    ```
    
2. Commit your changes

    ```bash
    git commit -m "<Describe the changes you made>"
    ```

    :::info:
    Make any additional changes to the same files in subsequent commits as you work. Not all changes need to be in the same commit.
    :::

3. Push your changes

    ```bash
    git push origin <your branch name>
    ```
    
4. In GitHub, go to the repository that you forked from `iotaledger/documentation`, and click **Pull Request** at the top of the page

5. Make sure that the base branch is `iotaledger/documentation@develop` and the head branch is `$USERNAME/documentation@$BRANCHNAME`

6. Click **Update Commit Range** or **Compare & pull request**

7. Give your pull request a title, and describe all the changes you're making

8. Click **Submit**

:::success:
Thank you! We will now process your pull request. If there are any edits to make, we will ask you in the comments of the pull request you created.
::: 

You can continue working and commit/push new changes like you did before. Any updates will appear in the pending pull request.