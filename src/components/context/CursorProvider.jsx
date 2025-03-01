import { createContext, useState } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const CursorContext = createContext();
// eslint-disable-next-line react/prop-types
const CursorProvider = ({ children }) => {
  const [cursorsize, setCursorsize] = useState({
    width: 30,
    height: 30,
  });
  return (
    <CursorContext.Provider value={{ cursorsize, setCursorsize }}>
      {children}
    </CursorContext.Provider>
  );
};

export default CursorProvider;
