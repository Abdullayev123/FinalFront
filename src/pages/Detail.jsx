import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import BackButton from "../components/details/BackButton";
import CarModal from "../components/details/CarModal";
import CarInfo from "../components/details/CarInfo";

gsap.registerPlugin(ScrollTrigger);

const Detail = () => {
  const { brand, id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Hata durumu eklendi
  const [image, setImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const timeLine = useRef(null);
  const [text, setText] = useState("");

  // Fetch Data with Loading & Error Handling
  useEffect(() => {
    let isMounted = true; // Cleanup için mount durumu kontrolü
    setIsLoading(true);
    setError(null);

    fetch(`https://finalback-k90r.onrender.com/cars/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Car data could not be fetched");
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setData(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error("Error fetching car data:", error);
          setError("Failed to load car details.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false; // Component unmount edildiğinde fetch iptal edilir
    };
  }, [brand, id]);

  // GSAP Animations
  useEffect(() => {
    if (!timeLine.current) {
      timeLine.current = gsap.timeline({ paused: true });
    }

    if (isOpen) {
      timeLine.current.play();
    } else {
      timeLine.current.reverse();
    }
  }, [isOpen]);

  // Sayfa açıldığında yukarı kaydır

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <p className="text-white text-xl">Loading...</p>
        </div>
      ) : error ? (
        <div className="h-screen flex justify-center items-center">
          <p className="text-red-500 text-xl">{error}</p>
        </div>
      ) : (
        <div className="py-[50px] md:py-[150px] px-4 bg-[#000]">
          <BackButton />
          <div id="detail-hero">
            <h1 className="text-white text-[18px] sm:text-[28px] md:text-[3rem] pt-5 font-bold">
              ({data.modelName})
            </h1>
          </div>
          <div id="grid-overlay">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-10">
              {data.modelImage &&
                data.modelImage.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="object-cover h-full cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => {
                      setImage(img);
                      setIsOpen(!isOpen);
                      setText("Exterior");
                    }}
                  />
                ))}
              {data.modelInterior &&
                data.modelInterior.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="object-cover h-full cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => {
                      setImage(img);
                      setIsOpen(!isOpen);
                      setText("Interior");
                    }}
                  />
                ))}
            </div>
          </div>
          <CarModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            image={image}
            text={text}
          />
          <CarInfo data={data} />
        </div>
      )}
    </>
  );
};

export default Detail;
