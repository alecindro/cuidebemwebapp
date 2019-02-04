
export class EventoRotina {

    sinaisvitais = [
        {
            rotina: "Pressão Arterial",
            template: "/app/evento/pressaoarterial.html"
        },
        {
            rotina: "Frequência Cardíaca",
            template: "/app/evento/frequenciacardiaca.html"
        },
        {
            rotina: "Temperatura Corporal",
            template: "/app/evento/temperatura.html"
        },
        {
            rotina: "Frequência Respiratória",
            template: "/app/evento/frequenciarespiratoria.html"
        },
        {
            rotina: "Saturação de Oxigênio (oximetria)",
            template: "/app/evento/oximetria.html"
        },
        {
            rotina: "Controle da Glicemia",
            template: "/app/evento/glicemia.html"
        }];

    respiratorio = [
        {
            rotina: "Aspiração Traqueal",
            opcoes: ["Oral", "Nasal"],
            quantidade: ["Pouco", "Normal", "Grande"],
            aspecto: ["Seroide", "Mucosa", "Purulenta"],
            template: "/app/evento/traqueal.html"
        },
        {
            rotina: "Frequência Cardíaca",
            opcoes: ["Oral", "Nasal"],
            quantidade: ["Pouco", "Normal", "Grande"],
            aspecto: ["Seroide", "Mucosa", "Purulenta"],
            template: "/app/evento/nebulizacao.html"
        }
    ];

    nutricao = [
        {
            rotina: "Café da manhã",
            opcoes: ["Aceitou bem", "Aceitou parcialmente", "Não aceitou"],
            template: "/app/evento/cafe.html"
        },
        {
            rotina: "Almoço",
            opcoes: ["Aceitou bem", "Aceitou parcialmente", "Não aceitou"],
            template: "/app/evento/almoco.html"
        },
        {
            rotina: "Jantar",
            opcoes: ["Aceitou bem", "Aceitou parcialmente", "Não aceitou"],
            template: "/app/evento/jantar.html"
        },
        {
            rotina: "Ceia",
            opcoes: ["Aceitou bem", "Aceitou parcialmente", "Não aceitou"],
            template: "/app/evento/ceia.html"
        },
        {
            rotina: "Lanche",
            opcoes: ["Aceitou bem", "Aceitou parcialmente", "Não aceitou"],
            template: "/app/evento/lanche.html"
        },
        {
            rotina: "Ingestão de Líquidos",
            opcoes: ["Pouco", "Moderada", "Grande"],
            template: "/app/evento/liquidos.html"
        }
    ];

    medicacao = [
        {
            rotina: "Hipertensão Arterial",
            template: "/app/evento/ha.html"
        },
        {
            rotina: "Diabetes",
            template: "/app/evento/diabetes.html"
        },
        {
            rotina: "HIV",
            template: "/app/evento/hiv.html"
        },
        {
            rotina: "Cardiopatia (problemas cardiacos)",
            template: "/app/evento/cardiopatia.html"
        },
        {
            rotina: "Asma/bronquite",
            template: "/app/evento/asma.html"
        },
        {
            rotina: "Pneumopatia (enfizema, bronquite, pneumonia)",
            template: "/app/evento/pneumo.html"
        },
        {
            rotina: "Acidente vascular cerebral",
            template: "/app/evento/avc.html"
        },
        {
            rotina: "Obesidade",
            template: "/app/evento/obesidade.html"
        },
        {
            rotina: "Renal crônico",
            template: "/app/evento/renal.html"
        },
        {
            rotina: "Epilepsia",
            template: "/app/evento/epilepsia.xhtml"
        },
        {
            rotina: "Cancer",
            template: "/app/evento/cancer.xhtml"
        },
        {
            rotina: "Faz uso de Traqueostomia",
            template: "/app/evento/traqueo.html"
        },
        {
            rotina: "Faz uso de Oxigenioterapia",
            template: "/app/evento/oxigen.xhtml"
        },
        {
            rotina: "Hepatite",
            template: "/app/evento/hepatite.xhtml"
        },
        {
            rotina: "Problemas Neurológicos",
            template: "/app/evento/neuro.xhtml"
        },
        {
            rotina: "Outros",
            template: "/app/evento/outros.xhtml"
        }
    ];
    higiene = [
        {
            rotina: "Realização de Banho",
            template: "/app/evento/banho.html"
        },
        {
            rotina: "Higiene Oral",
            template: "/app/evento/higieneoral.html"
        }
    ];
    eliminacao = [
        {
            rotina: "Urina",
            quantidade: ["Pouco", "Normal", "Grande"],
            aspecto: ["Clara", "Escura", "Avermelhada"],
            template: "/app/evento/urina.xhtml"
        },
        {
            rotina: "Fezes",
            quantidade: ["Pouco", "Normal", "Grande"],
            aspecto: ["Líquido", "Pastoso", "Endurecido", "Fecaloma,Sangue"],
            template: "/app/evento/fezes.xhtml"
        },
        {
            rotina: "Vomito",
            quantidade: ["Pouco", "Normal", "Grande"],
            aspecto: ["Restos Alimentares", "Amarelo", "Sangue", "Borra de Café"],
            template: "/app/evento/vomito.xhtml"
        }
    ];
    consulta = [
        {
            rotina: "Consultas de Saúde",
            template: "/app/evento/consulta.html"
        }
    ];

    bemestar = [
        {
            rotina: "Sono - Acordou",
            opcoes: ["Dormiu bem", "Agitou", "Insônia"],
            template: "/app/evento/acordou.xhtml"
        },
        {
            rotina: "Sono - Dormiu",
            opcoes: ["Normal", "A base de remédios"],
            template: "/app/evento/dormiu.xhtml"
        },
        {
            rotina: "Passeios",
            opcoes: ["Iniciou", "Retornou"],
            template: "/app/evento/passeio.xhtml"
        },
        {
            rotina: "Nível de Consciência",
            opcoes: ["Acordado", "Sonolento", "Irresponsivo"],
            template: "/app/evento/conscie.xhtml"
        },
        {
            rotina: "Humor",
            opcoes: ["Alegre", "Calmo", "Apático", "Depressivo", "Agressivo", "Agitado"],
            template: "/app/evento/humor.xhtml"
        }
    ];
    atividade = [
        {
            rotina: "Arterapia",
            opcoes: ["Participou", "Participou moderamente","Não participou"],
            template: "/app/evento/arterapia.html"
        },
        {
            rotina: "Estimulação Cognitiva",
            opcoes: ["Participou", "Participou moderamente","Não participou"],
            template: "/app/evento/cognitiva.html"
        },
        {
            rotina: "Massagem",
            opcoes: ["Participou", "Participou moderamente","Não participou"],
            template: "/app/evento/massagem.html"
        },
        {
            rotina: "Dança",
            opcoes: ["Participou", "Participou moderamente","Não participou"],
            template: "/app/evento/danca.html"
        },
        {
            rotina: "Atividade Física",
            opcoes: ["Participou", "Participou moderamente","Não participou"],
            template: "/app/evento/fisica.html"
        },
        {
            rotina: "Atividades Lúdicas",
            opcoes: ["Participou", "Participou moderamente","Não participou"],
            template: "/app/evento/ludica.html"
        },
        {
            rotina: "Outras",
            opcoes: ["Participou", "Participou moderamente","Não participou"],
            template: "/app/evento/outra.html"
        }
    ];
    eventos =
        [{ descricao: "Sinais Vitais", rotinas: this.sinaisvitais , icon: "heart" },
        { descricao: "Respiratório", rotinas: this.respiratorio,  icon: "pulse" },
        { descricao: "Nutrição", rotinas: this.nutricao,  icon: "restaurant" },
        { descricao: "Medicação", rotinas: this.medicacao,  icon: "medkit" },
        { descricao: "Interocorrências", rotinas: null,  icon: "alert" },
        { descricao: "Higiene", rotinas: this.higiene,  icon: "body" },
        { descricao: "Eliminações", rotinas: this.eliminacao,  icon: "exit" },
        { descricao: "Dor", rotinas: null, icon: "sad" },
        { descricao: "Consultas", rotinas: null ,  icon: "clipboard" },
        { descricao: "Bem Estar", rotinas: this.bemestar ,  icon: "happy" },
        { descricao: "Atividades", rotinas: this.atividade,  icon: "walk" },
        { descricao: "Entrou", rotinas: null,  icon: "log-in" },
        { descricao: "Saiu", rotinas: null,  icon: "log-out" }
        ];

    
        constructor(){
          
        }

    getDescricaoEvento(): string[] {
        return this.eventos.map(this.mapDescricao);
    }

    getIcon(descricao:string):string{
        let pos = this.eventos.map(_eventos=>{return _eventos.descricao}).indexOf(descricao);
        return this.eventos[pos].icon;
    }

    getRotinas(descricao:string) : any{
        let pos = this.eventos.map(_eventos=>{return _eventos.descricao}).indexOf(descricao);
        return this.eventos[pos].rotinas;
    }


    private mapDescricao(element): string {
        return element.descricao;
    }

    private filterDescricaoEvento(element, index, array): string {
        return (element);
    }




}





