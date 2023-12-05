import React from "react";
import dynamic from "next/dynamic";
// import ClientsMap from "~/components/Maps/ClientsMap";

const DynamicClientsMap = dynamic(() => import("~/components/Maps/ClientsMap"), {
  loading: () => <p>Loading map...</p>,
  ssr: false, // Disable server-side rendering
});
const clientsMap = () => {
  return (
    <div className="px-6">
      <DynamicClientsMap />
    </div>
  );
};

export default clientsMap;
