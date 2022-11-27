import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-photos-tab',
  templateUrl: './photos-tab.component.html',
  styleUrls: ['./photos-tab.component.scss'],
})
export class PhotosTabComponent implements OnInit {
  public images: ImageItem[] = [];

  constructor() {
    this.images = [
      {
        src: '/assets/image/1.jpg',
        alt: 'Image 1',
      },
      {
        src: '/assets/image/2.jpg',
        alt: 'Image 2',
      },
      {
        src: '/assets/image/3.jpg',
        alt: 'Image 3',
      },
      {
        src: '/assets/image/4.jpg',
        alt: 'Image 4',
      },
      {
        src: '/assets/image/5.jpg',
        alt: 'Image 5',
      },
    ];
  }

  ngOnInit(): void {
  }
}

interface ImageItem {
  alt: string;
  src: string;
}
