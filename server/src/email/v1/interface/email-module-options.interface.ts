import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface EmailModuleOptions {
}

export interface EmailOptionsFactory {
  createEmailOptions(): Promise<EmailModuleOptions> | EmailModuleOptions;
}

export interface EmailModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<EmailOptionsFactory>;
  useClass?: Type<EmailOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<EmailModuleOptions> | EmailModuleOptions;
  inject?: any[];
}
