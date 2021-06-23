import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {DepartmentsService} from '../services/departments.service';

import {forkJoin, Observable} from 'rxjs';
import {SelectCitiesComponent} from '../utils/select-cities/select-cities.component';
import {SearchService} from '../services/search.service';
import {Profile} from '../models/profile.model';
import {Department} from '../models/department.model';
import * as Constants from '../utils/globals';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {SignupService} from '../services/signup.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('citiesSelect') citiesSelect: SelectCitiesComponent;

  categoryTitle: string;
  departments: Array<any>;
  // selectedDeptObservable: Observable<Department>;
  selectedDept: Department[];
  filterText='';
  artistsProfiles: Profile[];
  expertisesList = [];
  pageLength = 1;
  pageSizeOptions: number[] = Constants.SEARCH_AVAILABLE_ITEMS_PER_PAGE;
  pageSize = Constants.SEARCH_AVAILABLE_ITEMS_PER_PAGE[2];
  pageIndex = 0;
  imageName="";
  imageSrc="../../assets/images/";
  skinTypes = [
    {value: 1, label: 'Peau claire'},
    {value: 2, label: 'Peau foncée'},
    {value: 3, label: 'Peau mate'}
  ];

  henneTypes = [
    {value: 1, label: 'Henné Maghrébin'},
    {value: 2, label: 'Henné Subsaharien'},
    {value: 3, label: 'Henné Indien'}
  ];
  selectedSkins = [];
  selectedHenne = [];
  selectedCity = null;
  deptList: Observable<any[]>;
  businessType: number; // fonction de la page de recherche affichée

  artistFound = true;


  constructor(private router: Router, private signupService: SignupService, private deptService: DepartmentsService, private searchService: SearchService) {
  }

  maquillageExpertises = [];
  laceFrontaleExpertises = [];
  manucureExpertises = [];
  microBlandingExpertises = [];
  extensionCilsExpertises = [];
  henneExpertises = [];

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
      this.filterText='Type de peau';
      this.imageName="makeup_2.jpg";
      this.businessType = 1;
    } else if (this.router.url.startsWith('/search-microblading')) {
      this.filterText='Type de Microblading'


      this.categoryTitle = 'micro blading';
      this.imageName="micro_2.jpg";
      this.businessType = 2;
    } else if (this.router.url.startsWith('/search-manicure')) {
      this.filterText='Type de Manuicure'
      this.categoryTitle = 'manucure';
      this.imageName="ongles-3.jpg";
      this.businessType = 3;
    } else if (this.router.url.startsWith('/search-eyelashes')) {
      this.filterText='Type de cils'
      this.imageName="extencion_2.jpg";
      this.categoryTitle = 'extension de cils';
      this.businessType = 4;
    } else if (this.router.url.startsWith('/search-henne')) {
      this.filterText='Type de henné'
      this.categoryTitle = 'henné';
      this.imageName="henna_2.jpg";
      this.businessType = 5;
    }
    else if (this.router.url.startsWith('/search-lace-frontale')) {
      this.filterText='Type de Lade Frontale'
      this.categoryTitle = 'lace frontale';
      this.imageName="perruque_2.jpg";
      this.businessType = 6;
    }



    this.deptService.getJSON().subscribe(data => {
      this.departments = data;
    });


    this.updateSearch();
    this.signupService.getExpertises().subscribe((res: any) => {
      switch (this.businessType) {
        case 1:
          this.getCurrentExpertises(res, 'Maquillage');
          break;
        case 2 :
          this.getCurrentExpertises(res,'MicroBlading' );
          break;
        case 3 :
          this.getCurrentExpertises(res,'Manucure');
          break;
        case 4:
          this.getCurrentExpertises(res,'extension');
          break;
        case 5:
          this.getCurrentExpertises(res,'Henné');
          break;
        case 6:
          this.getCurrentExpertises(res,'Lace Frontale');
          break;


        /*           case 'MicroBlading':
                     this.microBlandingExpertises.push(item);
                   case 'Henné':
                     this.henneExpertises.push(item);
                   case 'extension':
                     this.extensionCilsExpertises.push(item);
                   case 'Manucure':
                     this.manucureExpertises.push(item);
                   case 'Lace Frontale':
                     this.laceFrontaleExpertises.push(item);*/
        default:
          console.log('hikhkj');
          break;

      }


    });
  }

  getCurrentExpertises(res: any, type: string) {
    const expertisesLists = [];
    const expertisesList = res.filter(data => data.type === type);
    expertisesList.map(item => {
      const expertise = {
        value: item.idExpertise,
        label: item.libelle
      };


      expertisesLists.push(expertise);
    });
    console.log(this.expertisesList);
    this.expertisesList = expertisesLists;
    console.log(this.expertisesList);

  }


   ngAfterViewInit() {

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

    console.log(this.selectedSkins);
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
