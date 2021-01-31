import firebase from "firebase";
import User from "./User";
import {DB_NAME} from "./Books";
import slugify from "slugify";
import Page from "./Page";

export interface ComicBook {
  title: string;
  coverImageFileName: string;
  currentPageIndex: number;
  totalPageCount: number;
}

class Book implements ComicBook {
  title: string = '';
  key: string = '';
  coverImageFileName: string = '';
  currentPageIndex: number = 0;
  totalPageCount: number = 0;
  pages: Page[] = [];
  private coverImageUrl = '';


  constructor(book?: ComicBook) {
    if (book) {
      Object.keys(book).forEach((key) => {
        // @ts-ignore
        this[key] = book[key];

        if (key === 'title') {
          this.key = slugify(book.title);
        }
      });
    }
  }

  async getPages(): Promise<Page[]> {
    if (this.pages.length === 0) {
      const userId = User.getUid();
      const pages: Page[] = [];

      const snapshot = await firebase.storage().ref(`${userId}/${this.key}`).listAll();
      snapshot.items.forEach((item) => {
        pages.push(new Page(item));
      })

      this.pages = pages;
    }

    return this.pages;
  }

  async getCoverImage(): Promise<string> {
    if (this.coverImageUrl.length) {
      return this.coverImageUrl;
    }

    const userId = User.getUid();
    const imageUrl = await firebase.storage().ref(`${userId}/${this.key}/${this.coverImageFileName}`).getDownloadURL();

    this.coverImageUrl = imageUrl;
    return imageUrl;
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
      coverImageFileName: this.coverImageFileName,
      currentPageIndex: this.currentPageIndex,
      totalPageCount: this.totalPageCount
    };
  }
}

export default Book;