import Book, {ComicBook} from "./Book";
import firebase from "firebase";
import User from "./User";

export const DB_NAME = 'books';

class Books {
  static async getAll(): Promise<Book[] | undefined> {
    const userId = User.getUid();
    const snapshot = await firebase.database().ref(`${userId}/${DB_NAME}`).once('value');

    if (snapshot.exists()) {
      const results: Book[] = [];

      snapshot.forEach((book) => {
        results.push(new Book(book.val()));
      });

      return results;
    }

    return [];
  }

  static async createNewBook(comicBook: ComicBook) {
    const book = new Book(comicBook);

    return book.save();
  }
}

export default Books;