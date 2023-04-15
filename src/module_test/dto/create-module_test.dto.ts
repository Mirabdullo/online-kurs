import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateModuleTestDto {
  @ApiProperty({
    example: '173ef952-79bb-489d-9cfc-62db0d8114b4',
    description: 'Qaysi coursega tegishliligi',
  })
  @IsUUID()
  course_id: string;

  @ApiProperty({
    example: '173ef952-79bb-489d-9cfc-62db0d8114b4',
    description: 'Qaysi modulega tegishliligi',
  })
  @IsUUID()
  module_id: string;


  @ApiProperty({ example: 'Dasturlash', description: ' Birinchi variant' })
  @IsOptional()
  @IsString()
  select_first: string;

  @ApiProperty({
    example: 'Dasturlash',
    description: 'Ikkinchi variant',
  })
  @IsOptional()
  @IsString()
  select_two: string;

  @ApiProperty({
    example: 'Dasturlash',
    description: 'Uchinchi variant',
  })
  @IsOptional()
  @IsString()
  select_three: string;

  @ApiProperty({
    example: 'Dasturlash',
    description: "To'rtinchi variant",
  })
  @IsOptional()
  @IsString()
  select_four: string;

  @ApiProperty({
    example: '1',
    description: "Nechinchi variant to'g'riligi",
  })
  @IsNumber()
  answer: number;
}
