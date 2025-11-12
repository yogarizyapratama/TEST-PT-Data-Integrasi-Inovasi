import { Module } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { MigrationController } from './migration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmrPasien } from '../emr/emr.entity';
import { SimrsPasien } from '../simrs/simrs.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmrPasien], 'emr'),
    TypeOrmModule.forFeature([SimrsPasien], 'simrs'),
  ],
  controllers: [MigrationController],
  providers: [MigrationService]
})
export class MigrationModule {}