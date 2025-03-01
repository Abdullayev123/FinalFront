import { Outlet } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import PageTransition from "../components/config/PageTransition";

const MainLayouts = () => {
  return (
    <>
      <PageTransition text="Welcome" bgColor="#111" textColor="#fff">
        <Navbar />
        <Outlet />
        <Footer />
      </PageTransition>
    </>
  );
};

export default MainLayouts;
