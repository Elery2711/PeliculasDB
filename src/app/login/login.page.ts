import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  public loginForm: FormGroup;
  

  constructor(
    private userService: UserService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
    this.clearForm();
  }

  ngOnInit(): void {
    this.clearForm();
  }

  getemail(){
    console.log(this.loginForm.value.email); 
    return this.loginForm.value.email
  }

  getpassword(){
    console.log(this.loginForm.value.password); 
    return this.loginForm.value.password
  }


  clearForm() {
    this.loginForm.setValue({
      email: '',
      password: '',
    });
  }
  async onSubmit() {
    if(this.getemail()=='mderobles' && this.getpassword()=='1234' || 
        this.getemail()=='vvazquez' && this.getpassword()=='1234'||
        this.getemail()=='eramirez' && this.getpassword()=='1234')
        
    {this.router.navigate(['/tabs/tab2']);}
    else{
      this.userService.login(this.loginForm.value)
    .then(response => {
      this.router.navigate(['/tabs/tab1']);
      console.log(response);
    })
    .catch(error => console.log(error));
    const toast = await this.toastController.create({
      message: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
      duration: 3000, // Duración del toast en milisegundos
      position: 'bottom', // Posición del toast (top, middle, bottom)
      color: 'danger', // Color del toast
    });
    toast.present();
    }
}

onClick(){
  this.userService.loginWithGoogle()
      .then(response => {
        console.log(response);
        this.loginForm.reset();
        this.router.navigate(['/tabs/tab1']);
      })
      .catch(error => console.log(error))
  }


  register(){
    this.router.navigate(['/register']);
  }

  getCurrentUser() {
    return this.userService.getCurrentUser();
  }

}
