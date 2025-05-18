import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import Editor from "@monaco-editor/react";

import { JexlEditor } from './editors/jexl-editor';
import { RichTextEditor } from './editors/rich-text-editor';
import type { NodeConfigPanelProps } from './types/node-config';
import { nodeConfigs } from "./configs/node-configs";




export function NodeConfigPanel({
    isOpen,
    onClose,
    nodeType,
    nodeId,
    onDelete,
    parameters = {},
    onUpdateConfig
}: NodeConfigPanelProps) {
    const [currentParams, setCurrentParams] = useState<Record<string, any>>(parameters);





    useEffect(() => {
        setCurrentParams(parameters);
    }, [nodeId]);

    if (!nodeType || !nodeConfigs[nodeType as keyof typeof nodeConfigs]) {
        return null;
    }

    const config = nodeConfigs[nodeType as keyof typeof nodeConfigs];

    const handleFieldChange = (fieldId: string, value: any) => {
        const newParams = {
            ...currentParams,
            [fieldId]: value
        };
        setCurrentParams(newParams);
        onUpdateConfig?.(newParams);
    };

    const renderField = (field: any) => {
        const value = currentParams[field.id] || '';

        switch (field.type) {
            case "select":
                return (
                    <Select
                        value={value}
                        onValueChange={(val) => handleFieldChange(field.id, val)}
                    >
                        <SelectTrigger className="w-full border-indigo-200 focus:ring-indigo-500/20 focus:border-indigo-500">
                            <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options.map((option: string) => (
                                <SelectItem
                                    key={option}
                                    value={option}
                                    className="hover:bg-indigo-50 focus:bg-indigo-50 focus:text-indigo-900"
                                >
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            case "textarea":
                return (
                    <Textarea
                        id={field.id}
                        value={value}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="min-h-[100px] border-indigo-200 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
                    />
                );
            case "function":
                return (
                    <div className="border rounded-md border-indigo-200 overflow-hidden">
                        {field.id === "expression" ? (
                            <JexlEditor
                                value={value}
                                onChange={(val) => handleFieldChange(field.id, val)}
                            />
                        ) : (
                            <Editor
                                height="300px"
                                defaultLanguage="javascript"
                                value={value}
                                onChange={(val) => handleFieldChange(field.id, val)}
                                theme="vs-light"
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
                                }}
                            />
                        )}
                    </div>
                );
            case "toggle":
                return (
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor={field.id}>{field.label}</Label>
                            {field.description && (
                                <p className="text-sm text-gray-400">{field.description}</p>
                            )}
                        </div>
                        <Switch
                            id={field.id}
                            checked={value}
                            onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
                            className="data-[state=checked]:bg-indigo-600"
                        />
                    </div>
                );
            case "editor":
                return (
                    <RichTextEditor
                        value={value}
                        onChange={(val) => handleFieldChange(field.id, val)}
                        placeholder={field.placeholder}
                    />
                );
            default:
                return (
                    <Input
                        id={field.id}
                        type={field.type}
                        value={value}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full border-indigo-200 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
                    />
                );
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[800px] bg-white flex flex-col rounded-lg shadow-lg h-[80vh] overflow-hidden">
                <DialogHeader className="border-b border-indigo-100 pb-4 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold text-gray-500">
                            {config.title}
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <DialogDescription className="font-normal text-gray-400 flex-shrink-0">
                    {config.description}
                </DialogDescription>

                <div className="py-6 space-y-6 flex-1 overflow-y-auto">
                    {config.fields.map((field) => (
                        <div key={field.id} className="space-y-2">
                            {field.type !== "toggle" && (
                                <Label
                                    htmlFor={field.id}
                                    className="text-sm font-medium text-gray-500"
                                >
                                    {field.label}
                                </Label>
                            )}
                            {renderField(field)}
                        </div>
                    ))}
                </div>

                <DialogFooter className="border-t border-indigo-100 pt-4 flex-shrink-0">
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                            onClick={() => {
                                onDelete?.();
                                toast("Node Deleted", {
                                    description: `Node ${nodeId} has been deleted.`,
                                    style: {
                                        background: '#fef2f2',
                                        border: '1px solid #fee2e2',
                                        color: '#dc2626'
                                    }
                                });
                            }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 6h18" />
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                <line x1="10" y1="11" x2="10" y2="17" />
                                <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                            Delete
                        </Button>
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300"
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-indigo-600 text-white hover:bg-indigo-700"
                            onClick={() => {
                                onUpdateConfig?.(currentParams)
                                toast("Configuration Updated", {
                                    description: `Node ${nodeId} configuration has been updated successfully.`,
                                    style: {
                                        background: '#eef2ff',
                                        border: '1px solid #e0e7ff',
                                        color: '#4f46e5'
                                    }
                                })
                                onClose();
                            }}
                        >
                            Save Changes
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}