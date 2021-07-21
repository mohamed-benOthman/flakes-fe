import { Component, OnInit, Input } from '@angular/core';
import sha256 from 'crypto-js/sha256';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public actionMode = 'INTERACTIVE';
  //@Input() amount: string;
  public transId: string;
  @Input() email: string;
  @Input() subAmount: string;
  secretKey: string= environment.paymentSercretKey;
  @Input() buttonText: string;
  public subDesc = 'RRULE:FREQ=MONTHLY' ;
  public subEffectDate = this.getUtcDate().substring(0, 8);
  public mode = 'TEST';
  public currency = '978';
  public action = 'REGISTER_SUBSCRIBE';
  public config = 'SINGLE';
  public transDate = this.getUtcDate();
  public  siteId = '68757694';
  public version = 'V2';
  public signature = '';

  constructor() { }
  ngOnInit(): void {
    this.transId = this.makeid(6);
    this.signature = this.compute(this.joinElements(), this.secretKey);

  }

   makeid(length) {

    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const  charactersLength = characters.length;
    for ( let  i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  getUtcDate() {
    const date = new Date();
    // tslint:disable-next-line:max-line-length
    const result =   date.getFullYear().toString() + this.pad2(date.getMonth() + 1) + this.pad2( date.getDate()) + this.pad2( date.getHours() ) + this.pad2( date.getMinutes() ) + this.pad2( date.getSeconds() ) ;
    return result;
  }

  joinElements() {
    // tslint:disable-next-line:max-line-length
    //return this.actionMode + /*'+' + this.amount +*/ '+' + this.mode + /*'+' + this.currency +*/ '+' + this.email + '+' + this.token + '+' + this.status + '+' + this.action + /*'+' + this.config +*/ '+' + this.siteId + /*'+' + this.subAmount + '+' + this.currency + '+' + this.subDesc + '+' + this.subEffectDate +*/ '+' + this.transDate +/* '+' + this.transId +*/ '+' + this.version + '+' + this.secretKey;

    return this.actionMode + /*'+' + this.amount +*/ '+' + this.mode + '+' + this.currency + '+' + this.email + '+' + this.action + '+' + this.config + '+' + this.siteId + '+' + this.subAmount + '+' + this.currency + '+' + this.subDesc + '+' + this.subEffectDate + '+' + this.transDate + '+' + this.transId + '+' + this.version + '+' + this.secretKey;
  }

  pad2(n) { return n < 10 ? '0' + n : n; }
  compute(elements: string, privateKey: string) {
    return  Base64.stringify(hmacSHA256(elements, privateKey));

  }



}
