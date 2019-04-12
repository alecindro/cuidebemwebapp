import { Pipe, PipeTransform } from '@angular/core';
import { EventoRotina } from '../models/eventorotina';


@Pipe({
  name: 'iconEvent'
})
export class IconEventPipe implements PipeTransform {

  static eventoRotina: EventoRotina = new EventoRotina();
  transform(value: any, args?: any): any {
    return IconEventPipe.eventoRotina.getIcon(value);
  }

}
