import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; //for the sake of reactive form handeling


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rForm: FormGroup;
  post: any;
  description: string = '';  //Empty for entialization 
  name: string = '';
  titleAlert:string = 'This field is required';
  

  constructor(fb: FormBuilder){
    this.rForm = fb.group({
        'name' :[null, Validators.required] ,      //in case the check box that will be defined down there is validated
        'description' :[null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(1000)])] ,
        'validate' : ''  //check box
    }); 
  }

  addPost(post){                                         //After Submition, the second page that will be served 
    this.description = post.description;
    this.name = post.name;
  }

  ngOnInit() {
    this.rForm.get('validate').valueChanges.subscribe(

      (validate) => {

          if (validate == '1') {
              this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
              this.titleAlert = 'You need to specify at least 3 characters';
          } else {
              this.rForm.get('name').setValidators(Validators.required);
          }
          this.rForm.get('name').updateValueAndValidity();

      });
  }

}

