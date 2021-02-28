import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useContext} from "../components/DataContext";
import BookModel from "../models/Book";
import Loader from "../components/Loader";
import Books from '../models/Books';
import Navigation from "../components/Reader/Navigation";
import Image from "../components/Reader/Image";

const Book: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  const {data} = useContext();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState<BookModel | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pageImageUrl, setPageImageUrl] = useState('');

  const handlePrev = () => {
    if (currentPageIndex - 1 >= 0) {
      setLoading(true);
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentPageIndex + 1 < (book?.totalPageCount ?? 0)) {
      setLoading(true);
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  useEffect(() => {
    if (!book) {
      // load book
      if (data.comicBooks?.length) {
        const comicBook = data.comicBooks?.find((book) => {
          return book.key === id;
        });

        if (comicBook) {
          setBook(comicBook);
        }
      } else {
        Books.getOne(id).then((book) => {
          if (book) {
            setBook(book);
          }
        });
      }
    } else if (book.pages.length) {
      // load page
      book.pages[currentPageIndex].getPictureUrl().then((imageUrl) => {
        setPageImageUrl(imageUrl);
        setLoading(false);
      })

      if (currentPageIndex + 1 < book.totalPageCount) {
        book.pages[currentPageIndex + 1].preload();
      }
    } else {
      // load book pages
      book.getPages().finally(() => {
        setCurrentPageIndex(book.currentPageIndex);
      });
    }
  }, [id, data, book, currentPageIndex]);

  return (
    <>
      <div>
        {loading ? (
          <Loader/>
        ) : (
          <Image src={pageImageUrl}/>
        )}
      </div>

      <Navigation
        //todo hide until clicked
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
};

export default Book;