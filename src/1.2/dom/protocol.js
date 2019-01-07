/**
 * DOM Domain
 *
 * This domain exposes DOM read/write operations.
 * Each DOM Node is represented with its mirror object that has an id.
 * This id can be used to get additional information on the Node, resolve it into the JavaScript object wrapper, etc.
 * It is important that client receives DOM events only for the nodes that are known to the client.
 * Backend keeps track of the nodes that were sent to the client and never sends the same node twice.
 * It is client's responsibility to collect information about the nodes that were sent to the client.
 *
 * Note that iframe owner elements will return corresponding document elements as their child nodes.
 *
 * @see https://chromedevtools.github.io/devtools-protocol/1-2/DOM
 */

'use strict';

export const protocol = {
    domain: 'Dom',
    description: 'Debugger domain exposes JavaScript debugging capabilities. It allows setting and removing ' +
        'breakpoints, stepping through execution, exploring stack traces, etc.',
    commands: [{
        name: 'enable',
        description: 'Enables debugger for the given page. Clients should not assume that the debugging has been enabled ' +
            'until the result for this command is received.'
    }, {
        name: 'disable',
        description: 'Disables debugger for given page.'
    }, {
        name: 'getDocument',
        description: 'Returns the root DOM node to the caller.',
        returns: [{ name: 'root', $ref: 'Node', description: 'Resulting node.' }]
    }, {
        name: 'requestChildNodes',
        description: 'Requests that children of the node with given id are returned to the caller in form of ' +
            'setChildNodes events where not only immediate children are retrieved, but all children down to ' +
            'the specified depth.',
        parameters: [{
            name: 'nodeId', $ref: 'NodeId', description: 'Id of the node to get children for.'
        }, {
            name: 'depth', type: 'number', optional: true,
            description: 'The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the ' +
                'entire subtree or provide an integer larger than 0'
        }]
    }, {
        name: 'querySelector',
        description: 'Executes querySelector on a given node.',
        parameters: [
            { name: 'nodeId', $ref: 'NodeId', description: 'Id of the node to query upon.'},
            { name: 'selector', type: 'string', description: 'Selector string.' }
        ],
        returns: [{ name: 'nodeId', $ref: 'NodeId', description: 'Query selector result.' }],
    }, {
        name: 'querySelectorAll',
        description: 'Executes querySelectorAll on a given node.',
        parameters: [{
            name: 'nodeId', $ref: 'NodeId', description: 'Id of the node to query upon.'
        }, {
            name: 'selector', type: 'string', description: 'Selector string.'
        }],
        returns: [{
            name: 'nodeIds', type: 'array',
            items: { $ref: 'NodeId', description: 'Query selector result.' },
            description: 'Query selector result.',
        }],
    }, {
        name: 'setNodeName',
        description: 'Sets node name for a node with given id.',
        parameters: [
            { name: 'nodeId', $ref: 'NodeId', description: 'Id of the node to set name for.' },
            { name: 'name', type: 'string', description: 'New node\'s name.' }
        ],
        returns: [{ name: 'nodeId', $ref: 'NodeId', description: 'New node\'s id.' }],
    }, {
        name: 'setNodeValue',
        description: 'Sets node setNodeValue for a node with given id.',
        parameters: [
            { name: 'nodeId', $ref: 'NodeId', description: 'Id of the node to set value for.' },
            { name: 'value', type: 'string', description: 'New node\'s value.' }
        ],
    }, {
        name: 'removeNode',
        description: 'Removes node with given id.',
        parameters: [{
            name: 'nodeId', $ref: 'NodeId',
            description: 'Id of the node to remove.'
        }],
    }, {
        name: 'setAttributeValue',
        description: 'Sets attribute for an element with given id.',
        parameters: [
            { name: 'nodeId', $ref: 'NodeId', description: 'Id of the node to set attribute for.' },
            { name: 'name', type: 'string', description: 'Attribute name.' },
            { name: 'value', type: 'string', description: 'Attribute value.' }
        ],
    }, {
        name: 'setAttributesAsText',
        description: 'Sets attributes on element with given id. ' +
            'This method is useful when user edits some existing attribute value and types ' +
            'in several attribute name/value pairs.',
        parameters: [{
            name: 'nodeId', $ref: 'NodeId',
            description: 'Id of the node to set attribute for.'
        }, {
            name: 'text', type: 'string',
            description: 'Text with a number of attributes. Will parse this text using HTML parser.'
        }, {
            name: 'name', type: 'string', optional: true,
            description: 'Attribute name to replace ' +
                'with new attributes derived from text in case text parsed successfully.'
        }],
    }, {
        name: 'removeAttribute',
        description: 'Removes attribute with given name from an element with given id.',
        parameters: [
            { name: 'nodeId', $ref: 'NodeId', description: 'Id of the element to remove attribute from.' },
            { name: 'name', type: 'string', description: 'Name of the attribute to remove.' }
        ],
    }, {
        name: 'getOuterHTML',
        description: 'Returns node\'s HTML markup.',
        parameters: [{ name: 'nodeId', $ref: 'NodeId', description: 'Id of the node to get markup for.' }],
        returns: [{ name: 'outerHTML', type: 'string', description: 'Outer HTML markup.' }]
    }, {
        name: 'setOuterHTML',
        description: 'Sets node HTML markup, returns new node id.',
        parameters: [
            { name: 'nodeId', $ref: 'NodeId', description: 'Id of the node to set markup for.' },
            { name: 'outerHTML', type: 'string', description: 'Outer HTML markup to set.' }
        ]
    }, {
        name: 'requestNode',
        description: 'Requests that the node is sent to the caller given the JavaScript node object reference. ' +
            'All nodes that form the path from the node to the root are also sent to the client ' +
            'as a series of setChildNodes notifications.',
        parameters: [{
            name: 'objectId', $ref: 'Runtime.RemoteObjectId',
            description: 'JavaScript object id to convert into node.'
        }],
        returns: [{ name: 'nodeId', $ref: 'NodeId', description: 'Node id for given object.' }]
    }, {
        name: 'highlightRect',
        description: 'Highlights given rectangle. Coordinates are absolute with respect to the main frame viewport.',
        parameters: [
            { name: 'x', description: 'X coordinate', type: 'integer' },
            { name: 'y', description: 'Y coordinate', type: 'integer' },
            { name: 'width', description: 'Rectangle width', type: 'integer' },
            { name: 'height', description: 'Rectangle height', type: 'integer' },
            { name: 'color', $ref: 'RGBA', description: 'The highlight fill color (default: transparent).', optional: true },
            { name: 'outlineColor', $ref: 'RGBA', description: 'The highlight fill color (default: transparent).', optional: true }
        ]
    }, {
        name: 'highlightNode',
        description: 'Highlights DOM node with given id or with the given JavaScript object wrapper. ' +
            'Either nodeId or objectId must be specified.',
        parameters: [
            { name: 'x', description: 'X coordinate', type: 'integer' },
            { name: 'y', description: 'Y coordinate', type: 'integer' },
            { name: 'width', description: 'Rectangle width', type: 'integer' },
            { name: 'height', description: 'Rectangle height', type: 'integer' },
            { name: 'color', $ref: 'RGBA',  description: 'The highlight fill color (default: transparent).', optional: true },
            { name: 'outlineColor', $ref: 'RGBA',  description: 'The highlight fill color (default: transparent).', optional: true}
        ]
    }, {
        name: 'hideHighlight',
        description: 'Hides DOM node highlight.'
    }, {
        name: 'resolveNode',
        description: 'Resolves JavaScript node object for given node id.',
        parameters: [{
            name: 'nodeId', $ref: 'NodeId',
            description: 'Id of the node to resolve.'
        }, {
            name: 'objectGroup', type: 'string', optional: true,
            description: 'Symbolic group name that can be used to release multiple objects.'
        }],
        returns: [
            { name: 'object', $ref: 'Runtime.RemoteObject', description: 'JavaScript object wrapper for given node.' }
        ]
    }, {
        name: 'getAttributes',
        description: 'Returns attributes for the specified node.',
        parameters: [{ name: 'nodeId', $ref: 'NodeId', description: 'Id of the node to retrieve attributes for.' }],
        returns: [{
            name: 'attributes', type: 'array',
            items: { type: 'string', description: 'Query selector result.' },
            description: 'An interleaved array of node attribute names and values.'
        }]
    }, {
        name: 'moveTo',
        description: 'Moves node into the new container, places it before the given anchor.',
        parameters: [
            { name: 'nodeId', $ref: 'NodeId', description: 'Id of the node to move.' },
            { name: 'targetNodeId', $ref: 'NodeId', description: 'Id of the element to drop the moved node into.' },
            {
                name: 'insertBeforeNodeId', $ref: 'NodeId', optional: true,
                description: 'Drop node before this one (if absent, the moved node becomes the last child of targetNodeId).'
            }
        ],
        returns: [{ name: 'nodeId', $ref: 'NodeId', description: 'New id of the moved node.' }]
    }],
    events: [],
    types: []
};
