import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import React from "react";
import ClientsList from "./components/ClientsList";

const Clients = () => {
  return (
    <div style={{ width: "100%" }}>
      <HeaderComponent />
      <ClientsList />
    </div>
  );
};

export default Clients;
