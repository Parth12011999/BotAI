import { BrowserRouter, useRoutes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { publicRoutes } from "./routes";

function AppRoutes() {
  const routes = useRoutes(publicRoutes);
  return routes;
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
