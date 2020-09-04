import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {DepartmentsService} from '../services/departments.service';

import {forkJoin, Observable} from 'rxjs';
import {SelectCitiesComponent} from '../utils/select-cities/select-cities.component';
import {SearchService} from '../services/search.service';
import {Profile} from '../models/profile.model';
import {Department} from '../models/department.model';
import * as Constants from '../utils/globals';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('citiesSelect') citiesSelect: SelectCitiesComponent;

  categoryTitle: string;
  departments: Array<any>;
  // selectedDeptObservable: Observable<Department>;
  selectedDept: Department[];

  artistsProfiles: Profile[];

  pageLength = 1;
  pageSizeOptions: number[] = Constants.SEARCH_AVAILABLE_ITEMS_PER_PAGE;
  pageSize = Constants.SEARCH_AVAILABLE_ITEMS_PER_PAGE[2];
  pageIndex = 0;


  skinTypes = [
    {value: 1, label: 'Peau claire'},
    {value: 2, label: 'Peau foncée'},
    {value: 3, label: 'Peau mate'}
  ];
  selectedSkins = [];
  selectedCity = null;
  deptList: Observable<any[]>;
  businessType: number; // fonction de la page de recherche affichée

  artistFound = true;


  constructor(private router: Router, private deptService: DepartmentsService, private searchService: SearchService) {
  }

  ngOnInit() {

    this.deptList = this.deptService.getJSON();

    /*this.paginator._intl.itemsPerPageLabel = 'Prestataires par page';
    this.paginator._intl.firstPageLabel = 'Première page';
    this.paginator._intl.previousPageLabel = 'Page précédente';
    this.paginator._intl.nextPageLabel = 'Page suivante';
    this.paginator._intl.lastPageLabel = 'Dernière page';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 sur ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} sur ${length}`;
    };*/

    if (this.router.url.startsWith('/search-makeup')) {
      this.categoryTitle = 'maquillage';
      this.businessType = 1;
    } else if (this.router.url.startsWith('/search-microblading')) {
      this.categoryTitle = 'micro blading';
      this.businessType = 2;
    } else if (this.router.url.startsWith('/search-manicure')) {
      this.categoryTitle = 'manucure';
      this.businessType = 3;
    } else if (this.router.url.startsWith('/search-eyelashes')) {
      this.categoryTitle = 'extension de cils';
      this.businessType = 4;
    }

    this.deptService.getJSON().subscribe(data => {
      this.departments = data;
    });


    this.updateSearch();
  }

  onDeptChanged() {
    /*if (this.selectedCity && this.selectedDept) {
      if (!String(this.selectedCity[0].code).startsWith(this.selectedDept[0].code)) {
        this.citiesSelect.clearFields();
      }
    }*/
    this.citiesSelect.clearFields();
    this.updateSearch();
  }

  onCitySelected(city) {
    this.selectedCity = city[0];
    this.updateSearch();
  }

  openProfileDetails(artistID: String) {
    this.router.navigate(['/profile-details', artistID]);
  }

  updateSearch() {
    // const skin = (!this.selectedSkins || this.selectedSkins.length === 0) ? null : String(this.selectedSkins[0].value);
    const biz = String(this.businessType);
    const city = !this.selectedCity ? null : String(this.selectedCity.code) + ';' + String(this.selectedCity.city);
    const dept = !this.selectedDept || this.selectedDept.length === 0 ? null : this.selectedDept.map(dpt => dpt.code).toString();
    console.log('updateSearch: ' + dept);

    const searchObs = this.searchService.requestSearch(this.pageSize, this.pageIndex * this.pageSize, dept, city, biz, this.selectedSkins);
    const countObs = this.searchService.requestSearchCount(dept, city, biz, this.selectedSkins);

    forkJoin([searchObs, countObs]).subscribe(results => {
      this.artistsProfiles = results[0] as Profile[];
      const count = results[1] as number;

      this.artistFound = count > 0;

      const remainder = count % this.pageSize === 0 ? 0 : 1;
      this.pageLength = count;

      // this.pageLength = Math.floor(count / this.pageSize + remainder);
      // setTimeout(() => this.pageIndex = 1, 1500);
      console.log('this.pageLength' + this.pageLength);
      console.log('this.pageSize' + this.pageSize);
      console.log('this.pageIndex' + this.pageIndex);
    }, error1 => {
      console.log('updateSearch erreur:\n ' + JSON.stringify(error1));
      this.artistFound = false;
    });
  }

  onPageChange(pageEvent: PageEvent) {
    this.pageLength = pageEvent.length;
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;

    // console.log('BEFORE updateSearch: ' + JSON.stringify(pageEvent));
    this.updateSearch();
  }

}
