import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from "./pages/Home";
import Upload from "./pages/Upload";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;