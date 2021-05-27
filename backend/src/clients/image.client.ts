export interface ImageClient {
  uploadAvatar(buffer: Buffer): Promise<string>;
  uploadPost(buffer: Buffer): Promise<string>;
}
