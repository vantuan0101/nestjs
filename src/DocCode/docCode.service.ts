import { DocCodeDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import {
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

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
    try {
      const docCode =
        await this.prisma.codeBlock.create({
          data: {
            code: dto.code,
            DocsId: dto.DocsId,
            content: dto.content,
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
  async updateDocCode(id: number) {
    try {
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }
  async deleteDocCode(id: number) {
    try {
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }
}
