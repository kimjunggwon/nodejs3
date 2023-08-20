import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//blog와 document 타입 정의
export type BlogDocument = Blog & Document;

//Schema 정의
@Schema()
export class Blog {
    //Schema Property 정의
    @Prop()
    id: string;

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    name: string;

    @Prop()
    createdDt: Date;

    @Prop()
    updatedDt: Date;
}

//Schema 생성
export const BlogSchema = SchemaFactory.createForClass(Blog);