import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  changeTab(event: {index: number}) {
    const index = event.index;
    let link = '';

    switch (index) {
      case 0:
        link = '/profile/edit';
        break;
      case 1:
        link = '/profile/photos';
        break;
      case 2:
        link = '/profile/interests';
        break;
      case 3:
        link = '/profile/security';
        break;
    }

    this.router.navigateByUrl(link);
  }
}
