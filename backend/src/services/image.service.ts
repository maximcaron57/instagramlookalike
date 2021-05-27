import { BadRequestError } from '../types/errors';
import { logger } from '../middlewares/logger';
import { ImageClient } from '../clients/image.client';
import { S3ImageClient } from '../clients/s3/s3.image.client';
import { resizeImage } from '../util/imageUtil';

const DATA_TYPE_REGEX = /^data:image\/(?:png|jpeg)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/;
const MAX_FILE_SIZE_IN_BYTES = 5872026;
const THUMBNAIL_DIMENSIONS = { height: 400, width: 225 };
export class ImageService {
  private s3Client: ImageClient = new S3ImageClient();

  public async uploadAvatar(data: string): Promise<string> {
    logger.info('Uploading avatar');

    const buffer = ImageService.validateImage(data);
    return this.s3Client.uploadAvatar(buffer);
  }

  public async uploadPost(data: string): Promise<string> {
    logger.info('Uploading post');

    const buffer = ImageService.validateImage(data);
    return this.s3Client.uploadPost(buffer);
  }

  public async uploadThumbnail(data: string): Promise<string> {
    logger.info('Uploading thumbnail');
    const buffer = ImageService.validateImage(data);

    const resizedString = await resizeImage(
      buffer,
      THUMBNAIL_DIMENSIONS.height,
    );

    return this.uploadPost(resizedString);
  }

  private static validateImage(data: string): Buffer {
    ImageService.validateDataType(data);

    const parsedData = data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(parsedData, 'base64');
    ImageService.validateBufferSize(buffer);

    return buffer;
  }

  private static validateDataType(data: string) {
    if (!DATA_TYPE_REGEX.test(data)) {
      throw new BadRequestError('Invalid image type (not JPEG or PNG)');
    }
  }

  private static validateBufferSize(buffer: Buffer) {
    if (buffer.byteLength > MAX_FILE_SIZE_IN_BYTES) {
      throw new BadRequestError('Image too large (over 4MB)');
    }
  }
}
