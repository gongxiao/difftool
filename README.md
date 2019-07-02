# DiffTool for Visual Studio Code

Visual Studio Code extension for running difftool, git difftool and git mergetools to resolve merge conflict.

This project is forked from [GitDiffer](https://github.com/Aghabeiki/gitdiffer).

## Some tips

* Aghabeiki has tried to use other extension but it didn't fit, so he created [GitDiffer](https://marketplace.visualstudio.com/items?itemName=aaghabeiki.gitdiffer).
* I also want to use other diff tools in vscode explorer.
* tested on macOS Mojave.
* for running difftools, use explorer in vscode, select two or three files, right click and select "Launch Difftool for ..."
* for running git difftools, use source control toolbox in vscode, right click on file and select "Launch Difftool for ..."
* for running git mergetool, use source control toolbox in vscode, beside the title menu (...), select the "Launch Mergetool" or simple open the command plate and run "Launch Mergetool"

## Installation Steps

* First install [diffmerge](https://sourcegear.com/diffmerge/) or any other alternatives.
* Add this configuration to your git global config :

    ```bash
    git config --global diff.tool diffmerge
    git config --global difftool.diffmerge.cmd diffmerge "$LOCAL" "$REMOTE"
    git config --global merge.tool diffmerge
    git config --global mergetool.diffmerge.cmd diffmerge --merge --result="$MERGED" "$LOCAL" "$(if test -f "$BASE"; then echo "$BASE"; else echo "$LOCAL"; fi)" "$REMOTE"
    git config --global mergetool.diffmerge.trustexitcode true
    ```

* install the extension.

## Final note

* This extension should work with other [diffmerge](https://sourcegear.com/diffmerge/) tools.
* git configurations depends on the used tools.

[Bug Reports](https://github.com/gongxiao/difftool/issues)  
[Repo](https://github.com/gongxiao/difftool)
