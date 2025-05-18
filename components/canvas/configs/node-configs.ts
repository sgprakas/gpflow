import { NodeConfig } from '../types/node-config';

export const nodeConfigs: Record<string, NodeConfig> = {
    http: {
        title: "HTTP Request Configuration",
        description: "Make HTTP requests to external services",
        fields: [
            { id: "url", label: "URL", type: "text", placeholder: "https://api.example.com" },
            {
                id: "method",
                label: "Method",
                type: "select",
                options: ["GET", "POST", "PUT", "DELETE", "PATCH"],
                placeholder: "Select method"
            },
            {
                id: "headers",
                label: "Headers",
                type: "textarea",
                placeholder: '{\n  "Content-Type": "application/json"\n}'
            },
            {
                id: "body",
                label: "Body",
                type: "textarea",
                placeholder: '{\n  "key": "value"\n}'
            }
        ]
    },
    function: {
        title: "Function Configuration",
        description: "Execute custom JavaScript functions",
        fields: [
            {
                id: "code",
                label: "Code",
                type: "function",
                placeholder: "// Write your function code here\nreturn input.data;"
            },
        ]
    },
    webhook: {
        title: "Webhook Configuration",
        description: "Create webhook endpoints",
        fields: [
            {
                id: "secure",
                label: "Secure Endpoint",
                type: "toggle",
                description: "Enable authentication for this webhook"
            }
        ]
    },
    condition: {
        title: "Condition Configuration",
        description: "Add conditional logic to your workflow using JEXL expressions",
        fields: [
            {
                id: "expression",
                label: "Expression",
                type: "function",
                placeholder: `// Example JEXL expressions:
// Check if age is greater than 18
data.age > 18

// Check multiple conditions
data.age > 18 && data.country == 'US'

// Check array contains
data.roles.contains('admin')

// String operations
data.name.length > 0 && data.email =~ /.*@.*\\.com/

// Math operations
(data.price * data.quantity) > 1000

// Ternary operation
data.status == 'active' ? 'Enabled' : 'Disabled'

// Transform array
data.items.map(item => item.price).sum()`,
            },
        ]
    },
    delay: {
        title: "Delay Configuration",
        description: "Add time delay to your workflow",
        fields: [
            { id: "duration", label: "Duration", type: "number", placeholder: "10" },
            {
                id: "type",
                label: "Delay Unit",
                type: "select",
                options: ["Seconds", "Minutes", "Hours", "Days"],
                placeholder: "Select type"
            }
        ]
    },
    email: {
        title: "Email Configuration",
        description: "Send emails in your workflow",
        fields: [
            { id: "to", label: "To", type: "email", placeholder: "recipient@example.com" },
            { id: "subject", label: "Subject", type: "text", placeholder: "Email Subject" },
            {
                id: "template",
                label: "Email Template",
                type: "editor",
                placeholder: `<div>
    <h1>Hello {{name}}</h1>
    <p>This is a template email.</p>
    <p>You can use variables like: {{data.value}}</p>
    <br/>
    <p>Best regards,</p>
    <p>{{sender}}</p>
</div>`
            },
            { id: "replyTo", label: "Reply To", type: "email", placeholder: "yourmail@example.com" }
        ]
    }
};
