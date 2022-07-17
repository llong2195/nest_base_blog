import 'module-alias/register';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ResponseTransformInterceptor } from './interceptors/response.transform.interceptor';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { ValidationConfig } from '@config/validation.config';
import { useContainer } from 'class-validator';
import { ValidatorModule } from '@validators/validator.module';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe(ValidationConfig));
  app.setGlobalPrefix(configService.get<string>('apiPrefix'));

  useContainer(app.select(ValidatorModule), { fallbackOnErrors: true });

  const port = configService.get<number>('port');
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
