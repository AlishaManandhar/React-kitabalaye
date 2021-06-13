
import http from "./httpService";

const tokenKey = "token";

const apiEndpoint = "http://localhost:8000/api/order/";

http.setToken(getToken());

export  function placeOrder(request_data) {
  
  let result =  http.post(apiEndpoint,request_data)
  return result

}

export  function getRequestedOrder() {
  
  
  let result =  http.get(apiEndpoint + 'my-orders')
  return result

}

export  function getConfirmList() {
  
  http.setToken(getToken());
  let result =  http.get(apiEndpoint + 'confirm-list')
  return result

}

export function cancelOrder(id)
{
  console.log(id)
  http.setToken(getToken());
  let result =  http.put(apiEndpoint + 'cancel/' + id)
  return result
}

export function updateSeller(request_data,id)
{
  console.log(id)
  http.setToken(getToken());
  let result =  http.put(apiEndpoint + 'respondOrder/' + id, request_data)
  return result
}

export function confirmSold(request_data,id)
{
  
  http.setToken(getToken());
  let result =  http.put(apiEndpoint + 'confirm/' + id, request_data)
  return result
}

export  function getOrdersToBeResponded() {
  
  http.setToken(getToken());
  let result =  http.get(apiEndpoint + 'responds')
  return result

}

export  function getMyBooks() {
  
  http.setToken(getToken());
  let result =  http.get(apiEndpoint + 'mybooks')
  return result

}

export function getToken() {
    return localStorage.getItem(tokenKey);
  }





