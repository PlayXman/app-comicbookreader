import React, {createContext, useContext as useReactContext} from "react";

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

const DataContext = createContext<Context>(defaultData);

export function useContext() {
  return useReactContext(DataContext);
}

export const DataProvider: React.FC<{children: any}> = ({children}) => {
  return (
    <DataContext.Provider value={defaultData}>
      {children}
    </DataContext.Provider>
  );
}