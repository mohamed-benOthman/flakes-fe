import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Profile} from '../../../models/profile.model';
import {ProfileService} from '../../../services/profile.service';
import {HttpClient} from '@angular/common/http';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-profile-edit-photos',
  templateUrl: './profile-edit-photos.component.html',
  styleUrls: ['./profile-edit-photos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileEditPhotosComponent implements OnInit {

  PHOTO_MAX_SIZE = 1_000_000;
  MAX_PHOTOS = 3;
  isPhotoValid = true;

  currentProfile: Profile;
  files: File[] = []; // photos selectionnées pour l'envoi
  photosUrl = []; // url des photos selectionnées pour l'envoi

  /********************
   * PARAMETRES SERVEUR
   ********************/
  serverURL = 'http://82.165.253.223:3000/files/upload';
  serverParam = 'avatar1';
  isUploading = false;


  @Output() photoDeletedEvent = new EventEmitter<number>();
  @Output() photoSentEvent = new EventEmitter<any>();
  @Output() uploadingEvent = new EventEmitter<any>();

  constructor(private profileService: ProfileService, private http: HttpClient) {
  }

  ngOnInit() {
    this.profileService.currentProfile.subscribe(res => this.currentProfile = res);
  }

  resetAll() {
    this.files = [];
    this.photosUrl = [];
    this.isPhotoValid = true;
    this.isUploading = false;
  }

  onDeletePhoto(index) {
    this.currentProfile.photosUrl.splice(index, 1);
    this.profileService.updateProfile(this.currentProfile);
    this.photoDeletedEvent.emit(index);
  }

  onImageAdded(event) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > this.PHOTO_MAX_SIZE) {
        this.isPhotoValid = false;
      } else {
        if (!this.files) {
          this.files = [];
        }
        if (!this.photosUrl) {
          this.photosUrl = [];
        }

        this.isPhotoValid = true;
        this.files.push(event.target.files[0]);

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (evn: Event) => { // called once readAsDataURL is completed
          this.photosUrl.push(reader.result);
        };
      }
    }
  }

  /*onUploadPhotos() {
    console.log('onUploadPhotos event');
    // this.photoSentEvent.emit(true);

    const uploadData = new FormData();
    for (const file of this.files) {
      uploadData.append(this.serverParam, file, file.name);
    }
    this.http.post(this.serverURL, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('progress = ' + JSON.stringify(event));
          console.log('progress: ' + Math.round(event.loaded / event.total * 100) + ' %');
        } else if (event.type === HttpEventType.Response) {
          console.log('response = ' + JSON.stringify(event));
        }
      });
  }*/

  onUploadPhotos() {
    console.log('onUploadPhotos event');
    this.uploadingEvent.emit(true);

    const observables = [];
    for (const file of this.files) {
      const uploadData = new FormData();
      uploadData.append(this.serverParam, file, file.name);
      observables.push(this.http.post(this.serverURL, uploadData));
    }

    forkJoin(observables).subscribe(results => {
      console.log('response = ' + JSON.stringify(results));
      if (results && results.length > 0) {
        for (const photo of results) {
          this.currentProfile.photosUrl.push(photo);
        }
      }
      this.profileService.updateProfile(this.currentProfile);
      this.uploadingEvent.emit(false);
      this.resetAll();
    }, error1 => this.uploadingEvent.emit(false));
  }

  removePhoto(position) {
    this.photosUrl.splice(position, 1);
    this.files.splice(position, 1);
  }

  applyDrag(arr, dragResult) {
    const {removedIndex, addedIndex, payload} = dragResult;
    if (removedIndex === null && addedIndex === null) {
      return arr;
    }

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }

    return result;
  }

  onDropImage(dropResult) {
    this.currentProfile.photosUrl = this.applyDrag(this.currentProfile.photosUrl, dropResult);
    console.log(JSON.stringify(this.currentProfile.photosUrl));
  }

}
