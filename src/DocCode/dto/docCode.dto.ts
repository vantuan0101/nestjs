import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class DocCodeDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  DocsId: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}
