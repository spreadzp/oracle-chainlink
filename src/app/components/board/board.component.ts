import { Component, OnInit } from '@angular/core';
import { Derivative } from 'src/app/interfaces/derivative.interface';
import { BoardService } from 'src/app/services/board.service';
import { ShowPageService } from 'src/app/services/show-page.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  showTable = true;
  isMobile = false;
  activeAccount = '';
  displayedColumns: string[] = [
    'nameDerivative',
    'blockExpiration',
    'durationExpiration',
    'buy',
  ];
  hashActiveDerivatives: Derivative[] = [];

  constructor(
    private boardService: BoardService,
    private showPageService: ShowPageService
  ) { }

  ngOnInit() {
    this.boardService.poolActiveDerivatives.subscribe((hashes) => {
      this.hashActiveDerivatives = hashes;
    });
    this.boardService.getBoardContract().subscribe((deployed) => {
      const t = deployed.then((contract) => {
        contract
          .getActiveDerivatives()
          .then((hash) => {

            if (hash) {
              const notEmpty = hash.filter(i => i !== '0x0000000000000000000000000000000000000000000000000000000000000000');
              this.boardService.setActiveDerivatives(notEmpty);
            }

          });
      });
    });
  }

  buyDerivative(ticket: Derivative) {
    this.boardService.setActiveDerivative(ticket);
    this.showPageService.changeStatusPage('md');
    console.log('this.activeAccount :>> ', this.activeAccount);
  }

  sellDerivative(ticket) {
    console.log('sell ticket :>> ', ticket);
  }
}
