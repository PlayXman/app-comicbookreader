import firebase from "firebase";
import User from "./User";
import {DB_NAME} from "./Books";

export interface ComicBook {
  title: string;
  coverImage: string;
  currentPage: number;
}

class Book implements ComicBook {
  title: string = '';
  key: string = '';
  coverImage: string = '';
  currentPage: number = 1;

  constructor(book?: ComicBook) {
    if (book) {
      Object.keys(book).forEach((key) => {
        // @ts-ignore
        this[key] = book[key];

        if (key === 'title') {
          this.key = book.title; //todo slugify
        }
      });
    }
  }

  async save() {
    //todo save to db

    const userId = User.getUid();
    const x = await firebase.database().ref(`${userId}/${DB_NAME}/${this.key}`).set(this.toDbObj());
    console.log(x);
  }

  saveCurrentPage(pageNumber: number) {
    //todo save to db
  }

  private toDbObj(): ComicBook {
    return {
      title: this.title,
      coverImage: this.coverImage,
      currentPage: this.currentPage
    };
  }
}

export default Book;