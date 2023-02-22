import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateHighlightDto {
    @ApiProperty({ example: 'Guided study plans', description: 'Guided study plans' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ example: 'Guided study plans', description: 'Guided study plans' })
    @IsNotEmpty()
    @IsString()
    description: string;
}
