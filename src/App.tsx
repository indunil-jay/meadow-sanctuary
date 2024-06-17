import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./layouts/AppLayout";

const App = () => {
  return (
    <>
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
