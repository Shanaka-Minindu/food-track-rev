import React from "react";
import ServingUnitFormDialog from "./_components/servingUnitFormDialog";
import ServingUnitCards from "./_components/servingUnit-Cards";

const page = () => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Serving Units List</h1>
        <ServingUnitFormDialog/>
      </div>
      <ServingUnitCards/>
    </>
  );
};

export default page;
