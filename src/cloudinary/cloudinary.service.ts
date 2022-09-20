import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2,
} from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<
    UploadApiResponse | UploadApiErrorResponse
  > {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      // console.log(upload);

      toStream(file.buffer).pipe(upload);
    });
  }
  async deleteImageCloud(
    publicId: string,
  ): Promise<
    UploadApiResponse | UploadApiErrorResponse
  > {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(
        publicId,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
    });
  }

  async uploadImageCloud(item: any) {
    try {
      const image = await this.uploadImage(
        item,
      ).catch(() => {
        throw new BadRequestException(
          'Invalid file type.',
        );
      });
      // console.log(image);
      return {
        public_id: image.public_id,
        url: image.url,
      };
    } catch (err) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }

  async uploadCloud(
    files?: Express.Multer.File[],
  ) {
    try {
      const demoList = await Promise.all(
        files.map(async (item) => {
          return await this.uploadImageCloud(
            item,
          );
        }),
      );
      return demoList;
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }
  async deleteImage(item: any) {
    try {
      item.map(async (item) => {
        return await this.deleteImageCloud(
          item['public_id'],
        );
      });
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }
}
