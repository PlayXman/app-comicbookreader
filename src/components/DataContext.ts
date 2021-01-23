import {createContext, useContext as useReactContext} from "react";

export interface ComicBook {
  id: string;
  title: string;
  pageCount: number;
  pages: string[];
}

interface Context {
  user: string;
  comicBooks?: ComicBook[];
}

export const defaultData: Context = {
  user: ''
}
export const DataContext = createContext<Context>(defaultData);
export function useContext() {
  return useReactContext(DataContext);
}