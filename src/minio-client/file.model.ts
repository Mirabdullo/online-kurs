export interface BufferedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: AppMimeType;
    size: number;
    buffer: Buffer | string;
  }
  
  export interface StoredFile extends HasFile, StoredFileMetadata {}
  
  export interface HasFile {
    file: Buffer | string;
  }
  
  export interface StoredFileMetadata {
    id: string;
    name: string;
    encoding: string;
    mimetype: AppMimeType;
    size: number;
    updatedAt: Date;
    fileSrc?: string;
  }
  
  export type AppMimeType = 'image/png' | 'image/jpeg' | 'image/svg+xml';









  /* 
          let upload_image: string = ''
        let upload_logo: string = ''
        console.log(files);
        if(files.image){
          console.log(files.image);
          const img = await this.minioClientService.upload(files.image[0])
          upload_image = img["url"]
        }
  
        if(files.logo){
          console.log("logo: ",files.logo);
          const logo = await this.minioClientService.upload(files.logo[0])
          upload_logo = logo["url"]
        }
        console.log("image: ",upload_image);
        console.log("logo: ",upload_logo);
        await this.courseRepository.create({
          ...createCourseDto,
          image: upload_image,
          logo: upload_logo,
        });
        return {
          statusCode: 201,
          message: 'Created',
        };
  */