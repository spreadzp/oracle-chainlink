import { Component, OnInit, AfterViewChecked, Input } from '@angular/core';
import { ShowPageService } from 'src/app/services/show-page.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewChecked {

  opened: boolean;
  JackPot: any;
  owner = '';
  activeAccount = '';
  @Input() nubmerGame: string;
  constructor(
    private matSnackBar: MatSnackBar,
    private showPageService: ShowPageService
  ) {}

  ngOnInit(): void {
   //  this.setOwner();
  }
  ngAfterViewChecked() {
    // this.isOwner();
  }
  isOwner() {
    // return this.owner.toLowerCase() === this.activeAccount.toLowerCase();
  }
  setOwner() {
  }

  startJackPot() {
  }
  changePage(page: string) {
    this.showPageService.changeStatusPage(page);
  }

}
