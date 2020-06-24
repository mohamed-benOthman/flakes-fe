import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {concat, Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import {CitiesService} from '../../services/cities.service';

@Component({
  selector: 'app-select-cities',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <ng-select
      [ngClass]="{'custom': isValid, 'customError': !isValid}"
      [disabled]="disableComponent"
      [items]="citiesResult | async"
      bindLabel="city"
      [addTag]="false"
      [multiple]="multipleValues"
      [hideSelected]="true"
      [loading]="citiesLoading"
      [typeahead]="citiesSubject"
      [virtualScroll]="true"
      [(ngModel)]="citiesSelected"
      [appendTo]="'body'"
      maxSelectedItems="3"
      addTagText="Rechercher" clearAllText="Tout effacer" loadingText="Recherche en cours..."
      notFoundText="Aucun élément trouvé" placeholder="Ville ou Code Postal {{isRequired ? '*' : ''}}"
      typeToSearchText="Saisir pour lancer la recherche"
      (change)="onChange($event)"
      (focus)="onFocus()">

      <ng-template ng-label-tmp let-item="item" let-clear="clear">
        <span class="ng-value-label" style="font-size: small">{{item.code}} </span>
        <!--<span class="ng-value-label" style="font-size: small">{{item.code}} ({{item.city}})</span>-->
        <span class="ng-value-icon right" (click)="clear(item)" aria-hidden="true">×</span>
      </ng-template>

      <ng-template ng-option-tmp let-item="item">
        {{item.city}} - {{item.code}}
      </ng-template>
    </ng-select>
  `,
  styleUrls: ['./select-cities.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class SelectCitiesComponent implements OnInit {

  @Input() multipleValues = false;
  @Input() citiesSelected = [];
  @Input() disableComponent = false;
  @Input() departmentFilter = []; // Si  on prend tous les départements
  @Input() isValid = true;
  @Input() isRequired = false;

  @Output() zipCodeCitySelected = new EventEmitter<any>();

  citiesResult: Observable<any[]>;
  citiesLoading = false;
  citiesSubject = new Subject<string>();

  constructor(private citiesService: CitiesService) {
  }

  ngOnInit() {
    this.departmentFilter = [];
    this.loadCities();
  }

  onChange(event) {
    this.zipCodeCitySelected.emit(event);
  }

  clearFields() {
    this.citiesSelected = [];
    this.loadCities();
  }

  private loadCities() {
    this.citiesResult = concat(
      of([]), // default items
      this.citiesSubject.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.citiesLoading = true),
        switchMap(term => this.citiesService.getCitiesList(term).pipe(
          map(results => {
            const res = [];
            if (this.departmentFilter != null) {
              console.log('hello');
            }
            console.log('dept len = ' + this.departmentFilter.length);
            console.log('results = ' + JSON.stringify(results));
            if (this.departmentFilter.length > 0) {
              // this.departmentFilter.forEach(dpt => results.filter(result => String(result.code).startsWith(String(dpt.code))));
              for (let i = 0; i < this.departmentFilter.length; i++) {
                for (let j = 0; j < results.length; j++) {
                  if (String(results[j].code).startsWith(String(this.departmentFilter[i].code))) {
                    res.push(results[j]);
                  }
                }
              }
            } else {
              console.log('on est là!');
              return results;
            }
            return res;
          }),
          catchError(() => of([])), // empty list on error
          tap(() => this.citiesLoading = false)))
      )
    );
  }

  onFocus() {
    console.log('onFocus');
  }

}
