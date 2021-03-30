import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToNumber'
})
export class StringToNumberPipe implements PipeTransform {
  transform(str: string): number {
    return Number(str);
  }
}
