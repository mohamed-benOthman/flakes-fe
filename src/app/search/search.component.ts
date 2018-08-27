import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {DepartmentsService} from '../services/departments.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  categoryTitle: string;
  departments: Array<any>;
  selectedDept = {};

  skinTypes = [
    { value: 1, label: 'Peau claire' },
    { value: 2, label: 'Peau foncée' },
    { value: 3, label: 'Peau mate' }
  ];
  selectedSkin = null;

  constructor(private router: Router, private deptService: DepartmentsService) { }

  ngOnInit() {
    if (this.router.url.startsWith('/search-makeup')) {
      this.categoryTitle = 'maquillage';
    }
    else if (this.router.url.startsWith('/search-microblading')) {
      this.categoryTitle = 'micro blading';
    }
    else if (this.router.url.startsWith('/search-manicure')) {
      this.categoryTitle = 'manucure';
    }
    else if (this.router.url.startsWith('/search-eyelashes')) {
      this.categoryTitle = 'extension de cils';
    }

    this.deptService.getJSON().subscribe(data => {
      this.departments = data;
    });

  }

}
