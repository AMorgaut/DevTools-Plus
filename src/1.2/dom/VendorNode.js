'use strict';

import RemoteNode from './RemoteNode';

const { NODE_TYPES } = RemoteNode;

/**
 * Abstract Vendor Node
 * Implementations are meant to extend this abstract class
 *
 * @abstract
 * @class DOM.VendorNode
 */
export default class VendorNode {

    /**
     * @constructor
     * @param {number} type DOM Node Type
     * @param data
     */
    constructor(type, data) {
        if (!Object.values(NODE_TYPES).includes(type)) {
            throw new TypeError(`Invalid Node Type: ${type}. It must be a valid DOM4 Node Type value.`)
        }
        this.nodeType = type;

        /**
         * @private
         * @property {Object} _data
         */
        this._data = data;
    }

    /**
     * Executes `querySelector` on the given node.
     *
     * @abstract
     * @param {string} selector Selector string
     * @returns {DOM.VendorNode}
     */
    querySelector(selector) {
        throw new Error('Not Implemented');
    }

    /**
     * Executes `querySelectorAll` on the given node.
     *
     * @abstract
     * @param {string} selector Selector string
     * @returns {DOM.VendorNode[]}
     */
    querySelectorAll(selector) {
        throw new Error('Not Implemented');
    }

    /**
     * Sets node name.
     *
     * @abstract
     * @param {string} name New node's name.
     * @returns {DOM.VendorNode}
     */
    setNodeName(name) {
        throw new Error('Not Implemented');
    }

    /**
     * Sets node value.
     *
     * @abstract
     * @param {string} value New node's value.
     */
    setNodeValue(value) {
        throw new Error('Not Implemented');
    }

    /**
     * Removes node with given id.
     *
     * @abstract
     */
    remove() {
        throw new Error('Not Implemented');
    }

    /**
     * Sets attribute on the element.
     *
     * @abstract
     * @param {string} name Attribute name.
     * @param {string} value Attribute value.
     */
    setAttributeValue(name, value) {
        throw new Error('Not Implemented');
    }

    /**
     * Sets attributes on the element.
     * This method is useful when user edits some existing attribute value and types in several attribute
     * name/value pairs.
     *
     * @abstract
     * @param {string} text Text with a number of attributes. Will parse this text using HTML parser.
     * @param {string} [name] Attribute name to replace with new attributes derived from text in case text parsed successfully.
     */
    setAttributesAsText(text, name) {
        throw new Error('Not Implemented');
    }

    /**
     * Removes attribute with given name from the element.
     *
     * @abstract
     * @param {string} name Attribute name.
     */
    removeAttribute(name) {
        throw new Error('Not Implemented');
    }

    /**
     * Returns node's HTML markup.
     *
     * @abstract
     * @returns {string}
     */
    getOuterHTML() {
        throw new Error('Not Implemented');
    }

    /**
     * Sets node HTML markup, returns new node id.
     *
     * @abstract
     * @param {string} outerHTML Outer HTML markup to set.
     */
    setOuterHTML(outerHTML) {
        throw new Error('Not Implemented');
    }

    /**
     * Moves node into the new container, places it before the given anchor.
     *
     * @param {number} targetNode the element to drop the moved node into
     * @param {number} [insertBeforeNode] Drop node before this one (if absent, the moved node becomes the last child of targetNode).
     * @returns {number}
     */
    moveTo(targetNode, insertBeforeNode) {
        throw new Error('Not Implemented');
    }
}

Object.assign(VendorNode, { NODE_TYPES });
