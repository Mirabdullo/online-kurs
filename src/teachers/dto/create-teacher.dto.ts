import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTeacherDto {
    @ApiProperty({example: 'Akmal', description: 'Teacherning ismi'})
    @IsNotEmpty()
    @IsString({message: "firstname must be a string"})
    first_name: string


    @ApiProperty({example: 'Karimov', description: 'Teacherning familiyasi'})
    @IsNotEmpty()
    @IsString({message: "firstname must be a string"})
    last_name: string


    @ApiProperty({example: 'akmal@gmail.com', description: 'Teacherning emaili'})
    @IsEmail({},{message: "email xato"})
    email: string


    @ApiProperty({example: '#$H@#J@#', description: 'Teacherning paroli'})
    @IsNotEmpty()
    @IsString({message: "password must be a string"})
    password: string



}
