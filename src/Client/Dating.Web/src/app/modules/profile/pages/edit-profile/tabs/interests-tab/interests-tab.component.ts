import {Component, OnInit} from '@angular/core';
import {Interest} from '@shared/models';
import {ApiService, UserDataService} from '@shared/services';


@Component({
  selector: 'app-interests-tab',
  templateUrl: './interests-tab.component.html',
  styleUrls: ['./interests-tab.component.scss'],
})
export class InterestsTabComponent implements OnInit {
  public userInterests: Set<string>;
  public interestsList: Set<string>;
  public selectedInterest: string;
  public isBusy: boolean;

  constructor(
    private apiService: ApiService,
    private userDataService: UserDataService)
  {
    this.userInterests = new Set();
    this.interestsList = new Set();
    this.isBusy = false;
  }

  ngOnInit(): void {
    this.fetchInterestsList();
    this.fetchUserInterests();
  }

  pickInterest() {

  }

  private fetchInterestsList() {
    this.isBusy = true;

    this.apiService.getInterestsList().subscribe((result) => {
      if (result.success) {
        const interestsList = result.items!;
        interestsList.forEach((i) => this.interestsList.add(i.name));
      }

      this.isBusy = false;
    });
  }

  private fetchUserInterests() {
    const userId = this.userDataService.getUserId()!;
    this.isBusy = true;

    this.apiService.getUserInterests(userId).subscribe((result) => {
      if (result.success) {
        const interestsList = result.value!;
        interestsList.forEach((i) => this.userInterests.add(i.name));
      }

      this.isBusy = false;
    });
  }
}
