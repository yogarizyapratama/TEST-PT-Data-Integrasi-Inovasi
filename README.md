# Data Migration Service - EMR to SIMRS

Aplikasi NestJS untuk melakukan migrasi data pasien dari database EMR (Electronic Medical Record) ke database SIMRS (Sistem Informasi Manajemen Rumah Sakit).

## 📋 Deskripsi

Aplikasi ini dibangun menggunakan NestJS dan TypeORM untuk melakukan migrasi data pasien dari sistem EMR lama ke sistem SIMRS yang baru. Proses migrasi dilakukan secara batch untuk efisiensi dan mencakup transformasi data sesuai dengan skema database tujuan.

## 🚀 Fitur

- ✅ Migrasi data batch dengan performa optimal
- ✅ Error handling yang komprehensif
- ✅ Logging detail untuk monitoring proses
- ✅ Progress tracking realtime
- ✅ Validasi data sebelum migrasi
- ✅ Timestamp audit trail (created_at, updated_at)
- ✅ REST API endpoint untuk trigger migrasi
- ✅ Multi-database connection support

## 🏗️ Struktur Database

### Database EMR (Source)
```
Table: pasien
- id_pasien (Primary Key)
- nama_depan, nama_belakang
- tanggal_lahir
- jenis_kelamin
- email, no_telepon
- alamat, kota, provinsi, kode_pos
- golongan_darah
- kontak_darurat, no_kontak_darurat
- tanggal_registrasi
- created_at, updated_at
```

### Database SIMRS (Destination)
```
Table: pasien
- pasien_uuid (Primary Key, UUID)
- nama_lengkap
- tanggal_lahir
- gender
- email, telepon
- alamat_lengkap, kota, provinsi, kode_pos
- golongan_darah
- nama_kontak_darurat, telepon_kontak_darurat
- tanggal_registrasi
- created_at, updated_at
```

## 📦 Instalasi

```bash
# Clone repository
git clone <repository-url>
cd takspindahindata

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env dengan konfigurasi database Anda
nano .env
```

## ⚙️ Konfigurasi

Edit file `.env` dengan konfigurasi database Anda:

```env
# Database EMR Configuration
EMR_DB_HOST=localhost
EMR_DB_PORT=5432
EMR_DB_USERNAME=admin
EMR_DB_PASSWORD=1234
EMR_DB_DATABASE=appdb

# Database SIMRS Configuration
SIMRS_DB_HOST=localhost
SIMRS_DB_PORT=5432
SIMRS_DB_USERNAME=admin
SIMRS_DB_PASSWORD=1234
SIMRS_DB_DATABASE=simrs

# Application Configuration
APP_PORT=3000
NODE_ENV=development

# Migration Settings
MIGRATION_BATCH_SIZE=1000
```

## 🎮 Menjalankan Aplikasi

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

Aplikasi akan berjalan di `http://localhost:3000`

## 📡 API Endpoints

### Trigger Migration

**Endpoint:** `POST /migration`

**Description:** Memulai proses migrasi data dari EMR ke SIMRS

**Response Success:**
```json
{
  "statusCode": 200,
  "message": "Migration completed successfully",
  "data": {
    "totalMigrated": 5000,
    "duration": "12.45s"
  }
}
```

**Response Error:**
```json
{
  "statusCode": 500,
  "message": "Migration failed",
  "error": "Connection timeout",
  "totalMigrated": 2500,
  "duration": "8.30s"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/migration
```

## 🔍 Monitoring & Logging

Aplikasi menyediakan logging detail yang dapat dimonitor:

```
[MigrationService] 🚀 Starting migration process...
[MigrationService] Found 5000 records in EMR database
[MigrationService] ✓ Migrated 1000/5000 records (20.00%)
[MigrationService] ✓ Migrated 2000/5000 records (40.00%)
[MigrationService] ✓ Migrated 3000/5000 records (60.00%)
[MigrationService] ✓ Migrated 4000/5000 records (80.00%)
[MigrationService] ✓ Migrated 5000/5000 records (100.00%)
[MigrationService] ✅ Migration complete! 5000 records migrated in 12.45s
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📝 Transformasi Data

Data ditransformasi dengan mapping berikut:

| EMR Field | SIMRS Field | Transform |
|-----------|-------------|-----------|
| `nama_depan + nama_belakang` | `nama_lengkap` | Concatenate |
| `jenis_kelamin` | `gender` | Direct |
| `no_telepon` | `telepon` | Direct |
| `alamat` | `alamat_lengkap` | Direct |
| `kontak_darurat` | `nama_kontak_darurat` | Direct |
| `no_kontak_darurat` | `telepon_kontak_darurat` | Direct |

## 🛡️ Error Handling

- Validasi data sebelum migrasi
- Batch processing dengan error recovery
- Detailed error logging dengan stack trace
- Graceful failure dengan status reporting

## 🔒 Security Best Practices

- ✅ Database credentials di environment variables
- ✅ .env file tidak di-commit ke repository
- ✅ Input validation pada semua endpoints
- ✅ Error messages tidak expose sensitive data

## 🚀 Deployment

```bash
# Build aplikasi
npm run build

# Jalankan production server
npm run start:prod
```

## 📚 Tech Stack

- **Framework:** NestJS 10.x
- **Language:** TypeScript 5.x
- **ORM:** TypeORM 0.3.x
- **Database:** PostgreSQL
- **Runtime:** Node.js 20.x

## 👨‍💻 Development

```bash
# Format code
npm run format

# Lint code
npm run lint
```

## 📄 License

[MIT licensed](LICENSE)

## 👤 Author

Your Name - [@yourhandle](https://twitter.com/yourhandle)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if this project helped you!
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
# TEST-PT-Data-Integrasi-Inovasi
