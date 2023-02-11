import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    example: '173ef952-79bb-489d-9cfc-62db0d8114b4',
    description: 'Qaysi categoriyaga tegishliligi',
  })
  @IsUUID()
  category_id: string;

  @ApiProperty({ example: 'AAT buhgalteriya', description: 'Course nomi' })
  @IsNotEmpty()
  @IsString({ message: 'title satr bolishi kerak' })
  title: string;

  @ApiProperty({
    example: 'Curse haqida',
    description: 'Course haqida malumotlar',
  })
  @IsString()
  description: string;






  @ApiProperty({ example: 'image.jpeg', description: 'Course foni uchun rasm' })
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty({ example: '500000', description: 'Course narxi' })
  @IsOptional()
  @IsNumberString()
  price: number;
}
