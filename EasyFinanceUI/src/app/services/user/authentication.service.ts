import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl: string = `${environment.apiUrl}/api`; //'https://localhost:44398/api'
  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(Email: string, Password: string) {
      return this.http.post<any>(`${this.apiUrl}/account/login`, { Email, Password })
          .pipe(map(response => {
              // login successful if there's a jwt token in the response
              if (response && response.access_token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('access_token', JSON.stringify(response.access_token));
                  localStorage.setItem('currentUser', JSON.stringify(response.user));
                  this.currentUserSubject.next(response.user);
              }

              return response.user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      localStorage.removeItem('access_token');
      this.currentUserSubject.next(null);
  }
}