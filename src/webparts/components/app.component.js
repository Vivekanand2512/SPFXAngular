var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
let AppComponent = class AppComponent {
    constructor() {
        this.title = '';
        this.description = '';
        this.clicked = false;
    }
    ngOnInit() {
        console.log('Angular component initialized');
    }
    onClick() {
        this.clicked = true;
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], AppComponent.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], AppComponent.prototype, "description", void 0);
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        template: `
    <div class="welcome">
      <h2>Welcome to {{title}}!</h2>
      <p>{{description}}</p>
      <button (click)="onClick()">Click me</button>
      <p *ngIf="clicked">Button was clicked!</p>
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
], AppComponent);
export { AppComponent };
