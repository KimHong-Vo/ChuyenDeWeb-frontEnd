import { Book } from "../models/book";

export class BookFilterResponse{
    books!: Book[];
    totalItem!: number;
}