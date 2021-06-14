import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SignupService} from '../../services/signup.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private signupService: SignupService) { }
  token = '';
  success = false;
  failed = false;
  verifiedAlready = false;
  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    this.signupService.confirmToken(this.token).subscribe((res: any) => {
     if (res.verified === false) {
       this.verifiedAlready = true;
     }
     else
      this.success = true;
    },
      error => this.failed = true);
  }

}
