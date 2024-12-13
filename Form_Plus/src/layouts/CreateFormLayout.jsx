import Navbar from "@/components/custom/Navbar";
import React from "react";

const CreateFormLayout = ({ children }) => {
  return (
    <>
      <div className=" min-h-screen  flex  justify-center bg-no-repeat bg-cover p-2 bg-[url('https://img.freepik.com/free-vector/abstract-perspective-graph-pattern-grid-vector-design_1017-45232.jpg?t=st=1733908417~exp=1733912017~hmac=2f98437a158a5b9f366163dc38478a3b54dd8593b285b8291d41835182b73f7d&w=826')]" style={{ backgroundSize: "100% 100%" }}>
        <Navbar />
        {children}
        </div>
    </>
  );
};

export default CreateFormLayout;

{/* <div className=" min-h-screen  flex flex-col items-center bg-no-repeat bg-cover p-2 bg-[url('https://img.freepik.com/free-vector/abstract-perspective-graph-pattern-grid-vector-design_1017-45232.jpg?t=st=1733908417~exp=1733912017~hmac=2f98437a158a5b9f366163dc38478a3b54dd8593b285b8291d41835182b73f7d&w=826')]" style={{ backgroundSize: "100% 100%" }}> */}