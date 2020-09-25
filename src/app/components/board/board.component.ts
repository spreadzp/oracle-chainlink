import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  showTable = true;
  isMobile = false;
  activeAccount = '';
  displayedColumns: string[] = ['nameDerivative', 'expirationPrice', 'currentPrice', 'blockExpiration', 'timeExpiration', 'deposit', 'buy', 'sell'];
  gamersTickets = [
    {
      nameDerivative: 'fgj', expirationPrice: 55,
      currentPrice: 45, blockExpiration: 123456, timeExpiration: new Date(), deposit: 50
    },
    {
      nameDerivative: 'fgj', expirationPrice: 65,
      currentPrice: 45, blockExpiration: 123886, timeExpiration: new Date(), deposit: 56
    }
  ];
  constructor(
              private boardService: BoardService, private web3Service: Web3Service) { }

  ngOnInit() {
// this.iconProviderService.getDerivative().then(res => this.gamersTickets = res);
this.web3Service.activeAccount.subscribe(account => this.activeAccount = account);
}

  buyDerivative(ticket) {
    console.log('buy ticket :>> ', ticket);
    console.log('this.activeAccount :>> ', this.activeAccount);
    this.boardService.getBoardContract().subscribe((deployed) => {
      const t = deployed.then((contract) => {
        contract.createNewDerivative(123, {from: this.activeAccount, gas: 600000})
        .then((result) =>
          console.log("BoardComponent -> buyDerivative -> result", result)
        );
    });
  });
}

  sellDerivative(ticket) {
    console.log('sell ticket :>> ', ticket);
  }
}
