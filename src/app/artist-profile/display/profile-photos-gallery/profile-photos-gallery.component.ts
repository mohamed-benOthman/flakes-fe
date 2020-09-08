import { Component, OnInit } from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery-9';
import {Profile} from '../../../models/profile.model';
import {ProfileService} from '../../../services/profile.service';

@Component({
  selector: 'app-profile-photos-gallery',
  templateUrl: './profile-photos-gallery.component.html',
  styleUrls: ['./profile-photos-gallery.component.css']
})
export class ProfilePhotosGalleryComponent implements OnInit {

  currentProfile: Profile;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.currentDisplayedProfile.subscribe(res => {
      this.currentProfile = res;
      this.galleryImages = [];
      for (const img of this.currentProfile.photosUrl) {
        this.galleryImages.push({small: img.url, medium: img.url, big: img.url});
      }
    });

    this.galleryOptions = [
      {width: '100%', height: '480px', thumbnailsColumns: 4, imageAnimation: NgxGalleryAnimation.Slide,
        previewCloseOnClick: true, previewCloseOnEsc: true,
        imageAutoPlay: true, imageAutoPlayInterval: 5000, imageAutoPlayPauseOnHover: true
      },
      {breakpoint: 800, width: '100%', height: '600px', imagePercent: 80, thumbnailsPercent: 10,
        thumbnailsMargin: 20, thumbnailMargin: 20
      },
      {breakpoint: 400, preview: false}
    ];


  }

  deleteFromGallery(index) {
    this.galleryImages.splice(index, 1);
  }

}
