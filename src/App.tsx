import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import LoginPage from "./app/login/page";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LoginPage />
    </ThemeProvider>
  );
}

export default App;
