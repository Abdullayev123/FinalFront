import Lenis from "./components/config/Lenis";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import About from "./pages/Home";
import AllCars from "./pages/AllCars";
import Loading from "./components/config/Loading";
import SpecificBrand from "./pages/SpecificBrand";
import Detail from "./pages/Detail";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/CarBrands";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function AnimatedRoutes() {
  const location = useLocation(); // Now it's inside BrowserRouter

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayouts />}>
          <Route path="/" element={<About />} />
          <Route path="/car-brands" element={<Home />} />
          <Route path="/allcars" element={<AllCars />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/allcars/:brand" element={<SpecificBrand />} />
          <Route path="/allcars/:brand/detail/:id" element={<Detail />} />
          <Route path="*" element={<NotFound />} /> {/* 404 route */}
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <>
      <Loading />
      <BrowserRouter>
        <Lenis>
          <AnimatedRoutes />
        </Lenis>
      </BrowserRouter>
    </>
  );
}

export default App;
