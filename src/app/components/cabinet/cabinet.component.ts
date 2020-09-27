import { Component, OnInit} from '@angular/core';
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
  expirationBlock = null;
  activeAccount = '';

  constructor(private boardService: BoardService, private web3Service: Web3Service) { }

  ngOnInit() {

    this.web3Service.activeAccount.subscribe(account => this.activeAccount = account);
    this.expirationBlock = new FormControl();

  }

  onAmountChange(nameVariable: string, data: FormControl) {
    this[nameVariable] = data.value;
    console.log(`${nameVariable}: `, this[nameVariable], 'value', data);
    // this.tokens = this.amount.value;
    // console.log('this.tokens :>> ', this.tokens);
  }

  createDerivative() {
    this.boardService.getBoardContract().subscribe((deployed) => {
console.log('this.expirationBlock :>> ', this.expirationBlock);
      const t = deployed.then((contract) => {
        contract.createNewDerivative(this.expirationBlock, { from: this.activeAccount, gas: 600000 })
          .then((hash) => {
            const logs = hash.logs[0].args[0];
            this.boardService.setHash(logs);
          }

          );
      });
    });
  }
}
