import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SearchBox from "./components/SearchBox";
import StockOverView from "./components/StockOverview";
import { AppProvider } from "./providers";

function App() {

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/stock-finder"
            element={
              <>
                <SearchBox />
                <StockOverView />
              </>
            }
          />
          <Route path="/" element={<Navigate replace to="/stock-finder" />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App;
