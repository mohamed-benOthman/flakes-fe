import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {DepartmentsService} from '../services/departments.service';
import {MatPaginator, PageEvent} from '@angular/material';
import {Observable} from 'rxjs';
import {SelectCitiesComponent} from '../utils/select-cities/select-cities.component';
import {SearchService} from '../services/search.service';
import {Profile} from '../models/profile.model';

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
  selectedDept: Observable<any>;

  artistsProfiles: Profile[];

  length = 8;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  skinTypes = [
    {value: 1, label: 'Peau claire'},
    {value: 2, label: 'Peau foncée'},
    {value: 3, label: 'Peau mate'}
  ];
  selectedSkin = null;

  deptList: Observable<any[]>;

  constructor(private router: Router, private deptService: DepartmentsService, private searchService: SearchService) {
  }

  ngOnInit() {

    this.searchService.requestSearch(10, 0, null, '34000;montpellier', '1', null)
      .subscribe(res => this.artistsProfiles = res);

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
    } else if (this.router.url.startsWith('/search-microblading')) {
      this.categoryTitle = 'micro blading';
    } else if (this.router.url.startsWith('/search-manicure')) {
      this.categoryTitle = 'manucure';
    } else if (this.router.url.startsWith('/search-eyelashes')) {
      this.categoryTitle = 'extension de cils';
    }

    this.deptService.getJSON().subscribe(data => {
      this.departments = data;
    });

  }

  onDeptChanged() {
    this.citiesSelect.clearFields();
  }

  openProfileDetails(artistID: number) {
    this.router.navigate(['/profile-details', artistID]);
  }
}
