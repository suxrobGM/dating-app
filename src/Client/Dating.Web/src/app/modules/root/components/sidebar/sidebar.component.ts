import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '@shared/models';
import {UserDataService} from '@shared/services';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public user: User | null;

  constructor(
    private userDataService: UserDataService,
    private router: Router)
  {
    this.user = null;
  }

  ngOnInit(): void {
    this.user = this.userDataService.getUser();
  }

  goToLogout() {
    this.router.navigateByUrl('/account/logout');
  }
}
