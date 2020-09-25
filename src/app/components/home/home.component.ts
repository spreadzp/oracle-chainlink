import { Component, OnInit } from '@angular/core';
import { ShowPageService } from 'src/app/services/show-page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  JackPot: any;
  activePage = 'home';
  opened = false;
  lotteryNumber = 1;
  activeAccount = '';

  constructor(
    private showPageService: ShowPageService
  ) {}

  ngOnInit(): void {
    this.showPageService.getStatusPage().subscribe(namePage =>  this.activePage = namePage);

  }
}
