import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CardService } from '../../../services/card.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  cardForm = new FormGroup({
    cardHolder: new FormControl(''),
    cardNumber: new FormControl(''),
    cvv: new FormControl(''),
    expenseLimit: new FormControl('')
  })

  constructor(private cardService:CardService,private router:Router){

  }
  onSubmit(){
    this.cardService.add(this.cardForm.value).subscribe({
      next: data =>{
        console.log(data);
        this.router.navigate(['/card/list'])
      },
      error: err =>{
        console.log(err,'error')
      }
    })
  }
}

