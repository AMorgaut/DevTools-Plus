
import RemoteRequest from '../../network';

export default class Request extends RemoteRequest {
    constructor(nativeRequest) {
        super(nativeRequest);
        this.data = [];
        nativeRequest
            .on('data', chunk => data.push(chunk))
            .on('end', () => Object.assign(this, { body: Buffer.concat(data) }));
    }
}
