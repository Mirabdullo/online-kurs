import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateModuleTestDto {
    @ApiProperty({ example: '1', description: 'Qaysi coursega tegishliligi' })
    @IsNumber()
    course_id: number;
  
    @ApiProperty({ example: '1', description: 'Qaysi modulega tegishliligi' })
    @IsNumber()
    module_id: number;
  
    @ApiProperty({
      example: 'Dasturlash nima?',
      description: 'Test savoli',
    })
    @IsNotEmpty()
    @IsString()
    question: string;
  
  
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
      description: "Uchinchi variant",
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
