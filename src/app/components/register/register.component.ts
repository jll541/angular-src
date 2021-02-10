import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router,  ActivatedRoute, ParamMap } from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name!: String;
  username!: String;
  email!: String;
  password!: String;
  success = true;
  // isValid = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    console.log("TEST");
    console.log("test", this.name);
    if (this.name === undefined || this.email === undefined || this.password === undefined || this.username === undefined) {
      this.success = false;
    } else {
      // this.isValid = true;
      const user = {
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password
      }
  
      console.log(user);
      this.authService.registerUser(user).subscribe(data => {
        if ((data as any).success) {
          this.success = true;
          console.log("success");
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/register']);
          this.success = false;
          console.log("could not register", data);
        }
      });
    }

  }
}
