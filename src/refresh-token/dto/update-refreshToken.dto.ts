import { PartialType } from '@nestjs/mapped-types';
import { CreateRefreshTokenDto } from './create-refreshToken.dto';

export class UpdateRefreshTokenDto extends PartialType(CreateRefreshTokenDto) {}
