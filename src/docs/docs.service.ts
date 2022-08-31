import { PrismaService } from '../prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DocsDto } from './dto';
import { CreateDocs } from './interface';

@Injectable()
export class DocsService {
  constructor(private prisma: PrismaService) {}
  async getAllDocs(
    q?: string,
    sort?: string,
    limit?: number,
    skip?: number,
  ) {
    try {
      const Docs =
        await this.prisma.docs.findMany({
          take: limit,
          skip: skip,
          orderBy: [
            sort && {
              name: sort as 'asc' | 'desc',
            },
          ],
          include: {
            CodeBlock: true,
          },
          where: {
            OR: q && [
              {
                name: {
                  contains: q,
                },
              },
            ],
          },
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
  async getOneDocs(id: number) {
    try {
      const Docs =
        await this.prisma.docs.findUnique({
          where: { id },
          include: {
            CodeBlock: true,
          },
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
  async createDocs(dto: DocsDto) {
    // console.log(dto);
    try {
      const Docs = await this.prisma.docs.create({
        data: {
          name: dto.name,
          title: dto.title.split(','),
          slug: dto.slug.split(','),
        },
      });
      return Docs;
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }
  async updateDocs(id: number, dto: CreateDocs) {
    // console.log(dto);
    const data = {
      name: dto?.name,
      title: dto?.title?.split(','),
      slug: dto?.slug?.split(','),
    };

    try {
      const Docs = await this.prisma.docs.update({
        where: { id },
        data,
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

  async deleteDocs(id: number) {
    try {
      await this.prisma.docs.delete({
        where: { id },
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
