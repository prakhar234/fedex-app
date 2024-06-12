import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private router: Router){}
  isAuthenticated = false;
  userSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(({
      next: (user: IUser | null) => {
        this.isAuthenticated = !!user;
      }
    }));
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/signup']);
  }

  ngOnDestroy(): void {
    if(this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
