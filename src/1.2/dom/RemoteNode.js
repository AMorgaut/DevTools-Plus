'use strict';

const NODE_TYPES = {
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11
};

let lastNodeId = 0;

/**
 * @class RemoteNode
 */
export default class RemoteNode {

    /**
     * Extends a Vendor node with the Debugger mandatory interface:
     * - nodeId
     * - nodeName
     * - localName
     * - nodeValue
     *
     * @constructor
     * @param {Object} vendorNode
     */
    constructor(vendorNode) {
        const { nodeType } = vendorNode;
        const dom = this;

        Object.assign(this, vendorNode,{
            nodeId: lastNodeId++,
            nodeName: null,
            localName: null,
            nodeValue: null,
            get childNodeCount() {
                return vendorNode.children ? vendorNode.children.length : undefined;
            },
            get children() {
                return dom[getChildrenByVendorNode](vendorNode);
            },
            get attributes() {
                return vendorNode.attributes;
            },
            get documentURL() {
                return dom[getNodeByVendorNode](dom.document).documentURL;
            },
            get baseURL() {
                return dom[getNodeByVendorNode](dom.document).baseURL;
            }
        });

        switch (nodeType) {
            case NODE_TYPES.ELEMENT_NODE:
                Object.assign(this, {
                    get nodeName() {
                        return vendorNode.tagName;
                    },
                    get localName() {
                        return vendorNode.tagName.split(':').pop()
                    }
                });
                break;
            case NODE_TYPES.TEXT_NODE:
                Object.assign(this, {
                    nodeName: '#text',
                    get nodeValue() {
                        return vendorNode.wholeText;
                    }
                });
                break;
            case NODE_TYPES.PROCESSING_INSTRUCTION_NODE:
                Object.assign(this, {
                    get nodeName() {
                        return vendorNode.target;
                    },
                    get nodeValue() {
                        return vendorNode.data
                    }
                });
                break;
            case NODE_TYPES.COMMENT_NODE:
                Object.assign(this, {
                    nodeName: '#comment',
                    get nodeValue() {
                        return vendorNode.data
                    }
                });
                break;
            case NODE_TYPES.DOCUMENT_NODE:
                this.nodeName = '#document';
                break;
            case NODE_TYPES.DOCUMENT_TYPE_NODE:
                Object.assign(this, {
                    get nodeName() {
                        return vendorNode.name;
                    }
                });
                break;
            case NODE_TYPES.DOCUMENT_FRAGMENT_NODE:
                this.nodeName = '#document-fragment';
                break;
            default:
                throw new Error('Invalid Node Type');
        }
    }
}

Object.assign(Node, { NODE_TYPES });
