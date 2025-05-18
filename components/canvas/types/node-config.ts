export interface Field {
    id: string;
    label: string;
    type: string;
    placeholder?: string;
    options?: string[];
    description?: string;
}

export interface NodeConfig {
    title: string;
    description: string;
    fields: Field[];
}

export interface NodeConfigPanelProps {
    isOpen: boolean;
    onClose: () => void;
    nodeType?: string;
    nodeId?: string;
    onDelete?: () => void;
    parameters?: Record<string, any>;
    onUpdateConfig?: (parameters: Record<string, any>) => void;
}