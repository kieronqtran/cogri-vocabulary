import { ReflectMetadata } from '@nestjs/common';

export const Scopes = (...roles: string[]) => ReflectMetadata('scopes', roles);
