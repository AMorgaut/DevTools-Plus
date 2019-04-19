// import './web-components/network-log-grid/template.html';

const [form] = document.forms;
const logTBody = document.querySelector('.network-log-grid tbody');
const requestViewPane = document.querySelector('.request-view');
const [generalView, responseHeaderView, requestHeaderView] = requestViewPane.querySelectorAll('ul');
const [urlView, methodView, statusView] = generalView.querySelectorAll('li var');

function init() {
    Object.assign(globalThis, {
        async criRequest(options, callback) {
            try {
                const { path, host, port, secure } = options;
                const s = secure ? 's' : '';
                const response = await fetch(`http${s}://${host}:${port}${path}`);
                callback(null, await response.text());
            } catch (error) {
                callback(error);
            }
        }
    });
    CDP({ port:8230 });
}

init();

form.addEventListener('submit', async function submitRequest(event) {
    event.preventDefault();
    const {
        method: { value: method },
        url: { value: url },
        // headerName, headerValue, body
    } = form.elements;
    let request;
    let response;
    try {
        request = new Request(url, { method });
        response = await fetch('http://localhost:8081', {
            method: 'POST', body: JSON.stringify({ method, url })
        });
        log(request, response);
    } catch (error) {
        console.error(error);
        log(request, { ...error, status: 200 });
    }

    return false
});

function log(request, response) {
    const row = document.createElement('TR');
    const col = document.createElement('TD');
    const url = request.url.split('/').pop() || request.url;

    Object.assign(col, { request, response });

    col.append(url);
    row.appendChild(col);
    logTBody.appendChild(row);
}

logTBody.addEventListener('click', function showRequestDetails(event) {
    console.log(event);
    const { request, response } = event.target;
    // General
    urlView.innerText = request.url;
    methodView.innerText = request.method;
    statusView.innerText = response.status;
    // Response
    fillHeadersInfo(responseHeaderView, response.headers);
    // Request
    fillHeadersInfo(requestHeaderView, request.headers);
});

function fillHeadersInfo(list, headers) {
    for (let child of list.childNodes) {
        list.removeChild(child);
    }
    for (let [name, value] of headers) {
        const li = document.createElement('LI');
        const strong = document.createElement('STRONG');
        const val = document.createElement('VAR');
        strong.innerText = `${name}:`;
        val.innerText = value;
        li.appendChild(strong);
        li.append(' ');
        li.appendChild(val);
        list.appendChild(li);
    }
}
