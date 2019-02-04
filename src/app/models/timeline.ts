export class Timeline{
    dataEvento: Date;
	tipo: String;
	timelineData: any;
}

export enum TimelineTipo{
    TIPO_EVENTO = "evento ",
    TIPO_MEMO = "memo",
    TIPO_PHOTO = "photo"
}