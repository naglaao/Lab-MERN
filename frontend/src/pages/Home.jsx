import React from "react";
import logo from "../logo.svg";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="bg-background-color py-[80px] box-sizing-border flex flex-col gap-20 justify-center items-center ">
      <div className=" justify-center flex flex-row w-[880px]">
        <h1
          dir="ltr"
          className="font-['Poppins'] font-semibold text-[51px] text-[#0690FF]"
        >
          POINT. Team
          <br />
          Software Solutions
        </h1>
        <div className="rounded-[25.2px] bg-secondary-color mt-[8.5px] mr-[27px] w-[6px] h-[162px]"></div>
        <img src={logo} alt="logo" className="mr-[30px] size-40" />
      </div>
      <Navbar />
      <div className=" flex justify-center rounded-2xl w-[880px] bg-secondary-color p-[18px]">
        <span className="break-words font-['Cairo'] font-bold text-[32px]  text-[#000000]">
          جميع الحقوق محفوظة 2024 POINT
        </span>
      </div>
    </div>
  );
};

export default Home;
