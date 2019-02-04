import { Agenda } from "./agenda";
import { Paciente } from "./paciente";
var PacienteDTO = /** @class */ (function () {
    function PacienteDTO() {
        this.paciente = new Paciente();
        this.nextAgenda = new Agenda();
        this.patologiasDTO = [];
    }
    return PacienteDTO;
}());
export { PacienteDTO };
//# sourceMappingURL=pacienteDTO.js.map