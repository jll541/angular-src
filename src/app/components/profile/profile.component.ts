import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  emailBoolean = false;
  email: any;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    // FOR LOCAL FE TESTING
  this.user = {
      name: String,
      email: String,
      username: String,
      password: String
    }
    // FOR LOCAL FE TESTING
    // this.user.name = "test";
    // this.user.email = "test@test.com";
    // this.user.username = "test";
    // this.user.password = "test";

    this.authService.getProfile().subscribe( (profile: { user: any; }) => {
      this.user = profile.user;
    },
      (err: any) => {
      console.log(err);
      return false;
    });

  }

editEmail() {
return this.emailBoolean = !this.emailBoolean;
}

onEditEmailSubmit() {
this.authService.editEmail(this.user, this.email).subscribe( () => {},
      (err: any) => {
      console.log(err);
      return false;
    });
this.emailBoolean = !this.emailBoolean;
}

editPassword() {

}

deleteAccount(){
  
}

}
