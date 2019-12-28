import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { API_URL } from '../app.constants';

export const TOKEN = "token";
export const AUTHENTICATED_USER = "authenticatedUser";

@Injectable({
  providedIn: 'root'
})

export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user===null)
  }
   
  logout(){
      sessionStorage.removeItem(AUTHENTICATED_USER);
      sessionStorage.removeItem(TOKEN);  
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken(){
    if (this.getAuthenticatedUser())  
      return sessionStorage.getItem(TOKEN)
  }

  executeHelloWorldBeanService(){
    return this.http.get<AuthenticationBean>(`${API_URL}/hello-world-bean`);
    //console.log("Execute Hello World Bean Service");
  }

  executeJWTAuthenticationService(username, password){

    return this.http.post<any>(`${API_URL}/authenticate`,{
      username,
      password
    }).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER,username);
          sessionStorage.setItem(TOKEN,`Bearer ${data.token}`);
          return data;
        }
      )  
    );
    //console.log("Execute Hello World Bean Service");
  }

  createBasicAuthenticationHttpHeader() {
    let username = 'in28minutes'
    let password = 'dummy'
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password)
    return basicAuthHeaderString;
  }

}

export class AuthenticationBean{
  constructor(public message:string) {}
}