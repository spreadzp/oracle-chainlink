import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  isSticky = false;
  @HostListener('mouseover')
  mouseover() {
    this.isSticky = false;
  }

  @HostListener('mouseout')
  mouseout() {
    this.isSticky = true;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
