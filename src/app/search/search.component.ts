import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {DepartmentsService} from '../services/departments.service';
import {MatPaginator, PageEvent} from '@angular/material';
import {forkJoin, Observable} from 'rxjs';
import {SelectCitiesComponent} from '../utils/select-cities/select-cities.component';
import {SearchService} from '../services/search.service';
import {Profile} from '../models/profile.model';
import {NgSelectComponent} from '@ng-select/ng-select';
import {Department} from '../models/department.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('citiesSelect') citiesSelect: SelectCitiesComponent;
  @ViewChild('skinSelect') skinSelect: NgSelectComponent;

  categoryTitle: string;
  departments: Array<any>;
  selectedDept: Observable<Department>;

  artistsProfiles: Profile[];

  pageLength = 1;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [1, 5, 10, 25];

  skinTypes = [
    {value: 1, label: 'Peau claire'},
    {value: 2, label: 'Peau foncée'},
    {value: 3, label: 'Peau mate'}
  ];
  selectedSkin = null;
  selectedCity = null;
  deptList: Observable<any[]>;
  businessType: number; // fonction de la page de recherche affichée

  constructor(private router: Router, private deptService: DepartmentsService, private searchService: SearchService) {
  }

  ngOnInit() {

    this.deptList = this.deptService.getJSON();

    this.paginator._intl.itemsPerPageLabel = 'Prestataires par page';
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
    };

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
    if (this.selectedCity && this.selectedDept) {
      if (!String(this.selectedCity.code).startsWith(this.selectedDept.code)) {
        this.citiesSelect.clearFields();
      }
    }

    this.updateSearch();
  }

  onCitySelected(city) {
    this.selectedCity = city;
    console.log('selected city = ' + JSON.stringify(this.selectedCity));
    this.updateSearch();
  }

  openProfileDetails(artistID: number) {
    this.router.navigate(['/profile-details', artistID]);
  }

  updateSearch() {
    const biz = String(this.businessType);
    const skin = !this.selectedSkin ? null : String(this.selectedSkin.value);
    const city = !this.selectedCity ? null : String(this.selectedCity.code);
    const dept = !this.selectedDept ? null : this.selectedDept.code;

    console.log(`pageIndex = ${this.pageIndex}`);

    const searchObs = this.searchService.requestSearch(this.pageSize, this.pageIndex, dept, city, biz, skin);
    const countObs = this.searchService.requestSearchCount(dept, city, biz, skin);

    forkJoin([searchObs, countObs]).subscribe(results => {
      this.artistsProfiles = results[0];
      const count = results[1];

      const remainder = count % this.pageSize === 0 ? 0 : 1;
      this.pageLength = Math.floor(count / this.pageSize + remainder);
    });

  }

  onPageChange(pageEvent: PageEvent) {
    this.pageLength = pageEvent.length;
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;

    this.updateSearch();
    console.log('onPageEvent: ' + JSON.stringify(pageEvent));
  }

}
