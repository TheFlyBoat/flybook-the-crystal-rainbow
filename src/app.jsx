import { BookProvider } from "./context/book-context";
import ThemeWrapper from "./components/interface/theme-wrapper";
import Header from "./components/interface/header";
import BookEngine from "./components/book/book-engine";
import OrientationWarning from "./components/interface/orientation-warning";

function App() {
  return (
    <BookProvider>
      <ThemeWrapper>
        <div className="min-h-screen overflow-hidden relative">
          <OrientationWarning />
          <Header />
          <BookEngine />
        </div>
      </ThemeWrapper>
    </BookProvider>
  );
}

export default App;