import {UpdateAnswerDto} from "./update-answer.dto";

export class UpdateCommandDto {
    key !: string;
    answers!: UpdateAnswerDto[];
}
