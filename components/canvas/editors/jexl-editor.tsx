import Editor, { OnMount } from "@monaco-editor/react";
import * as monacoEditor from "monaco-editor";

interface JexlEditorProps {
    value: string;
    onChange: (value: string | undefined) => void;
}

export function JexlEditor({ value, onChange }: JexlEditorProps) {
    function getDefaultRange(monaco: typeof import("monaco-editor"), model: monacoEditor.editor.ITextModel, position: monacoEditor.Position) {
        const word = model.getWordUntilPosition(position);
        return {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
        };
    }

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        // Register custom language for JEXL
        monaco.languages.register({ id: "jexl" });

        // Basic tokenizer
        monaco.languages.setMonarchTokensProvider("jexl", {
            tokenizer: {
                root: [
                    [/\b(if|else|and|or|not|in|true|false|null)\b/, "keyword"],
                    [/[a-zA-Z_][\w$]*/, "identifier"],
                    [/\d+/, "number"],
                    [/".*?"/, "string"],
                    [/'.*?'/, "string"],
                    [/[=><!]+/, "operator"],
                ],
            },
        });

        // Register snippet suggestions
        monaco.languages.registerCompletionItemProvider("jexl", {
            provideCompletionItems: (model, position) => {
                const range = getDefaultRange(monaco, model, position);
                const suggestions: monacoEditor.languages.CompletionItem[] = [
                    {
                      label: "ifElse",
                      kind: monaco.languages.CompletionItemKind.Snippet,
                      insertText: "if (${1:condition}) { ${2:trueValue} } else { ${3:falseValue} }",
                      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                      documentation: "If-Else expression",
                      range
                    },
                    {
                      label: "ternary",
                      kind: monaco.languages.CompletionItemKind.Snippet,
                      insertText: "${1:condition} ? ${2:trueValue} : ${3:falseValue}",
                      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                      documentation: "Ternary operator",
                      range
                    },
                    {
                      label: "lowercase",
                      kind: monaco.languages.CompletionItemKind.Function,
                      insertText: "lowercase(${1:input})",
                      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                      documentation: "Convert string to lowercase",
                      range
                    },
                  ];
                return { suggestions };
            },
        });
    };

    return (
        <Editor
            height="300px"
            defaultLanguage="jexl"
            value={value}
            onChange={onChange}
            theme="vs-light"
            onMount={handleEditorDidMount}
            options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 8, bottom: 8 },
                folding: true,
                wordWrap: "on",
                suggest: {
                    showSnippets: true,
                }
            }}
        />
    );
}