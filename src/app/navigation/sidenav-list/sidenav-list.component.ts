import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth-service';

import{Store} from '@ngrx/store';

import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  //isAuth=false;
  isAuth$:Observable<boolean>;
  authSubscription!: Subscription;

  @Output()
closesideNav=new EventEmitter();

  constructor(
                private authService:AuthService,
                private store:Store<fromRoot.State>) { }

  ngOnInit() {
    // this.authSubscription=this.authService.authChange.subscribe(authStatus=>{
    //   this.isAuth=authStatus;
    // })
   this.isAuth$= this.store.select(fromRoot.getIsAuth);
  }

 onClose(){
this.closesideNav.emit();
 }

 onLogout(){
  this.onClose();
  this.authService.logout();
 
}


}
