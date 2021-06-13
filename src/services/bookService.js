
import http from "./httpService";

const tokenKey = "token";

const apiEndpoint = "http://localhost:8000/api/book/";

http.setToken(getToken());
export  function addBook(request_data) {
  
  let result =  http.post(apiEndpoint,request_data)
  return result

}
export  function getBooks() {
  
  let result =  http.get(apiEndpoint)
  return result

}

export  function getBook(id) {
  
  let result =  http.get(apiEndpoint + id)
  return result

}

export  function deleteBook(id) {
  

  let result =  http.get(apiEndpoint + "delete/" + id)
  return result

}

export  function updateBook(request_data,id) {
  
  let result =  http.put(apiEndpoint + id,request_data)
  return result

}

export  function updateBookImage(request_data,id) {
  
  
  let result =  http.put(apiEndpoint + 'updateImage/' + id,request_data)
  return result

}



export  function getAddedBooks() {
  

  let result =  http.get(apiEndpoint + "addedBooks")
  return result

}








export function getToken() {
  return localStorage.getItem(tokenKey);
}

