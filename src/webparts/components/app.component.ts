import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="welcome">
      <h2>Welcome to {{title}}!</h2>
      <p> {{description}}</p>
      <button (click)="onClick()">Click me</button>
      <p *ngIf="clicked">Button was clicked!</p>
          <app-child></app-child>
    </div>


  `,
  styles: [`
    .welcome {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    button {
      background-color: #0078d4;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 3px;
      cursor: pointer;
    }
  `]
})
export class AppComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  clicked: boolean = false;
  ngOnInit() {
    console.log('Angular component initialized');
  }

  onClick() {
    this.clicked = true;
  }
}