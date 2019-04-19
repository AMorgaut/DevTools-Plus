import createUuid from "uuid/v4";


class Request {
    constructor(nativeRequest) {
        Object.assign(this, {
            nativeRequest,
            requestId: createUuid(),
            timestamp: Date.now(),
        });
        Request.requests.push(this);
    }

    static getRemoteRequestById(requestId) {
        return this.requests.find(req => req.requestId === requestId);
    }
}

Object.assign(Request, {
    requests: []
});
