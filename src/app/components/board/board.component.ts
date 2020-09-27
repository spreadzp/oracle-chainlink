import { Component, OnInit } from '@angular/core';
import { Derivative } from 'src/app/interfaces/derivative.interface';
import { Investment } from 'src/app/interfaces/investment.interface';
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
  lastBlock = null;
  displayedInvestorsColumns: string[] = [
    'investor',
    'amount',
    'predictionPrice',
    'boardDerivatives'
  ];
  displayedColumns: string[] = [
    'nameDerivative',
    'lastBlock',
    'blockExpiration',
    'durationExpiration',
    'buy',
    'boardInvestors'
  ];
  hashActiveDerivatives: Derivative[] = [];
  investments: Investment[] = [];

  constructor(
    private boardService: BoardService,
    private showPageService: ShowPageService,
    private web3Service: Web3Service
  ) { }

  ngOnInit() {
    this.boardService.poolActiveDerivatives.subscribe((hashes) => {
      this.hashActiveDerivatives = hashes;
    });
    this.web3Service.blockObservable.subscribe(block => this.lastBlock = block);
    this.boardService.getBoardContract().subscribe((deployed) => {
      const t = deployed.then((contract) => {
        contract
          .getActiveDerivatives()
          .then((result) => {
          console.log("BoardComponent -> ngOnInit -> hash", result);

            if (result) {

              const hashes = result[0].filter(i => i !== '0x0000000000000000000000000000000000000000000000000000000000000000');
              const blocksStartExpiration = result[1].slice(0, hashes.length);
              const blocksEndExpiration = result[2].slice(0, hashes.length);
              this.boardService.setActiveDerivatives(hashes, blocksStartExpiration, blocksEndExpiration);
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
  showBoard() {
    this.showTable = !this.showTable;
  }

  showInvestments(ticket: Derivative) {
    //const investors = this.boardService.getInvestors(ticket.hash);
    this.boardService.getBoardContract().subscribe((deployed) => {
      // debounceTime(3000);
      deployed.then((contract) =>
        contract.getInvestors(ticket.hash).then((investors) => {
          console.log("BoardService -> getBoughtTickets -> tickets", investors);
          if (this.investments.length < investors[0].length) {
            for (let index = this.investments.length; index < investors[0].length; index++) {
              const investorTicket: Investment = {
                investor: investors[0][index],
                amount: investors[1][index].words[0], predictionPrice: investors[2][index].words[0]
              };
              this.investments.push(investorTicket);
              this.showBoard();
            }
          } else {
            this.showBoard();
          }


        })
      );
    });
  }
}
