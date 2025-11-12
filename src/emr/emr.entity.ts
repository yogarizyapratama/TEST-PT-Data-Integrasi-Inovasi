import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('pasien')
export class EmrPasien {
  @PrimaryColumn()
  id_pasien: number;

  @Column()
  nama_depan: string;

  @Column()
  nama_belakang: string;

  @Column({ type: 'date' })
  tanggal_lahir: Date;

  @Column()
  jenis_kelamin: string;

  @Column()
  email: string;

  @Column()
  no_telepon: string;

  @Column()
  alamat: string;

  @Column()
  kota: string;

  @Column()
  provinsi: string;

  @Column({ nullable: true })
  kode_pos: string;

  @Column({ nullable: true })
  golongan_darah: string;

  @Column({ nullable: true })
  kontak_darurat: string;

  @Column({ nullable: true })
  no_kontak_darurat: string;

  @Column({ type: 'date' })
  tanggal_registrasi: Date;
}
