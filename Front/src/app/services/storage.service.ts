import { Injectable } from '@angular/core';
import { cibWindows } from '@coreui/icons';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(){
    window.sessionStorage.clear();
  }
  public saveUser(user:any):void {
    window.sessionStorage.removeItem('auth')
    window.sessionStorage.setItem('auth',JSON.stringify(user))
  }
  
  public getUser():any {
    const user = window.sessionStorage.getItem('auth')
    if(user){
      return JSON.parse(user);
    }
  }
  public getToken():string {
    const stringifyUser:any = window.sessionStorage.getItem('auth');
    if(stringifyUser){
      const user = JSON.parse(stringifyUser);
      const token = user.token;
      return token;
    }else{
      return "";
    }
  }
}
