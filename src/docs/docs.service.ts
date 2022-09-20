import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DocsDto } from './dto';
import { CreateDocs } from './interface';
import sharp from 'sharp';

@Injectable()
export class DocsService {
  constructor(
    private prisma: PrismaService,
    public cloudinary: CloudinaryService,
  ) {}
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
  async getOneDocByName(nameApi: string) {
    try {
      const Docs =
        await this.prisma.docs.findFirst({
          where: {
            slug: nameApi,
          },
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
  async createDocs(dto: DocsDto, files: any) {
    // console.log(files);
    try {
      const image =
        await this.cloudinary.uploadCloud(
          files.image,
        );
      const demoList =
        await this.cloudinary.uploadCloud(
          files.demoList,
        );
      const icon =
        await this.cloudinary.uploadCloud(
          files.icon,
        );
      const Docs = await this.prisma.docs.create({
        data: {
          name: dto.name,
          title: dto.title,
          slug: dto.slug,
          desc: dto.desc,
          icon: icon,
          image: image,
          demoList: demoList,
        },
      });
      return Docs;
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }
  async updateDocs(
    id: number,
    dto: CreateDocs,
    files: any,
  ) {
    // console.log(dto);
    // console.log(files);

    try {
      const { data } = await this.getOneDocs(id);
      if (files.image) {
        await this.cloudinary.deleteImage(
          data.image,
        );
        const image =
          await this.cloudinary.uploadCloud(
            files.image,
          );
        dto.image = image;
      }
      if (files.icon) {
        await this.cloudinary.deleteImage(
          data.icon,
        );
        const icon =
          await this.cloudinary.uploadCloud(
            files.icon,
          );
        dto.icon = icon;
      }
      if (files.demoList) {
        await this.cloudinary.deleteImage(
          data.demoList,
        );
        const demoList =
          await this.cloudinary.uploadCloud(
            files.demoList,
          );
        dto.demoList = demoList;
      }

      const Docs = await this.prisma.docs.update({
        where: { id },
        data: {
          name: dto?.name,
          title: dto?.title,
          slug: dto?.slug,
          desc: dto?.desc,
          icon: dto?.icon,
          image: dto?.image,
          demoList: dto?.demoList,
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

  async deleteDocs(id: number) {
    try {
      const { data } = await this.getOneDocs(id);
      await this.cloudinary.deleteImage(
        data.image,
      );
      await this.cloudinary.deleteImage(
        data.icon,
      );
      await this.cloudinary.deleteImage(
        data.demoList,
      );
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
