import {Component, OnInit} from '@angular/core';
import {Interest} from '@shared/models';
import {ApiService} from '@shared/services';


@Component({
  selector: 'app-interests-tab',
  templateUrl: './interests-tab.component.html',
  styleUrls: ['./interests-tab.component.scss'],
})
export class InterestsTabComponent implements OnInit {
  public interests: Interest[];
  public isBusy: boolean;

  constructor(private apiService: ApiService) {
    this.interests = [];
    this.isBusy = false;
  }

  ngOnInit(): void {
    this.fetchInterestsList();
  }

  private fetchInterestsList() {
    this.isBusy = true;

    this.apiService.getInterestsList().subscribe((result) => {
      if (result.success) {
        this.interests = result.items!;
      }

      this.isBusy = false;
    });
  }
}
