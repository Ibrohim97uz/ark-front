import request from 'util/request'
import {apiPrefix} from 'util/config'

const ApiRequest = (path, data) => {
    let url = apiPrefix + path;
    let method = 'GET';
    const paramsArray = path.split(' ');
    if (paramsArray.length === 2) {
        method = paramsArray[0];
        url = apiPrefix + paramsArray[1]
    }
    return request({
        url,
        data,
        method,
    });
};
export default ApiRequest
