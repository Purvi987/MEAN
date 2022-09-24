import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor( private formBuilder: FormBuilder,
  public authenticationService: AuthenticationService,
  private toastrService: ToastrService,
  private router: Router,
  private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

   // convenience getter for easy access to form fields
   get form() { return this.registrationForm.controls; }

   onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registrationForm.invalid) {
        return;
    }
    this.loading = true;
    const user : User = {
      username: this.registrationForm.value.username,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
    }
    this.authenticationService.registerUser(user).subscribe((response: any) => {
        if(response){
          this.toastrService.success(response.message);
          this.router.navigate(['/auth/login']);
        }
    },
    (error) => {
      this.loading = false;
    })
   }
}
