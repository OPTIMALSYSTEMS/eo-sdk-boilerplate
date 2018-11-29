import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DmsService} from '@eo-sdk/core';
import {GalleryItem, ImageItem} from '@ngx-gallery/core';

@Component({
  selector: 'eo-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  static id = 'eo.custom.state.gallery';
  static path = 'custom/gallery';
  // to hide link from sidebar-navigation just change matchType to non existing state
  static matchType = new RegExp('sidebar-navigation.no-link');

  images: GalleryItem[] = [];

  constructor(private route: ActivatedRoute, private dmsService: DmsService) {
  }

  ngOnInit() {

    const files = (this.route.snapshot.queryParams['files'] || '').split(',');

    this.images = files.map(id => new ImageItem({
        src: this.dmsService.getPreview(id),
        thumb: this.dmsService.getSlide(id)
      }));
  }

}
