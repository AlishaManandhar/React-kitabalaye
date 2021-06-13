import http from "./httpService";

const tokenKey = "token";

const apiEndpoint = "http://localhost:8000/api/";
// http.setJwt(getJwt());

export  function login(request_data) {

  let result =  http.post(apiEndpoint + 'login',request_data)
  return result

}

export async function registerUser(request_data) {
  let result = http.post(apiEndpoint + 'register',request_data)
  return result
}






export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const val = {
  login,
  getJwt,
  registerUser
};
export default val;
