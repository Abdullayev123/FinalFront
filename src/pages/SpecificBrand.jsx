import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InnerImageZoom from "react-inner-image-zoom";
import { CursorContext } from "../components/context/CursorProvider";
// import PageTransition from "../components/config/PageTransition";
const SpecificBrand = () => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState();
  const { brand } = useParams();
  const { setCursorsize } = useContext(CursorContext);

  const cars = useRef();
  useEffect(() => {
    fetch(`https://finalback-k90r.onrender.com/cars/search?brand=${brand}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setImage(data[0].modelImage[0]);
      })
      .catch((error) => console.error("Error:", error));
  }, [brand]);

  return (
    <>
      {/* <PageTransition> */}
      <div id="overlay" className="flex ">
        <div className="pt-[100px] md:pt-[200px]  text-white min-h-screen  md:w-[30%] xl:w-[20%]">
          <h1 className="text-[28px] text-white mb-1 md:pl-[40px]">(cars)</h1>
          <div
            ref={cars}
            className="  grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-col  gap-2 pt-[20px] md:py-[100px] px-2 md:pl-10"
          >
            {" "}
            {data &&
              data.map((data) => {
                return (
                  <Link
                    key={data._id}
                    to={`/allcars/${data.brand}/detail/${data._id}`}
                    className="w-full h-full"
                    onMouseEnter={() => {
                      setCursorsize({
                        cursorWidth: 80,
                        cursorHeight: 80,
                      });
                    }}
                    onMouseLeave={() => {
                      setCursorsize({
                        cursorWidth: 30,
                        cursorHeight: 30,
                      });
                    }}
                    onClick={() => {
                      setCursorsize({
                        cursorWidth: 30,
                        cursorHeight: 30,
                      });
                    }}
                  >
                    <div
                      key={data._id}
                      className="border-2 flex flex-col gap-[70px] border-white/10 p-3 bg-black"
                      onMouseEnter={() => setImage(data.modelImage[0])}
                    >
                      <img
                        src={data.modelImage[0]}
                        alt=""
                        className="object-cover h-full sm:h-[200px] md:h-full"
                      />
                      <p className="text-white/60 text-[14px]">
                        {data.modelName}
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
        <div className=" w-[70%] lg:w-[60%] pr-10 hidden md:block  fixed right-0 top-[50%] translate-y-[-50%] ">
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
      {/* </PageTransition> */}
    </>
  );
};

export default SpecificBrand;
