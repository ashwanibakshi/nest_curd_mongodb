/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserCredsDocument = UserCreds & Document;

@Schema()
export class UserCreds {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;
}

export const UserCredSchema = SchemaFactory.createForClass(UserCreds);
