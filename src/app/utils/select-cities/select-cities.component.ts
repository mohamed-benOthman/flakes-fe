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
    <ng-select class="custom"
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
               maxSelectedItems="3"
               addTagText="Rechercher" clearAllText="Tout effacer" loadingText="Recherche en cours..."
               notFoundText="Aucun élément trouvé" placeholder="Ville ou Code Postal"
               typeToSearchText="Saisir pour lancer la recherche"
               (change)="onChange($event)">

      <ng-template ng-label-tmp let-item="item" let-clear="clear">
        <span class="ng-value-label" style="font-size: small">{{item.code}} ({{item.city}})</span>
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
  @Input() departmentFilter = 0; // Si 0 on prend tous les départements

  @Output() zipCodeCitySelected = new EventEmitter<any>();

  citiesResult: Observable<any[]>;
  citiesLoading = false;
  citiesSubject = new Subject<string>();

  constructor(private citiesService: CitiesService) {
  }

  ngOnInit() {
    this.loadCities();
  }

  onChange(event) {
    if (event) {
      this.zipCodeCitySelected.emit(event);
    }
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
            if (this.departmentFilter > 0) {
              return results.filter(result => String(result.code).startsWith(String(this.departmentFilter));
            }
            else {
              return results;
            }
          }),
          catchError(() => of([])), // empty list on error
          tap(() => this.citiesLoading = false)))
      )
    );
  }

  clearFields() {
    this.citiesSelected = [];
  }

}
