import { Handle, Position } from '@xyflow/react';

interface NodeData {
    label: string;
    icon?: React.ReactNode;
    color: {
        border: string;
        bg: string;
        icon: string;
    };
    isCondition?: boolean;
}

export function BaseNode({ data }: { data: NodeData }) {
    return (
        <div
            className={`
                group relative rounded-md border ${data.color.border} 
                bg-white shadow-sm hover:shadow-md
            `}
        >
            <div className="flex flex-row items-center p-4 gap-3 select-none">
                <div 
                    className={`
                        ${data.color.bg} rounded-md p-2
                        flex items-center justify-center 
                    `}
                >
                    {data.icon}
                </div>
            </div>
            
            {/* Bottom Text */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 -translate-y-1 text-xs text-gray-500">
                {data.label}
            </div>
            
            {/* Input Handle - Square */}
            <Handle
                type="target"
                position={Position.Left}
                style={{
                    width: '7px',
                    height: '16px',
                    backgroundColor: '#94a3b8',
                    borderRadius: '0px',
                    border: 'none',
                }}
            />
            
            {/* Output Handles */}
            {data.isCondition ? (
                <>
                    {/* True Output - Circle (Top Right) */}
                    <Handle
                        type="source"
                        position={Position.Right}
                        id="true"
                        style={{
                            width: '10px',
                            height: '10px',
                            backgroundColor: '#94a3b8',
                            borderRadius: '50%',
                            border: 'none',
                            top: '35%',
                        }}
                    />
                    {/* False Output - Circle (Bottom Right) */}
                    <Handle
                        type="source"
                        position={Position.Right}
                        id="false"
                        style={{
                            width: '10px',
                            height: '10px',
                            backgroundColor: '#94a3b8',
                            borderRadius: '50%',
                            border: 'none',
                            top: '65%',
                        }}
                    />
                    {/* Handle Labels */}
                    <div className="absolute -right-5 top-[35%] translate-x-4 -translate-y-1/2 text-[10px] text-gray-500">
                        true
                    </div>
                    <div className="absolute -right-5 top-[65%] translate-x-4 -translate-y-1/2 text-[10px] text-gray-500">
                        false
                    </div>
                </>
            ) : (
                /* Default Output Handle - Circle */
                <Handle
                    type="source"
                    position={Position.Right}
                    style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: '#94a3b8',
                        borderRadius: '50%',
                        border: 'none',
                    }}
                />
            )}
        </div>
    );
}