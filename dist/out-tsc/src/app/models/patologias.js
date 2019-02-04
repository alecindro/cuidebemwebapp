import { Patologiapaciente } from "./patologiapaciente";
import { PatologiaPacienteDTO } from "./patologiaPacienteDTO";
var Patologias = /** @class */ (function () {
    function Patologias() {
        this.descricoes = [
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
        this.patologiapacienteDTOs = [];
        for (var _i = 0, _a = this.descricoes; _i < _a.length; _i++) {
            var descricao = _a[_i];
            var _patologiapaciente = new Patologiapaciente();
            _patologiapaciente.patologia = descricao;
            var patologiapacienteDTO = new PatologiaPacienteDTO();
            patologiapacienteDTO.patologiaPaciente = _patologiapaciente;
            this.patologiapacienteDTOs.push(patologiapacienteDTO);
        }
    }
    Patologias.prototype.resolve = function (values) {
        var _this = this;
        if (values) {
            values.forEach(function (e1) { return _this.patologiapacienteDTOs.forEach(function (e2) {
                if (e1.patologiaPaciente.patologia === e2.patologiaPaciente.patologia) {
                    e2.selected = e1.selected;
                    e2.patologiaPaciente = e1.patologiaPaciente;
                }
            }); });
            return this.patologiapacienteDTOs;
        }
    };
    return Patologias;
}());
export { Patologias };
//# sourceMappingURL=patologias.js.map