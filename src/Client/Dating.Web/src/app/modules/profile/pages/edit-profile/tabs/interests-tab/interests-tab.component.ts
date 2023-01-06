import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Component, OnInit} from '@angular/core';
import {Interest} from '@shared/models';
import {ApiService, UserDataService} from '@shared/services';


@Component({
  selector: 'app-interests-tab',
  templateUrl: './interests-tab.component.html',
  styleUrls: ['./interests-tab.component.scss'],
})
export class InterestsTabComponent implements OnInit {
  public userInterests: Interest[];
  public interestsList: Interest[];
  public selectedInterest: string = '';
  public isBusy: boolean;

  constructor(
    private apiService: ApiService,
    private userDataService: UserDataService)
  {
    this.userInterests = [];
    this.interestsList = [];
    this.isBusy = false;
  }

  ngOnInit(): void {
    this.fetchInterestsList();
    this.fetchUserInterests();
  }

  pickInterest(event: CdkDragDrop<Interest[]>) {
    console.log(event);
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
      );
    }
  }

  private fetchInterestsList() {
    this.isBusy = true;

    this.apiService.getInterestsList().subscribe((result) => {
      if (result.success) {
        this.interestsList = result.items!;
      }

      this.isBusy = false;
    });
  }

  private fetchUserInterests() {
    const userId = this.userDataService.getUserId()!;
    this.isBusy = true;

    this.apiService.getUserInterests(userId).subscribe((result) => {
      if (result.success) {
        this.userInterests = result.value!;
      }

      this.isBusy = false;
    });
  }
}
