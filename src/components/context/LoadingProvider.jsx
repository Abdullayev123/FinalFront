import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const LoadingContext = createContext();
// eslint-disable-next-line react/prop-types
function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export default LoadingProvider;
