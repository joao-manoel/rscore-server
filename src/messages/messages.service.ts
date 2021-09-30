import { Injectable } from '@nestjs/common';
import { Message } from './Message';


@Injectable()
export class MessagesService {

  public messages: Message[] = [
    {
      id: 1,
      text: 'Primeira mensagem'
    },
    {
      id: 2,
      text: 'Segunda mensagem'
    }
  ];

  findAll(): Message[] {
    return this.messages;
  }

  findById(id: number): Message {
    return this.messages.find(message => message.id === id);
  }

  create(message: Message): Message{
    this.messages.push(message)
    return message;
  }

  update(id: number, message: Message): Message {
    const index = this.messages.findIndex((message) => message.id === id);
    console.log(index)
    this.messages[index] = message;

    return message;
  }

  delete(id: number): void {
    const index = this.messages.findIndex((message) => message.id === id);

    delete this.messages[index];
  }
}
