import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation-demo',
  templateUrl: './animation-demo.component.html',
  styleUrls: ['./animation-demo.component.css'],
  animations:[
    trigger('openClose',[
      state('open',style(
        {
          height:'0px',
          backgroundColor:'green'
        }
      )),

      state('close',style(
        {
          height:'5px',
          backgroundColor:'red'
        }
      )),

      transition('open=>close',[
        animate('5s')
      ]),

      transition('close=>open',[
        animate('3s')
      ])
      

    ])
  ]
})
export class AnimationDemoComponent implements OnInit {

  isOpen=true

  constructor() { }

  ngOnInit(): void {
  }

  toggle()
  {
    this.isOpen = !this.isOpen
  }

}
