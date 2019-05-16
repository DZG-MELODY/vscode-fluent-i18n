// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import createSnippets from "./createSnippets";

// this method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
  console.log("fluent-i18n is start to active...");

  let i18n_keys: Array<string> = [];

  i18n_keys =
    vscode.workspace.getConfiguration().get("fluentI18n.autoCompletion.keys") ||
    [];

  const onConfigChanged = vscode.workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration("fluentI18n.autoCompletion.keys")) {
      i18n_keys =
        vscode.workspace
          .getConfiguration()
          .get("fluentI18n.autoCompletion.keys") || [];
      vscode.window.showInformationMessage("fluent-i18n keys has update");
    }
  });

  const completionProvider: vscode.CompletionItemProvider = {
    provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      let linePrefix = document
        .lineAt(position)
        .text.substr(0, position.character);
      if (!(linePrefix.endsWith("t(") || linePrefix.endsWith("$t("))) {
        return undefined;
      }
      return createSnippets(i18n_keys);
    }
  };

  const vueProvider = vscode.languages.registerCompletionItemProvider(
    "vue",
    completionProvider,
    "("
  );
  const jsProvider = vscode.languages.registerCompletionItemProvider(
    "javascript",
    completionProvider,
    "("
  );
  const tsProvider = vscode.languages.registerCompletionItemProvider(
    "typescript",
    completionProvider,
    "("
  );
  context.subscriptions.push(
    vueProvider,
    jsProvider,
    tsProvider,
    onConfigChanged
  );

  vscode.window.showInformationMessage("fluent-i18n is ready");
}

// this method is called when your extension is deactivated
export function deactivate() {}
