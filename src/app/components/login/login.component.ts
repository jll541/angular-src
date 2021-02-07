import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {
    console.log(this.username)
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);
      if ((data as any).success) {
        // show success message
        this.authService.storeUserData((data as any).token, (data as any).user);
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
