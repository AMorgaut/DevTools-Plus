
import template from './template.html';

class NetworkLogGrid extends HTMLElement {
    static get template() {
        return template;
    }
    constructor(){
        super();
    }
}

export default NetworkLogGrid;
