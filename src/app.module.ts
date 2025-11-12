// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmrPasien } from './emr/emr.entity';
import { SimrsPasien } from './simrs/simrs.entity';
import { MigrationModule } from './migration/migration.module';

@Module({
  imports: [
    // koneksi ke database EMR
    TypeOrmModule.forRoot({
      name: 'emr',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '1234',
      database: 'appdb',
      entities: [EmrPasien],
      synchronize: false, // jangan true di production
    }),

    // koneksi ke database SIMRS
    TypeOrmModule.forRoot({
      name: 'simrs',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '1234',
      database: 'simrs',
      entities: [SimrsPasien],
      synchronize: false,
    }),

    MigrationModule,
  ],
})
export class AppModule {}
