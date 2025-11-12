import { Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { MigrationService } from './migration.service';

@Controller('migration')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) {}

  @Post()
  async migrate() {
    try {
      const result = await this.migrationService.migrate();

      if (!result.success) {
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Migration failed',
            error: result.error,
            totalMigrated: result.totalMigrated,
            duration: `${(result.duration / 1000).toFixed(2)}s`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Migration completed successfully',
        data: {
          totalMigrated: result.totalMigrated,
          duration: `${(result.duration / 1000).toFixed(2)}s`,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Migration failed',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
