import {Component, OnInit} from '@angular/core';
import {Interest} from '@shared/models';

@Component({
  selector: 'app-interests-form',
  templateUrl: './interests-form.component.html',
  styleUrls: ['./interests-form.component.scss'],
})
export class InterestsFormComponent implements OnInit {
  public interests: Interest[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
