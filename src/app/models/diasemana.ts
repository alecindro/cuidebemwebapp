import { Dia } from "./dia";
import { AgendaDef } from "./agendadef";

export class DiaSemana {
  descricao: Array<string> = [
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
    "Domingo"
  ];

  dias: Array<Dia> = [];

  constructor() {
    let index = 0;
    for (let _dia of this.descricao) {
      let dia = new Dia();
      dia.descricao = _dia;
      dia.selected = false;
      index = index + 1;
      dia.index = index;
      this.dias.push(dia);
    }
  }

  resolve(agendadef: AgendaDef):Array<Dia> {
    if (agendadef.diaspersonalizado) {
      let _dias = agendadef.diasemana.split(",");
      if (_dias) {
        _dias.forEach(e1 =>
          this.dias.forEach(e2 => {
            if (+e1 === e2.index) {
              e2.selected = true;
            }
          })
        );
        return this.dias;
      }
    }
  }

  result(agendadef: AgendaDef, dias: Array<Dia>) {
    if (agendadef.diaspersonalizado) {
      let diassemana: string = "";
      for (let _dia of dias) {
        if (_dia.selected) {
          diassemana = diassemana + _dia.index + ",";
        }
      }
      diassemana = diassemana.slice(0, -1);
      agendadef.diasemana = diassemana;
    }
  }
}
