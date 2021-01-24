import Book, {ComicBook} from "./Book";

class Books {
  static async getAll(): Promise<ComicBook[] | undefined> {
    //todo whole func
    const book = new Book();
    book.title = 'Voyage at the parallel universe was the devastation';
    book.coverImage = 'https://img.cinemablend.com/filter:scale/quill/3/d/b/a/9/8/3dba98f3b6b3acd1a05018c9958d3cebce9cd25f.jpg?mw=600';

    return [
      book,
      book,
    ];
  }
}

export default Books;