import React, {createContext, useContext as useReactContext} from "react";
import Book from "../models/Book";

interface Context {
  user: string;
  comicBooks?: Book[];
}

type OptionalContext = Partial<Context>;

interface DataContextType {
  data: Context;
  setData: (newData: OptionalContext) => void;
}

const defaultData: Context = {
  user: ''
}

const DataContext = createContext<DataContextType>({
  data: defaultData,
  setData: (newData) => {
  }
});

/**
 * Just shortener for getting data context
 */
export function useContext(): DataContextType {
  return useReactContext(DataContext);
}

/**
 * Context provider component
 */
export class DataProvider extends React.Component<{
  children: any;
}, {
  data: Context;
  setData: (newData: OptionalContext) => void;
}> {
  constructor(props: { children: any }) {
    super(props);

    this.state = {
      data: defaultData,
      setData: this.handleDataChange,
    };
  }

  handleDataChange = (newData: OptionalContext) => {
    const newDataObject = new Map();

    Object.keys(newData).forEach((key) => {
      newDataObject.set(key, newData[key as keyof OptionalContext]);
    });

    this.setState((state) => ({
      data: {...state.data, ...Object.fromEntries(newDataObject)}
    }));
  };

  render() {
    return (
      <DataContext.Provider value={this.state}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}