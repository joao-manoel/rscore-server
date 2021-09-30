import { Injectable } from '@nestjs/common';
import { Message } from './Message';
import { MessageDto } from './MessageDto';


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

  async findById(id: number): Promise<Message> {
    const message = this.messages.find((msg: Message) => msg.id === id);

    if(!message){
      throw Error(`Mensagem com o id ${id} não encontrado.`);
    }

    return message;
  }

  create(messageDto: MessageDto){
    const id = this.messages.length + 1;

    const message: Message = {
      id,
      ...messageDto,
    };
    
    this.messages.push(message);


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
