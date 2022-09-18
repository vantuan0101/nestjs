import { DocCodeDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import {
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { DocCodeEntry } from './entries/docCode.entries';

@Injectable()
export class DocCodeService {
  constructor(private prisma: PrismaService) {}

  async getAllDocCode() {
    try {
      const docCode =
        await this.prisma.codeBlock.findMany();
      return {
        status: 'success',
        errCode: 0,
        data: docCode,
      };
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }
  async getOneDocCode(id: number) {
    try {
      const docCode =
        await this.prisma.codeBlock.findUnique({
          where: {
            id,
          },
        });
      return {
        status: 'success',
        errCode: 0,
        data: docCode,
      };
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }
  async createDocCode(dto: DocCodeDto) {
    // console.log(dto);
    try {
      const docCode =
        await this.prisma.codeBlock.create({
          data: {
            code: dto.code,
            DocsId: +dto.DocsId,
            content: dto.content,
            icon: dto.icon,
            title: dto.title,
            slug: dto.slug,
            note: dto.note,
            outPut: dto.outPut,
          },
        });
      return {
        status: 'success',
        errCode: 0,
        data: docCode,
      };
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }
  async updateDocCode(
    id: number,
    dto: DocCodeEntry,
  ) {
    try {
      const docCode =
        await this.prisma.codeBlock.update({
          where: {
            id,
          },
          data: {
            code: dto.code,
            DocsId: dto.DocsId,
            content: dto.content,
            icon: dto.icon,
            title: dto.title,
            slug: dto.slug,
            note: dto.note,
            outPut: dto.outPut,
          },
        });
      return {
        status: 'success',
        errCode: 0,
        data: docCode,
      };
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }
  async deleteDocCode(id: number) {
    try {
      await this.prisma.codeBlock.delete({
        where: {
          id,
        },
      });
      return {
        status: 'success',
        errCode: 0,
      };
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }
}
