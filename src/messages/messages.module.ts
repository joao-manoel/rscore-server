import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MessageMiddleware } from 'src/middleware/message.middleware';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports: [MessagesModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule{

  configure(consumer: MiddlewareConsumer){
    consumer.apply(MessageMiddleware).forRoutes('messages')
  }
}
