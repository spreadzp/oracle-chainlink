import { Action, Selector, State, Store } from '@ngxs/store';
import { Login, Logout } from './login.action';
import { Injectable } from '@angular/core';

const init = {
  loginForm: {
  }
};

@State({
  name: 'LoginState',
  defaults: init,
})
@Injectable()
export class LoginState{
  constructor(private store: Store) {}

  @Action(Login)
  login({getState, patchState}){
    console.warn('Login');
  }


  @Action(Logout)
  Logout({getState, patchState}){
    console.warn('Logout');
    localStorage.clear();
  }
}
