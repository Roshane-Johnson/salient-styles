import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlecase',
})
export class TitlecasePipe implements PipeTransform {
  transform(value: string | null | undefined, ...args: any[]): string {
    let titleCase: string = '';

    if (value) {
      titleCase = (value as string).replace(/\w\S*/g, (_text) => {
        return _text.charAt(0).toUpperCase() + _text.substring(1).toLowerCase();
      });
    }

    return titleCase;
  }
}
