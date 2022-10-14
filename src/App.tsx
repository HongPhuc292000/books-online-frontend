import React, { Suspense } from "react";
import Router from "app/routes";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "styles/theme/GlobalStyles";
import ThemeConfig from "styles/theme";
import LazyLoad from "app/components/LazyLoad";

const globalStyles = <GlobalStyles />;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeConfig>
          {globalStyles}
          <Suspense fallback={<LazyLoad />}>
            <Router />
          </Suspense>
        </ThemeConfig>
      </BrowserRouter>
    </div>
  );
}

export default App;
