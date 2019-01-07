/**
 * This domain exposes DOM read/write operations.
 * Each DOM Node is represented with its mirror object that has an id.
 * This id can be used to get additional information on the Node, resolve it into the JavaScript object wrapper, etc.
 * It is important that client receives DOM events only for the nodes that are known to the client.
 * Backend keeps track of the nodes that were sent to the client and never sends the same node twice.
 * It is client's responsibility to collect information about the nodes that were sent to the client.
 *
 * Note that iframe owner elements will return corresponding document elements as their child nodes.
 *
 * @module DOM
 */

'use strict';

import DebuggerNode from './DebuggerNode';

const { NODE_TYPES } = DebuggerNode;

// Private method symbols
const getNodeByVendorNode = Symbol('getNodeByVendorNode');
const getVendorNodeByNodeId = Symbol('getVendorNodeByNodeId');
const getChildrenByVendorNode = Symbol('getChildrenByVendorNode');

/**
 * @class DOM
 */
export class DOM {

    /**
     * @constructor
     * @param {DOM.VendorNode} document
     * @param {function} sendEvent
     */
    constructor(document, sendEvent) {
        this.NODES_MAP = new WeakMap();
        if (document.nodeType !== NODE_TYPES.DOCUMENT_NODE) {
            throw new TypeError(
                'The Vendor Document Node must have a nodeType property set to NODE_TYPES.DOCUMENT_NODE'
            );
        }
        this.document = document;
        this.sendDomEvent = (name, event) => sendEvent(`DOM.${name}`, event);
    }

    /**
     * @private
     */
    [getNodeByVendorNode](vendorNode) {
        const { NODES_MAP } = this;
        let result = NODES_MAP.get(vendorNode);
        if (!vendorNode) {
            result = new DebuggerNode(vendorNode);
            NODES_MAP.set(vendorNode, result);
        }
        return result;
    }

    /**
     * @private
     * @param {number} nodeId
     * @returns {DOM.VendorNode}
     */
    [getVendorNodeByNodeId](nodeId) {
        const { NODES_MAP } = this;
        for (const [vendorNode, debuggerNode] of NODES_MAP) {
            if (debuggerNode.nodeId === nodeId) {
                return vendorNode;
            }
        }
    }

    /**
     * @private
     * @param {DOM.VendorNode} vendorNode
     * @returns {DOM.DebuggerNode}
     */
    [getChildrenByVendorNode](vendorNode) {
        return vendorNode.children.map(childNode => this[getNodeByVendorNode](childNode));
    }

    /**
     * Enables DOM agent for the given page.
     */
    enable() {
        this.enabled = true;
    }

    /**
     * Disables DOM agent for the given page.
     */
    disable() {
        this.enabled = false;
    }

    /**
     * Returns the root DOM node to the caller.
     *
     * @returns {DOM.DebuggerNode}
     */
    getDocument() {
        return this[getNodeByVendorNode](this.document);
    }

    /**
     * Requests that children of the node with given id are returned to the caller in form of `setChildNodes` events
     * where not only immediate children are retrieved, but all children down to the specified depth.
     *
     * @fires DOM#setChildNodes
     * @todo Support the DOM.requestChildNodes depth parameter
     * @param {string} nodeId Id of the node to get children for
     * @param {number} [depth] The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0
     */
    requestChildNodes(nodeId, depth = 1) {
        if (depth === 0) {
            throw new TypeError('Wrong depth value');
        }
        if (depth !== 1) {
            console.error('DOM.requestChildNodes does not yet support the depth parameter');
        }
        const vendorNode = this[getVendorNodeByNodeId](nodeId);
        if (!vendorNode) {
            return;
        }
        const children = this[getChildrenByVendorNode](vendorNode);

        /**
         * @event DOM#setChildNodes
         * @type DOM.DebuggerNode[]
         */
        this.sendDomEvent('setChildNodes', children);
    }

    /**
     * Executes `querySelector` on a given node.
     *
     * @param {number} nodeId Id of the node to query upon.
     * @param {string} selector Selector string
     * @returns {number|undefined}
     */
    querySelector(nodeId, selector) {
        const vendorNode = this[getVendorNodeByNodeId](nodeId).querySelector(selector);
        return vendorNode ?
            this[getNodeByVendorNode](vendorNode).nodeId :
            null;
    }

    /**
     * Executes `querySelectorAll` on a given node.
     *
     * @param {number} nodeId Id of the node to query upon.
     * @param {string} selector Selector string
     * @returns {number[]}
     */
    querySelectorAll(nodeId, selector) {
        const vendorNodes = this[getVendorNodeByNodeId](nodeId).querySelectorAll(selector);
        return vendorNodes && vendorNodes.length ?
            vendorNodes.map(vendorNode => this[getNodeByVendorNode](vendorNode).nodeId) :
            [];
    }

    /**
     * Sets node name for a node with given id.
     *
     * @param {number} nodeId Id of the node to set name for.
     * @param {string} name New node's name.
     * @returns {number}
     */
    setNodeName(nodeId, name) {
        const newNode = this[getVendorNodeByNodeId](nodeId).setNodeName(name);
        return this[getNodeByVendorNode](newNode).nodeId;
    }

    /**
     * Sets node value for a node with given id.
     *
     * @param {number} nodeId Id of the node to set value for.
     * @param {string} value
     */
    setNodeValue(nodeId, value) {
        this[getVendorNodeByNodeId](nodeId).setNodeValue(value);
    }

    /**
     * Removes node with given id.
     *
     * @param {number} nodeId Id of the node to remove.
     */
    removeNode(nodeId) {
        this[getVendorNodeByNodeId](nodeId).remove();
    }

    /**
     * Sets attribute for an element with given id.
     *
     * @param {number} nodeId Id of the element to set attribute for.
     * @param {string} name Attribute name.
     * @param {string} value Attribute value.
     */
    setAttributeValue(nodeId, name, value) {
        this[getVendorNodeByNodeId](nodeId).setAttributeValue(name, value);
    }

    /**
     * Sets attributes on element with given id.
     * This method is useful when user edits some existing attribute value and types in several attribute
     * name/value pairs.
     *
     * @param {number} nodeId Id of the element to set attribute for.
     * @param {string} text Text with a number of attributes. Will parse this text using HTML parser.
     * @param {string} [name] Attribute name to replace with new attributes derived from text in case text parsed successfully.
     */
    setAttributesAsText(nodeId, text, name) {
        this[getVendorNodeByNodeId](nodeId).setAttributesAsText(text, name);
    }

    /**
     * Removes attribute with given name from an element with given id.
     *
     * @param {number} nodeId Id of the element to set attribute for.
     * @param {string} name Attribute name.
     */
    removeAttribute(nodeId, name) {
        this[getVendorNodeByNodeId](nodeId).removeAttribute(name);
    }

    /**
     * Returns node's HTML markup.
     *
     * @param {number} nodeId Id of the node to get markup for.
     * @returns {string}
     */
    getOuterHTML(nodeId) {
        return this[getVendorNodeByNodeId](nodeId).getOuterHTML();
    }

    /**
     * Sets node HTML markup, returns new node id.
     *
     * @param {number} nodeId Id of the node to set markup for.
     * @param {string} outerHTML Outer HTML markup to set.
     */
    setOuterHTML(nodeId, outerHTML) {
        return this[getVendorNodeByNodeId](nodeId).setOuterHTML(outerHTML);
    }

    /**
     * Moves node into the new container, places it before the given anchor.
     *
     * @param {number} nodeId Id of the node to move
     * @param {number} targetNodeId Id of the element to drop the moved node into
     * @param {number} [insertBeforeNodeId] Drop node before this one (if absent, the moved node becomes the last child of targetNodeId).
     * @returns {number}
     */
    moveTo(nodeId, targetNodeId, insertBeforeNodeId) {
        const vendorNode = this[getVendorNodeByNodeId](nodeId);
        const targetNode = this[getVendorNodeByNodeId](targetNodeId);
        const insertBeforeNode = this[getVendorNodeByNodeId](insertBeforeNodeId);
        const result = vendorNode.moveTo(targetNode, insertBeforeNode);
        return this[getNodeByVendorNode](result).nodeId;
    }

    /**
     * Returns attributes for the specified node.
     * (An interleaved array of node attribute names and values)
     *
     * @param {number} nodeId Id of the node to retrieve attibutes for.
     * @returns {string[]}
     */
    getAttributes(nodeId) {
        const vendorNode = this[getVendorNodeByNodeId](nodeId);
        const attributes = [];
        Object
            .entries(vendorNode.attributes)
            .forEach(([name, value]) => attributes.push(name, value));
        return attributes;
    }

    /**
     * Requests that the node is sent to the caller given the JavaScript node object reference.
     * All nodes that form the path from the node to the root are also sent to the client as a series of setChildNodes
     * notifications.
     *
     * @todo Implement DOM.requestNode
     * @param {Runtime.RemoteObjectId} objectId JavaScript object id to convert into node.
     * @returns {Promise<number>}
     */
    async requestNode(objectId) {
        const vendorNode = this.document;
        console.error('DOM.requestNode not implemented, returns document Node instead');
        return this[getNodeByVendorNode](vendorNode).nodeId;
    }

    /**
     * Resolves JavaScript node object for given node id.
     *
     * @todo Implement DOM.resolveNode
     * @param {number} nodeId Id of the node to resolve.
     * @param {string} [objectGroup] Symbolic group name that can be used to release multiple objects
     * @returns {Promise<Runtime.RemoteObject>}
     */
    resolveNode(nodeId, objectGroup) {
        const vendorNode = this[getVendorNodeByNodeId](nodeId);
        console.error('DOM.resolveNode not implemented');
        return vendorNode;
    }

    /**
     * Highlights given rectangle. Coordinates are absolute with respect to the main frame viewport.
     *
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @param {number} width Rectangle width
     * @param {number} height Rectangle height
     * @param {DOM.RGBA} [color] The highlight fill color (default: transparent).
     * @param {DOM.RGBA} [outlineColor] The highlight outline color (default: transparent).
     */
    highlightRect(x, y, width, height, color = new RGBA(0, 0,0, 0), outlineColor = new RGBA(0, 0,0, 0)) {
        this.document.highlightRect(x, y, width, height, color, outlineColor);
    }

    /**
     * Highlights DOM node with given id or with the given JavaScript object wrapper.
     * Either nodeId or objectId must be specified.
     *
     * @param {DOM.HighlightConfig} highlightConfig A descriptor for the highlight appearance.
     * @param {number} nodeId Identifier of the node to highlight.
     * @param {number} backendNodeId Identifier of the node to highlight.
     * @param {string} objectId Identifier of the node to highlight.
     */
    highlightNode(highlightConfig, nodeId, backendNodeId, objectId) {
        this.document.highlightNode(highlightConfig, nodeId, backendNodeId, objectId);
    }

    /**
     * Hides DOM node highlight.
     */
    hideHighlight() {
        this.document.hideHighlight();
    }
}

/**
 * A structure holding an RGBA color.
 *
 * @class DOM.RGBA
 */
export class RGBA {
    constructor(r, g, b, a = 1) {
        Object.assign(this, {
            /**
             * @property {number} r The red component, in the [0-255] range.
             */
            r,
            /**
             * @property {number} g The green component, in the [0-255] range.
             */
            g,
            /**
             * @property {number} b The blue component, in the [0-255] range.
             */
            b,
            /**
             * @property {number} [a] The alpha component, in the [0-1] range (default: 1).
             */
            a
        });
    }
}

/**
 * Configuration data for the highlighting of page elements.
 *
 * @class DOM.HighlightConfig
 */
export class HighlightConfig {
    constructor(config) {
        const {
            /**
             * @property {boolean} [showInfo] Whether the node info tooltip should be shown (default: false)
             */
            showInfo = false,
            /**
             * @property {boolean} [showRulers] Whether the rulers should be shown (default: false).
             */
            showRulers = false,
            /**
             * @property {boolean} [showExtensionLines] Whether the extension lines from node to the rulers should be shown (default: false)
             */
            showExtensionLines = false,
            /**
             * @property {boolean} [displayAsMaterial] Experimental
             */
            displayAsMaterial = false,
            /**
             * @property {DOM.RGBA} [contentColor] The content box highlight fill color (default: transparent).
             */
            contentColor = new RGBA(0, 0, 0, 0),
            /**
             * @property {DOM.RGBA} [paddingColor] The padding highlight fill color (default: transparent).
             */
            paddingColor = new RGBA(0, 0, 0, 0),
            /**
             * @property {DOM.RGBA} [borderColor] The border highlight fill color (default: transparent).
             */
            borderColor = new RGBA(0, 0, 0, 0),
            /**
             * @property {DOM.RGBA} [marginColor] The margin highlight fill color (default: transparent).
             */
            marginColor = new RGBA(0, 0, 0, 0),
            /**
             * @property {DOM.RGBA} [eventTargetColor] The event target element highlight fill color (default: transparent).EXPERIMENTAL
             */
            eventTargetColor = new RGBA(0, 0, 0, 0),
            /**
             * @property {DOM.RGBA} [shapeColor] The shape outside fill color (default: transparent).EXPERIMENTAL
             */
            shapeColor = new RGBA(0, 0, 0, 0),
            /**
             * @property {DOM.RGBA} [shapeMarginColor] The shape margin fill color (default: transparent).EXPERIMENTAL
             */
            shapeMarginColor = new RGBA(0, 0, 0, 0),
            /**
             * @property {string} [selectorList] Selectors to highlight relevant nodes.
             */
            selectorList = ''
        } = config;
        Object.assign(this, {
            showInfo,
            showRulers,
            showExtensionLines,
            displayAsMaterial,
            contentColor,
            paddingColor,
            borderColor,
            marginColor,
            eventTargetColor,
            shapeColor,
            shapeMarginColor,
            selectorList
        })
    }
}
