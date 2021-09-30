import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AppController } from './app.controller';
import { MessagesModule } from './messages/messages.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [MessagesModule, UserModule, RoleModule, PermissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
