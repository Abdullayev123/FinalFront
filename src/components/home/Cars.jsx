import gsap from "gsap";
import {
  useContext,
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { LoadingContext } from "../context/LoadingProvider";
import { CursorContext } from "../context/CursorProvider";

const Cars = () => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState(
    "https://res.cloudinary.com/dlajjeqxv/image/upload/v1740328247/2024-bmw-i7-m70-132-650b228506ed9_eiybuf.jpg"
  );
  const [activeBrand, setActiveBrand] = useState("Bmw");
  // loading context
  const { loading } = useContext(LoadingContext);
  // Context for mouse cursor size
  const { setCursorsize } = useContext(CursorContext);
  // 🛠️ Use Refs for GSAP Animations
  const carImageRef = useRef(null);
  const brandLinksRef = useRef([]);
  const carNamesRef = useRef(null);

  // 🛠️ Fetch Data Safely
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/home");
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  // ✅ Fix GSAP Target Not Found (Use `useRef`)
  useLayoutEffect(() => {
    if (carImageRef.current) {
      gsap.fromTo(
        carImageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "none" }
      );
    }
  }, [image]);

  useEffect(() => {
    if (!loading && brandLinksRef.current.length > 0) {
      gsap.set(brandLinksRef.current, { y: "100%" });

      gsap.to(brandLinksRef.current, {
        y: 0,
        duration: 1,
        delay: 1,
        stagger: 0.2,
        ease: "power4.out",
      });
    }
  }, [loading]);

  return (
    <>
      {/* DESKTOP VIEW */}
      <div id="hero" className="relative md:py-[200px] z-10 hidden md:block">
        <div
          id="car-names"
          ref={carNamesRef}
          className="h-full flex flex-col pl-10 gap-[30px]" // Başlangıç gap değeri 30px
        >
          {data.length > 0 &&
            data.map((car, index) => (
              <div key={car._id} className="overflow-hidden">
                <div
                  ref={(el) => (brandLinksRef.current[index] = el)}
                  className="brand-links"
                >
                  <Link
                    to={`/allcars/${car.brand.toLowerCase()}`}
                    className={`text-[10vw] transition-all duration-300 leading-[1] ${
                      activeBrand === car.brand ? "text-white" : "text-white/30"
                    }`} // ✅ Keep white if active
                    onMouseEnter={() => {
                      setActiveBrand(car.brand);
                      setImage(car.image);
                      setCursorsize({ cursorWidth: 80, cursorHeight: 80 });
                    }}
                    onMouseLeave={() => {
                      setCursorsize({ cursorWidth: 30, cursorHeight: 30 });
                    }}
                    onClick={() => {
                      setCursorsize({ cursorWidth: 30, cursorHeight: 30 });
                    }}
                  >
                    {car.brand}
                  </Link>
                </div>
              </div>
            ))}
        </div>

        <div
          id="car-image-container"
          className="h-screen w-full fixed z-[-1] left-0 top-0 bg-black"
        >
          <img
            ref={carImageRef}
            className="w-[600px] h-[400px] fixed object-cover right-5 top-[50%] translate-y-[-50%] object-right hidden md:block xl:w-[800px] xl:h-[500px]"
            src={image}
            alt="Car"
          />
        </div>
        <div
          id="top-gradient"
          className="fixed top-0 left-0 w-full h-30 bg-black hidden md:block"
        />
        <div
          id="bottom-gradient"
          className="fixed bottom-0 left-0 w-full h-20 bg-black hidden md:block"
        />
      </div>

      {/* MOBILE VIEW */}
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:hidden bg-black py-[100px]">
        {data.length > 0 &&
          data.map((car) => (
            <div key={car._id} className="text-white hover:text-[#fff] p-3">
              <Link to={`/allcars/${car.brand.toLowerCase()}`}>
                <div className="w-full">
                  <img
                    src={car.image}
                    alt={car.brand}
                    className="w-full h-full aspect-[16/9] object-cover object-bottom"
                  />
                </div>
                <h1 className="text-xl">{car.brand}</h1>
                <p className="text-white/60 text-[12px]">{car.description}</p>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default Cars;
