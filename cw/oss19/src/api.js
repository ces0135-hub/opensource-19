import axios from "axios";

const backendPortNumber = 3001;
// const serverUrlLocal = "http://localhost:" + backendPortNumber + "/";
// const serverUrlLocal = "http://15.165.161.12:" + backendPortNumber + "/";
const serverUrlLocal = "https://fastapi-app-vslo2r5eha-du.a.run.app/";

const serverUrlUser =
  "https://us-central1-medistep-usermanaging-server.cloudfunctions.net/api/";

async function get(endpoint, isLocal = true) {
  const serverUrl = isLocal ? serverUrlLocal : serverUrlUser;

  return axios.get(serverUrl + endpoint, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

async function get_with_params(endpoint, params = "", isLocal = true) {
  const serverUrl = isLocal ? serverUrlLocal : serverUrlUser;

  return axios.get(serverUrl + endpoint + "/" + params, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

async function post(endpoint, data, isLocal = true) {
  const serverUrl = isLocal ? serverUrlLocal : serverUrlUser;
  const bodyData = JSON.stringify(data);

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

async function postData(endpoint, data, isLocal = true) {
  const serverUrl = isLocal ? serverUrlLocal : serverUrlUser;

  return axios.post(serverUrl + endpoint, data, {
    headers: {
      "Content-Type": "multipart/form-data; boundary=myBoundary",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

// put method request with JSON.stringify()
async function put(endpoint, data, isLocal = true) {
  const serverUrl = isLocal ? serverUrlLocal : serverUrlUser;
  const bodyData = JSON.stringify(data);

  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

/**
 * Q) why is the function name "del", not a "delete?"
 *
 * "delete" is reserved keyword of JavaScript language
 * so, use "del" first, and alias to "delete" when export it
 */
async function del(endpoint, params = "", data = {}, isLocal = true) {
  const serverUrl = isLocal ? serverUrlLocal : serverUrlUser;

  return axios.delete(serverUrl + endpoint + "/" + params, {
    data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

/**
 * now we can use those methods like this :
 * api.get(), api.post(), api.put(), api.del
 *
 * if i want to request with post method to "/user/signin", with userInfo data:
 * api.post("/user/signin", userInfo) will work
 */
export { get, post, postData, put, del as delete };
