import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./route/Router";
import { useEffect, useState } from "react";
import Loading from "./components/common/Loading";
import { HelmetProvider } from "react-helmet-async";
import { GlobalStyles } from "./assets/style/GlobalStyles";

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <RecoilRoot>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          {isLoading ? <Loading /> : <RouterProvider router={router} />}
        </HelmetProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
