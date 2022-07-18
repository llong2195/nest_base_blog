import { SetMetadata } from '@nestjs/common';

export const IsPublic_KEY = 'isPublic';
export const isPublics = () => SetMetadata(IsPublic_KEY, true);
