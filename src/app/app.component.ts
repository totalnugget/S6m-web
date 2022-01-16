import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web';

  public username: Promise<string>

  constructor(private keycloakService: KeycloakService, private authService: AuthService) {

    this.username = this.name()
   }
  Login()
  {
    this.keycloakService.login();
  }

  Logout()
  {
    this.keycloakService.logout();
  }

  async name(): Promise<string>
  {
    await this.keycloakService.loadUserProfile()

    if(await this.keycloakService.isLoggedIn())
    {
      this.token()


      return this.keycloakService.getUsername();
    }

    return ""
  }


  token() {
    if(this.keycloakService.getUsername() == "harry@gmail.com")
    {
      this.authService.setAuthorizationToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlOTA0ZGY3MS1jMDM1LTRkYWEtOTcyYy0zMjIyYTVlMThiY2IiLCJleHAiOjE2MzY0ODAzMTUsImlzcyI6ImxvY2FsaG9zdDo1MDAwIiwiYXVkIjoiaG9zdHNpdGUuY29tIiwic3ViIjoiM2ZhODVmNjQtNTcxNy00NTYyLWIzZmMtMmM5NjNmNjZhZmE2In0.54cEnLJxBlKaQt5Kak1JBAffVAjzDgsojyhNj9lRusY")
    }

    if(this.keycloakService.getUsername() == "bob@gmail.com")
    {
      this.authService.setAuthorizationToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlOTA0ZGY3MS1jMDM1LTRkYWEtOTcyYy0zMjIyYTVlMThiY2IiLCJleHAiOjE2MzY0ODAzMTUsImlzcyI6ImxvY2FsaG9zdDo1MDAwIiwiYXVkIjoiaG9zdHNpdGUuY29tIiwic3ViIjoiM2ZhODVmNjQtNTcxNy00NTYyLWIzZmMtMmM5NjNmNjZhZmE3In0._gNug22nfMeBNEg_tA5gCA8rIIOVDKuXxfe1UWl_dOM")
    }
  }

}