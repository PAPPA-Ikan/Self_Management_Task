import { Component, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  readonly menuClick = output<void>();
  
  openMenu(): void{
    this.menuClick.emit();
  }
}
