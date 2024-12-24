import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { USER_ROLES } from '@carry/constants';
import { IUser } from '@carry/interfaces';

@Schema()
export class User extends Document implements IUser {
  @Prop()
  _id: string;

  @Prop()
  displayName?: string;

  @Prop({ required: true })
  email: string;

  @Prop({
    required: false,
    enum: USER_ROLES,
    type: String,
    default: USER_ROLES.CLIENT,
  })
  role: USER_ROLES;
}

export const UserSchema = SchemaFactory.createForClass(User);
