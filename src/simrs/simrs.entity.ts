import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('pasien')
export class SimrsPasien {
  @PrimaryColumn()
  id_pasien: number;

  @Column()
  nama_lengkap: string;

  @Column({ type: 'date' })
  tanggal_lahir: Date;

  @Column()
  gender: string;

  @Column()
  email: string;

  @Column()
  telepon: string;

  @Column()
  alamat_lengkap: string;

  @Column()
  kota: string;

  @Column()
  provinsi: string;

  @Column({ nullable: true })
  kode_pos: string;

  @Column({ nullable: true })
  golongan_darah: string;

  @Column({ nullable: true })
  nama_kontak_darurat: string;

  @Column({ nullable: true })
  telepon_kontak_darurat: string;

  @Column({ type: 'date' })
  tanggal_registrasi: Date;
}
