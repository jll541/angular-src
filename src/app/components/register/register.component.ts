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
  errorMessage = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    if (this.name === undefined || this.name === "" || this.email === undefined || this.email === ""  || this.password === undefined || this.password === "" || this.username === undefined || this.username === "") {
      this.success = false;
      setTimeout(()=>{                           //<<<---using ()=> syntax
        this.success = true;
   }, 3000); 
    } else if ( !(this.email.includes("@")) || !(this.email.endsWith(".com") || this.email.endsWith(".co.uk") || this.email.endsWith(".ac.uk"))) {
    this.errorMessage = "Invalid Email Address!";
    setTimeout(()=>{                           //<<<---using ()=> syntax
      this.errorMessage = "";
    }, 3000); 
    } else {
      // this.isValid = true;
      const user = {
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password
      }
      this.authService.checkUserExists(user).subscribe(data => {
        if ((data as any) ) {
          console.log(user, data ,"user exists")
        } else {
        console.log("user doesnt exist");  
        }
      });  
      // this.authService.authenticateUser(user).subscribe(data => {
      //   console.log((data as any).username ,user.usern1ame, this.username);
      //   console.log((data as any).email ,user.email, this.username);
      //   if ((data as any).username === user.username) {
      //     this.errorMessage = "That username is taken, please try a different one!";
      //   } else if ((data as any).email === user.email) {
      //     this.errorMessage = "That email is already associated with an account, try logging in instead!"
      //   } else {
          this.authService.registerUser(user).subscribe(data => {
            if ((data as any).success) {
              this.success = true;
              this.router.navigate(['/login']);
            } else {
              this.router.navigate(['/register']);
              this.success = false;
            }
          });
        // }
        // setTimeout(()=>{                           //<<<---using ()=> syntax
        //   this.errorMessage = "";
        // }, 3000);

      // });
  
  
      
    }

  }
}
