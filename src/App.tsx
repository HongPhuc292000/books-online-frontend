import Router from "app/routes";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "styles/theme/GlobalStyles";
import ThemeConfig from "styles/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const globalStyles = <GlobalStyles />;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeConfig>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            {globalStyles}
            <Router />
          </LocalizationProvider>
        </ThemeConfig>
      </BrowserRouter>
    </div>
  );
}

export default App;
