import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit,OnDestroy {
  data:any[] = []
  constructor(private cardService:CardService){

  }
  ngOnInit(): void {
    this.load();  
  }

  load(){
    this.cardService.get().subscribe((response:any) => {
      this.data = response.data
    })
  }
  isDelete(){
    console.log('test');
  }
  ngOnDestroy(): void {
    
  }

}
