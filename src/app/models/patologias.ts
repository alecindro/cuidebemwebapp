import { Patologiapaciente } from "./patologiapaciente";
import { PatologiaPacienteDTO } from "./patologiaPacienteDTO";

export class Patologias {

    descricoes: Array<string> = [
        "Hipertensão Arterial",
        "Diabetes",
        "HIV",
        "Cardiopatia (problemas cardiacos)",
        "Asma/bronquite",
        "Pneumopatia (enfizema, bronquite, pneumonia)",
        "Acidente vascular cerebral",
        "Obesidade",
        "Renal crônico",
        "Epilepsia",
        "Cancer",
        "Faz uso de Traqueostomia",
        "Faz uso de Oxigenioterapia",
        "Hepatite",
        "Problemas Neurológicos"
    ];

    patologiapacienteDTOs: Array<PatologiaPacienteDTO> = [];

    constructor() {
        for (let descricao of this.descricoes) {
            let _patologiapaciente = new Patologiapaciente();
            _patologiapaciente.patologia = descricao;
            let patologiapacienteDTO = new PatologiaPacienteDTO();
            patologiapacienteDTO.patologiaPaciente = _patologiapaciente; 
              this.patologiapacienteDTOs.push(patologiapacienteDTO);
        }
    }

    resolve(values: Array<PatologiaPacienteDTO>): Array<PatologiaPacienteDTO> {
        if (values) {
            values.forEach
                (
                (e1) => this.patologiapacienteDTOs.forEach
                    (
                    (e2) => {
                        if (e1.patologiaPaciente.patologia === e2.patologiaPaciente.patologia) {
                            e2.selected = e1.selected;
                            e2.patologiaPaciente = e1.patologiaPaciente;
                        }
                    }
                    )
                );
                return this.patologiapacienteDTOs;
        }
    }

}

