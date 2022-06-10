
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import{Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { AuthService } from './../../auth/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //isAuth=false;
  isAuth$:Observable<boolean>;
  authSubscription!: Subscription;

  @Output()
sideNavToggle= new EventEmitter();

  constructor(
              private authService:AuthService,
              private store:Store<fromRoot.State>

                ) { }

  ngOnInit() {
    // this.authSubscription=this.authService.authChange.subscribe(authStatus=>{
    //   this.isAuth=authStatus;
    // })
   this.isAuth$=this.store.select(fromRoot.getIsAuth);
         
  }

  onToggleSidenav(){
    this.sideNavToggle.emit();
  }

  // ngOnDestroy(){
  //   this.authSubscription.unsubscribe();
  // }

  onLogout(){
    this.authService.logout();
  }
}
