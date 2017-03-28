'use strict';

import * as vscode from 'vscode';

var terminalStack = [];
var testArguments = [];

var editor = null;
var editorFileName = null;
let config = null;
var wordRange = null;

export function runUnitTest() {
    createTerminal();
    buildArgumentArray(null);
    executeTerminalCommand();
}

function clearArguments() {
    testArguments = [];
}

function createTerminal() {
    if (terminalStack.length === 0) {
        terminalStack.push((<any>vscode.window).createTerminal('PHP Unit Test Terminal'));
    }
}

function buildArgumentArray(directory: string) {
    try {
        clearArguments();
        setConfig();
        setEditor();
        setEditorFileName();
        
        addExecPath();
        addConfigArgs();

        if (directory != null && directory != "") {
            addArgument(directory);

        } else {
            addFilterIfFunction();
            addRelativePath();
        }
    } catch (e) {
        sendErrorNotification((<Error>e).message);
    }
}

function setConfig() {
    config = vscode.workspace.getConfiguration("phpunittest");
    if (config == null || config == "") {
        throw new Error("Could not set the config file");
    }
}

function addExecPath() {
    var execPath = config.get("execPath");
    if (execPath == undefined) {
        throw new Error("Could not set the executable path");
    }
    addArgument(execPath);
}

function addConfigArgs() {
    var configArgs = config.get("arguments", []);
    addArgument(configArgs);
}

function getLatestTerminal() {
    return terminalStack[terminalStack.length - 1];
}

function executeTerminalCommand() {
    getLatestTerminal().show(true);
    getLatestTerminal().sendText(testArguments.join(' '));
}

function sendErrorNotification($msg) {
    vscode.window.showErrorMessage($msg);
    throw new Error();
}

function addArgument($arg) {
    if ($arg instanceof Array) {
        for (var item in $arg) {
            addArgument(item);
        }
    } else {
        testArguments.push($arg);
    }
}

function setEditor() {
    editor = vscode.window.activeTextEditor;

    if (editor == null || editor == undefined) {
        throw new Error('The editor is undefined');
    }
}

function setEditorFileName() {
    editorFileName = editor.document.fileName;
    if (editorFileName == null || editorFileName == undefined) {
        throw new Error('The editor filename is undefined');
    }
}

function addFilterIfFunction() {
    var lineNumber = editor.selection.active.line;
    let line = editor.document.lineAt(lineNumber);
    var lineWordArray = line.text.trim().split(" ");
    var indexOfFunction = lineWordArray.indexOf("function");
    
    if (indexOfFunction !== -1 ) {
        var functionName = lineWordArray[indexOfFunction + 1];
        functionName = functionName.replace(/\s*\(.*?\)\s*/g, '');

        if(functionName !== ""){
            addArgument("--filter " + functionName);
        }
    }
}

function addRelativePath() {
    let relPath = vscode.workspace.asRelativePath(editor.document.fileName);
    relPath = relPath.replace(/[\.\/\\]*/i, ''); // Strip beginning of path of (./\)
    if (relPath !== "") {
        addArgument("./" + relPath);
    } else {
        throw new Error("Unable to set the relative path from the filename");
    }
}
