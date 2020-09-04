import {MatPaginatorIntl} from '@angular/material/paginator';

export class MatPaginatorIntlCro extends MatPaginatorIntl {
  itemsPerPageLabel = 'Prestataires par page';
  firstPageLabel = 'Première page';
  previousPageLabel = 'Page précédente';
  nextPageLabel = 'Page suivante';
  lastPageLabel = 'Dernière page';

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 sur ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} sur ${length}`;
  }

}
