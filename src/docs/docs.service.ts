import { PrismaService } from '../prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DocsDto } from './dto';

@Injectable()
export class DocsService {
  constructor(private prisma: PrismaService) {}
  getAll() {
    try {
      const Docss = this.prisma.docs.findMany();
      return {
        status: 'success',
        errCode: 0,
        data: Docss,
      };
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }
  getOne(id: number) {
    try {
      const Docs = this.prisma.docs.findUnique({
        where: { id },
      });
      return {
        status: 'success',
        errCode: 0,
        data: Docs,
      };
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }
  create(dto: DocsDto) {
    console.log(dto);

    try {
      const Docs = this.prisma.docs.create({
        data: {
          name: dto.name,
          title: dto.title,
          slug: dto.slug,
        },
      });
      return Docs;
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }
  update(id: number, dto: DocsDto) {
    console.log(dto);
    try {
      const Docs = this.prisma.docs.update({
        where: { id },
        data: {},
      });
      return {
        status: 'success',
        errCode: 0,
        data: Docs,
      };
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }

  delete(id: number) {
    return `deleted Docs service with id: ${id}`;
  }
}
