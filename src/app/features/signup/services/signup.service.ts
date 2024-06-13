import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  IUser,
  User,
  UserAlbum,
} from '../../../shared/interfaces/user.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private authUrl = environment.authUrl;
  constructor(private http: HttpClient) {}

  getThumbnailUrl(length: number): Observable<string> {
    return this.http
      .get<UserAlbum>(`${this.authUrl}/photos/${length}`)
      .pipe(map((response) => response.thumbnailUrl));
  }

  submitUser(userData: User): Observable<any> {
    return this.http.post<IUser>(`${this.authUrl}/users`, userData);
  }
}
