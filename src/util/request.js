import axios from "axios";
import { cloneDeep, isEmpty } from "lodash";
import pathToRegexp from "path-to-regexp";
import qs from "qs";
import { TOKEN_NAME } from "./constants";

const { CancelToken } = axios;
window.cancelRequest = new Map();

export default function request(options) {
  let { data, url, method = "get" } = options;
  let cloneData = cloneDeep(data);
  try {
    let domain = "";
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/);
    if (urlMatch) {
      [domain] = urlMatch;
      url = url.slice(domain.length);
    }

    const match = pathToRegexp.parse(url);
    url = pathToRegexp.compile(url)(data);

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    url = domain + url;
  } catch (e) {}
  data = data ? data : { path: "" };
  options.url =
    method.toLocaleLowerCase() === "get"
      ? data.path
        ? `${url}${isEmpty(cloneData) ? "" : "/"}${cloneData.path}`
        : `${url}${isEmpty(cloneData) ? "" : "?"}${qs.stringify(cloneData)}`
      : url;
  if (method.toLocaleLowerCase() === "delete")
    options.url =
      method.toLocaleLowerCase() === "delete"
        ? `${url}${isEmpty(cloneData) ? "" : "/"}${cloneData.id}`
        : url;
  if (method.toLocaleLowerCase() === "put" && cloneData.path)
    options.url = `${url}${isEmpty(cloneData) ? "" : "/"}${cloneData.path}`;
  if (method.toLocaleLowerCase() === "patch" && cloneData.path)
    options.url = `${url}${isEmpty(cloneData) ? "" : "/"}${cloneData.path}`;
  options.cancelToken = new CancelToken((cancel) => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    });
  });
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem(TOKEN_NAME);
  axios.defaults.baseURL = "http://localhost:5000";
  // axios.defaults.baseURL = "https://ark-logistics.uz";
  try {
    if (data.fileUpload) {
      options.headers = {
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      if (data.file.length > 1) {
        Array.from(data.file).forEach((file, i) => {
          formData.append(file.name, file.file[0]);
        });
      } else {
        formData.append("file", data.file[0]);
      }
      delete data.file;
      formData.append("type", data.type);
      Object.keys(data).forEach((i) => formData.append(i, data[i]));
      options.data = formData;
    }
  } catch (e) {}
  return axios(options)
    .then((response) => {
      const { statusText, status, data } = response;
      let result = {};
      if (typeof data === "object") {
        result = data;
        if (Array.isArray(data)) {
          result.list = data;
        }
      } else {
        result.data = data;
      }
      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...result,
      });
    })
    .catch((error) => {
      const { response } = error;
      let msg;
      let statusCode;
      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;
        msg = data.message || statusText;
      } else {
        statusCode = 600;
        msg = error.message || "Network Error";
      }
      /* eslint-disable */
      return Promise.resolve({
        success: false,
        statusCode,
        message: msg,
      });
    });
}
