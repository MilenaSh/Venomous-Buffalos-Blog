import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      console.log(JSON.stringify({ data: data}, null, 4));
      if(data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show( 'You are now logged in', 
        {classes: ['alert', 'alert-success'], timeout: 3000});
        window.localStorage.setItem( 'username', user.username);
        this.router.navigate(['profile']);
      } else {
        this.flashMessage.show(data.msg,
          {classes: ['alert' ,'alert-danger'], timeout: 3000});
        this.router.navigate(['profile']);
      }
    });

         
  }

}
