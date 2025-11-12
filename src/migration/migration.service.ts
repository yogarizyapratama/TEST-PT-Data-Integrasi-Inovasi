import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmrPasien } from '../emr/emr.entity';
import { SimrsPasien } from '../simrs/simrs.entity';

@Injectable()
export class MigrationService {
  private readonly logger = new Logger(MigrationService.name);

  constructor(
    @InjectRepository(EmrPasien, 'emr')
    private readonly emrRepo: Repository<EmrPasien>,

    @InjectRepository(SimrsPasien, 'simrs')
    private readonly simrsRepo: Repository<SimrsPasien>,
  ) {}

  async migrate(batchSize = 1000): Promise<{ success: boolean; totalMigrated: number; duration: number; error?: string }> {
    const startTime = Date.now();
    let totalMigrated = 0;
    let offset = 0;

    try {
      this.logger.log('Starting migration process...');

      const totalRecords = await this.emrRepo.count();
      this.logger.log(`Found ${totalRecords} records in EMR database`);

      if (totalRecords === 0) {
        this.logger.warn('No records found in EMR database');
        return {
          success: true,
          totalMigrated: 0,
          duration: Date.now() - startTime,
        };
      }

      while (true) {
        const emrPatients = await this.emrRepo.find({
          skip: offset,
          take: batchSize,
          order: { id_pasien: 'ASC' },
        });

        if (emrPatients.length === 0) break;

        const simrsPatients = emrPatients.map((p) => {
          const patient = this.simrsRepo.create({
            id_pasien: p.id_pasien,
            nama_lengkap: `${p.nama_depan || ''} ${p.nama_belakang || ''}`.trim(),
            tanggal_lahir: p.tanggal_lahir,
            gender: p.jenis_kelamin,
            email: p.email,
            telepon: p.no_telepon,
            alamat_lengkap: p.alamat || '',
            kota: p.kota || '',
            provinsi: p.provinsi || '',
            kode_pos: p.kode_pos,
            golongan_darah: p.golongan_darah,
            nama_kontak_darurat: p.kontak_darurat,
            telepon_kontak_darurat: p.no_kontak_darurat,
            tanggal_registrasi: p.tanggal_registrasi,
          });

          return patient;
        });

        // Save batch with error handling
        try {
          await this.simrsRepo.save(simrsPatients);
          totalMigrated += emrPatients.length;
          offset += batchSize;
          
          const progress = ((offset / totalRecords) * 100).toFixed(2);
          this.logger.log(`Migrated ${totalMigrated}/${totalRecords} records (${progress}%)`);
        } catch (error) {
          this.logger.error(`Error saving batch at offset ${offset}:`, error.message);
          throw error;
        }
      }

      const duration = Date.now() - startTime;
      this.logger.log(`Migration complete! ${totalMigrated} records migrated in ${(duration / 1000).toFixed(2)}s`);

      return {
        success: true,
        totalMigrated,
        duration,
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error('Migration failed:', error.message);
      this.logger.error(error.stack);

      return {
        success: false,
        totalMigrated,
        duration,
        error: error.message,
      };
    }
  }
}
