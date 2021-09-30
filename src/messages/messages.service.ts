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
    return this.messages.filter(Boolean);
  }

  async findById(id: number): Promise<Message> {
    const message = this.messages.find((msg: Message) => msg?.id === id);

    if(!message){
      throw Error(`Mensagem com o id ${id} não encontrado.`);
    }

    return message;
  }

  create(messageDto: MessageDto): Message {
    const id = this.messages.length + 1;

    const message: Message = {
      id,
      ...messageDto,
    };

    this.messages.push(message);


    return message;
  }

  async update(id: number, messageDto: MessageDto): Promise<Message> {
    const index = this.messages.findIndex((msg: Message) => msg?.id === id);

    if(index < 0){
      throw Error(`Mensagem com o id ${id} não encontrado.`);
    }
    
    const message: Message = {
      id,
      ...messageDto,
    };

    this.messages[index] = message;

    return message;
  }

  async delete(id: number): Promise<void> {
    const index = this.messages.findIndex((msg: Message) => msg?.id === id);

    if(index < 0){
      throw Error(`Mensagem com o id ${id} não encontrado.`);
    }

    delete this.messages[index];
  }
}
