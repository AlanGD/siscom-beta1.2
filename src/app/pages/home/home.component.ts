import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  cards = [
    {
    
      img: 'assets/img/brands/burgerking-130x100.png'
    },
    {
  
      img: 'assets/img/brands/canon-130x100.png'
    },
    {
     
      img: 'assets/img/brands/cocacola-130x100.png'
    },
    {
   
      img: 'assets/img/brands/dell-130x100.png'
    },
    {
    
      img: 'assets/img/brands/harley-130x100.png'
    },
    {

      img: 'assets/img/brands/nfl-130x100.png'
    },
    {
    
      img: 'assets/img/brands/nintendo-130x100.png'
    },
    {
   
      img: 'assets/img/brands/sony-130x100.png'
    },
    {
   
      img: 'assets/img/brands/dell-130x100.png'
    },
   
  ];
  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit() {
    this.slides = this.chunk(this.cards, 3);
  }
    
  constructor() { }


}
