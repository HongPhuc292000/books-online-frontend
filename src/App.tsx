import Router from "app/routes";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "styles/theme/GlobalStyles";
import ThemeConfig from "styles/theme";

const globalStyles = <GlobalStyles />;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeConfig>
          {globalStyles}
          <Router />
        </ThemeConfig>
      </BrowserRouter>
    </div>
  );
}

export default App;
