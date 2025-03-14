import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CursorContext } from "../components/context/CursorProvider";
import InnerImageZoom from "react-inner-image-zoom";

const AllCars = () => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState();
  const { setCursorsize } = useContext(CursorContext);
  const cars = useRef();
  const { brand } = useParams();

  useEffect(() => {
    const shuffleArray = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };

    const fetchData = async () => {
      try {
        // Tüm arabaları tek bir istekle çek
        const response = await fetch(
          `https://finalback-k90r.onrender.com/cars/search?${brand}`
        );
        const carsData = await response.json();

        // Verileri karıştır
        const shuffledData = shuffleArray(carsData);

        // State'i güncelle
        setData(shuffledData);

        // İlk arabanın resmini ayarla (eğer varsa)
        if (shuffledData.length > 0 && shuffledData[0].modelImage) {
          setImage(shuffledData[0].modelImage[0]);
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchData();
  }, [brand]);

  // Trigger smooth animation when the data changes

  return (
    <>
      <div id="overlay" className="flex">
        <div className="pt-[100px] md:pt-[200px] text-white md:w-[30%] xl:w-[20%]">
          <div
            ref={cars}
            className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-col gap-2 pt-[20px] md:py-[100px] px-2 md:pl-10"
          >
            {data.map((data) => (
              <Link
                key={data._id}
                to={`/allcars/${data.brand.toLowerCase()}/detail/${data._id}`}
                className="w-full h-full cards"
                onMouseEnter={() => {
                  setCursorsize({ cursorWidth: 80, cursorHeight: 80 });
                }}
                onMouseLeave={() => {
                  setCursorsize({ cursorWidth: 30, cursorHeight: 30 });
                }}
                onClick={() => {
                  setCursorsize({ cursorWidth: 30, cursorHeight: 30 });
                }}
              >
                <div
                  className="border-2 flex flex-col gap-[70px] border-white/10 p-3 bg-[#111]"
                  onMouseEnter={() => setImage(data.modelImage[0])}
                >
                  <img
                    src={data.modelImage[0]}
                    alt=""
                    className="object-cover h-full sm:h-[200px] md:h-full"
                  />
                  <p className="text-white/60 text-[14px]">
                    {data.modelName} ({data.brand})
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-[70%] lg:w-[60%] pr-10 hidden md:block fixed right-0 top-[50%] translate-y-[-50%]">
          {image && (
            <InnerImageZoom
              className="w-full h-full object-contain"
              src={image}
              alt=""
            />
          )}
        </div>
        <div
          id="bg-blur-photo"
          className="fixed hidden md:block top-0 left-0 w-screen h-screen -z-[1] grayscale-75 blur-xs"
        >
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </>
  );
};

export default AllCars;
