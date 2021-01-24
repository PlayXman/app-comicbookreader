export interface ComicBook {
  id: string;
  title: string;
  coverImage: string;
  pageCount: number;
  pages: string[];
}

class Book implements ComicBook {
  id: string = '';
  title: string = '';
  coverImage: string = '';
  pageCount: number = 0;
  pages: string[] = [];
}

export default Book;