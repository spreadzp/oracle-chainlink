import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BoardService } from 'src/app/services/board.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  showTable = true;
  isMobile = false;
  nameDerivative = null;
  expirationPrice = null;
  expirationBlock = null;
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
  activeAccount = '';
  constructor(private boardService: BoardService, private web3Service: Web3Service) { }

  ngOnInit() {
    this.web3Service.activeAccount.subscribe(account => this.activeAccount = account);
    this.nameDerivative = new FormControl();
    this.expirationPrice = new FormControl();
    this.expirationBlock = new FormControl();

  }

  buyDerivative(ticket) {

  }

  sellDerivative(ticket) {
    console.log('sell ticket :>> ', ticket);
  }




  onAmountChange(nameVariable: string, data: FormControl) {
    this[nameVariable] = data.value;
    console.log(`${nameVariable}: `, this[nameVariable], 'value', data);
    // this.tokens = this.amount.value;
    // console.log('this.tokens :>> ', this.tokens);
  }

  createDerivative() { 
    this.boardService.getBoardContract().subscribe((deployed) => {

      const t = deployed.then((contract) => {
        console.log("CabinetComponent -> createDerivative -> contract", contract)
        contract.createNewDerivative(this.expirationBlock, { from: this.activeAccount, gas: 600000 })
          .then((hash) => {
            const logs = hash.logs[0].args[0];
            console.log("BoardComponent -> buyDerivative -> result", logs);
            this.boardService.setHash(logs);
          }

          );
      });
      console.log('t :>> ', t);
    });
  }
}
