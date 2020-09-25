import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BalanceComponent } from './components/balance/balance.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BoardComponent } from './components/board/board.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { ManageDerivativeComponent } from './components/manage-derivative/manage-derivative.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'balance', component: BalanceComponent},
  { path: 'statistic', component: StatisticComponent },
  {path: 'board', component: BoardComponent},
  {path: 'md', component: ManageDerivativeComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
