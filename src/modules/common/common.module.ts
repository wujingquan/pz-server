import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UploadModule } from './upload/upload.module';

@Module({
  controllers: [],
  imports: [
    RouterModule.register([
      {
        path: 'common',
        module: UploadModule,
      },
    ]),
    UploadModule,
  ],
})
export class CommonModule {}
