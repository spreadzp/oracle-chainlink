import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  showTable = true;
  isMobile = false;
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
  constructor() { }

  ngOnInit() {

  }

  buyDerivative(ticket) {
    console.log('buy ticket :>> ', ticket);
  }

  sellDerivative(ticket) {
    console.log('sell ticket :>> ', ticket);
  }
}
