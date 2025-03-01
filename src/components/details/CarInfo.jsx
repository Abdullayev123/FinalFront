/* eslint-disable react/prop-types */
const CarInfo = ({ data }) => {
  return (
    <div id="about-car" className="px-4 pb-[100px]">
      <div
        id="info-section"
        className="flex flex-col md:flex-row justify-between text-white"
      >
        <h1 className="text-[3rem]">(info)</h1>
        <div className="ml-0 md:ml-[50px] lg:ml-[200px] pt-[20px] md:pt-[100px]">
          <p className="text-[20px] md:text-[2rem] text-[#e9ecef]">
            {data.description}
          </p>
        </div>
      </div>
      <div id="properties" className="w-full pt-[4vw] text-[#e9ecef] px-5 ">
        <h1 className="text-[2rem] md:text-[3rem]">(Properties)</h1>
        <div className="text-end pt-[80px]">
          <p className="text-[24px] md:text-[2rem]">Year: {data.year}</p>
          <p className="text-[24px] md:text-[2rem]">Power: {data.power} HP</p>
          <p className="text-[24px] md:text-[2rem]">
            Body Type: {data.bodyType}
          </p>
          <p className="text-[24px] md:text-[2rem]">{data.price}$ (Dollar)</p>
        </div>
      </div>
    </div>
  );
};

export default CarInfo;
