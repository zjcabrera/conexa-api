import { Module } from '@nestjs/common';
import { SeedingService } from './services/seeds.service';

@Module({
  providers: [SeedingService],
})
export class SeedsModule {}
