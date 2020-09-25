import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HighchartsChartModule } from 'highcharts-angular';
import { NouisliderModule } from 'ng2-nouislider';
import {MatInputModule} from '@angular/material/input';
// import {
//   MatButtonModule,
//   MatCardModule,
//   MatFormFieldModule,
//   MatInputModule,
//   MatToolbarModule,
//   MatSidenavModule,
//   MatListModule,
//   MatIconModule,
//   MatSnackBarModule
// } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BalanceComponent } from './components/balance/balance.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { IconProviderService } from './services/icon-provider.service';
import { PriceService } from './services/price.service';
import { PriceComponent } from './components/price/price.component';
import { HttpClientModule } from '@angular/common/http';
import { BoardComponent } from './components/board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoComponent } from './components/info/info.component';
import { RulesComponent } from './components/rules/rules.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { ShowPageService } from './services/show-page.service';
import { CabinetComponent } from './components/cabinet/cabinet.component';
import { ManageDerivativeComponent } from './components/manage-derivative/manage-derivative.component';
import { HelloComponent } from './components/hello/hello.component';
import { LoginComponent } from './components/login/login.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { LoginState } from './components/login/login.state';
import { PriceStore } from './state/price.state';
import { TradeBoardStore } from './state/trade-board.state';
import { ChartComponent } from './components/chart/chart.component';
import { StakingComponent } from './components/staking/staking.component';
import { SliderComponent } from './components/slider/slider.component';
import { EarnChartComponent } from './components/earn-chart/earn-chart.component';
import { StakeService } from './services/stake.services';
import { RangeService } from './services/range.service';
import { Web3Service } from './services/web3.service';
import { BoardService } from './services/board.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    BalanceComponent,
    NotFoundComponent,
    PriceComponent,
    BoardComponent,
    InfoComponent,
    RulesComponent,
    StatisticComponent,
    ExchangeComponent,
    CabinetComponent,
    ManageDerivativeComponent,
    HelloComponent,
    LoginComponent,
    ChartComponent,
    StakingComponent,
    SliderComponent,
    EarnChartComponent,
    // HighchartsChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    NgxsModule.forRoot([LoginState, PriceStore, TradeBoardStore]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    HighchartsChartModule,
    NouisliderModule
  ],
  providers: [IconProviderService, PriceService, ShowPageService, StakeService, RangeService, Web3Service, BoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
