import * as vscode from "vscode";

/**
 * 根据映射key生成自动完成项
 * @param keyArray
 */
export default function createSnippets(
  keyArray: string[]
): vscode.CompletionItem[] {
  const completionArray: Array<vscode.CompletionItem> = [];
  keyArray.forEach(key => {
    const snippetCompletion = new vscode.CompletionItem(
      key,
      vscode.CompletionItemKind.Constant
    );
    snippetCompletion.insertText = `'${key}'`;
    completionArray.push(snippetCompletion);
  });
  return completionArray;
}
