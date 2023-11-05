import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'product.component.html',
  providers: [],
})
export class ProductComponent implements OnInit {
  public href: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.href = this.router.url.slice(9);
    console.log(this.router.url);
  }
}
