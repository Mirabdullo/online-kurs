import {Injectable} from "@nestjs/common";
import * as Minio from 'minio'
import {ConfigService} from "@nestjs/config";
@Injectable()
export class MinioService {
    private minioClient: Minio.Client
    private static readonly BUCKET_NAME='olp_bucket'

    constructor(private readonly configService: ConfigService) {
        this.minioClient = new Minio.Client({
            endPoint: configService.get('MINIO_END_POINT'),
            port: Number(configService.get('MINIO_PORT')),
            useSSL: false,  //If on localhost, keep it at false. If deployed on https, change to true
            access_key: configService.get<string>('MINIO_ACCESS_KEY'),
            secret_key: configService.get<string>('MINIO_SECRET_KEY')
        })
    }


    async createBucketIfNotExists(){
        const bucketExists = await this.minioClient.bucketExists(MinioService.BUCKET_NAME)
        if(!bucketExists){
            await this.minioClient.bucket
        }
    }
}