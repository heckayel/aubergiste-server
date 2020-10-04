import {CreateAnswerDto} from "./create-answer.dto";

export class CreateCommandDto {
    readonly key: string;
    answers:CreateAnswerDto[];
}
