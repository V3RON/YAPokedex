import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashreplacer'
})
export class DashReplacerPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return !!value && value.replace('-', ' ');
  }
}
