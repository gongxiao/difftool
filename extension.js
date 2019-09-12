// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
'use strict';
var vscode = require('vscode');
const child_process = require("child_process");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    var diffTool = vscode.commands.registerCommand('extension.diffTool', function (accessor, resource) {
        if (resource == undefined || resource.length < 2 || resource.length > 3) {
            vscode.window.showWarningMessage('Command should be run with two or three files');
            return;
        } else {
            var simpleGit = require('simple-git');
            var projectPath = (vscode.workspace.rootPath)
            simpleGit(projectPath).raw(
                [
                    'config',
                    '--get',
                    'diff.tool'
                ], (err, result) => {
                    if (err) {
                        vscode.showWarningMessage(err);
                        console.error(err);
                    }
                    result = result.replace(/(\r\n|\n|\r)$/, "");
                    if (result == "bc3")
                        result = "bcompare";
                    var builtCommand = "".concat(result, " ", resource.map(e => e.fsPath).join(" "));
                    child_process.exec(builtCommand, { cwd: projectPath }, (err, stdout, stderr) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log(stdout);
                    });
                });
        }
    });
    var gitDiffer = vscode.commands.registerCommand('extension.gitDiffer', function (param) {
        if (param == undefined || param._resourceUri.scheme !== 'file') {
            vscode.window.showWarningMessage('Command should be run from source control context menu');
            return;
        } else {
            var simpleGit = require('simple-git');
            var replaced = false;
            var i = 0;
            while (vscode.workspace.workspaceFolders[i]) {
                var projectPath = (vscode.workspace.workspaceFolders[i].uri.path)
                var targetFile = param._resourceUri.fsPath.replace(projectPath, function (token) { replaced = true; return ''; });
                if (replaced)
                    break;
                i++;
            }
            // remove first / or \
            if (targetFile[0] === '/' || targetFile[0] == '\\') {
                targetFile = targetFile.slice(1, targetFile.length);
            }
            simpleGit(projectPath).raw(
                [
                    'difftool',
                    '-y',
                    targetFile
                ], (err, result) => {
                    if (err)
                        vscode.showWarningMessage(err);
                    console.error(err);
                    console.log(result);
                });
        }
    });
    var gitMergetool = vscode.commands.registerCommand('extension.gitMergetool', function (param) {
        var simpleGit = require('simple-git');
        var projectPath = (param._rootUri.path)
        simpleGit(projectPath).raw(
            [
                'mergetool'
            ], (err, result) => {
                if (err)
                    vscode.window.showWarningMessage(err);
                if (result.replace("\n", "") == 'No files need merging')
                    vscode.window.showInformationMessage("No files need merging");
                console.log(result);
            });
    });
    context.subscriptions.push(diffTool);
    context.subscriptions.push(gitMergetool);
    context.subscriptions.push(gitDiffer);

}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;


