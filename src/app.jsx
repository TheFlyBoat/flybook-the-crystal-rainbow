import { BookProvider } from "from "./context/book-context"";
import ThemeWrapper from "from "./components/interface/theme-wrapper"";
import Header from "from "./components/interface/header"";
import BookEngine from "from "./components/book/book-engine"";

function App() {
  return (
    <BookProvider>
      <ThemeWrapper>
        <div className="min-h-screen overflow-hidden relative">
          <Header />
          <BookEngine />
        </div>
      </ThemeWrapper>
    </BookProvider>
  );
}

export default App;