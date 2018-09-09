import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Profile} from '../../../models/profile.model';
import {ProfileService} from '../../../services/profile.service';

@Component({
  selector: 'app-profile-edit-photos',
  templateUrl: './profile-edit-photos.component.html',
  styleUrls: ['./profile-edit-photos.component.css']
})
export class ProfileEditPhotosComponent implements OnInit {

  currentProfile: Profile;
  uploadedFiles: any[] = [];

  @Output() photoDeletedEvent = new EventEmitter<number>();
  @Output() photoSentEvent = new EventEmitter<any>();

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.currentProfile.subscribe(res => this.currentProfile = res);
  }

  onDeletePhoto(index) {
    this.currentProfile.photosUrl.splice(index, 1);
    this.profileService.updateProfile(this.currentProfile);
    this.photoDeletedEvent.emit(index);
  }

  onSelectPhotos(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  onUploadPhotos(event) {
    this.photoSentEvent.emit(true);
  }


}
