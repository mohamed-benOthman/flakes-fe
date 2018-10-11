import {Component} from '@angular/core';
import {transition, trigger, query, style, animate, group, animateChild, stagger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Flakes';
}
