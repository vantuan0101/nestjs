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
  // @IsNumber()
  DocsId: number;

  @IsNotEmpty()
  @IsString()
  content: string;
  @IsNotEmpty()
  @IsString()
  icon: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  slug: string;
  @IsNotEmpty()
  @IsString()
  note: string;
  @IsNotEmpty()
  @IsString()
  outPut: string;
}
