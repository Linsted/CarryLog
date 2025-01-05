import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteOrderDto {
  @IsNotEmpty()
  @IsUUID()
  _id: string;
}
