import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { 
    // token with  sub set to owner of 1,2
    this.setAuthorizationToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlOTA0ZGY3MS1jMDM1LTRkYWEtOTcyYy0zMjIyYTVlMThiY2IiLCJleHAiOjE2MzY0ODAzMTUsImlzcyI6ImxvY2FsaG9zdDo1MDAwIiwiYXVkIjoiaG9zdHNpdGUuY29tIiwic3ViIjoiM2ZhODVmNjQtNTcxNy00NTYyLWIzZmMtMmM5NjNmNjZhZmE2In0.54cEnLJxBlKaQt5Kak1JBAffVAjzDgsojyhNj9lRusY")
  }

  setAuthorizationToken(token: string) {
    localStorage.setItem('token', token);
  }

  getAuthorizationToken() {
    return localStorage.getItem('token');
  }

  removeAuthorizationToken() {
    localStorage.removeItem('token');
  }

  getSubId()
  {
    let tokenstring = this.getAuthorizationToken();

    let token: Token = jwt_decode(tokenstring) as Token;

    //console.log(token);

    return token.sub;
  }
}

export class Token
{
  public sub: string;
  public exp: number;

}
