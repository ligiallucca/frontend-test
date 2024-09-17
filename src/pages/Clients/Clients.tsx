import ClientsList from "./components/ClientsList";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

const Clients = () => {
  return (
    <div style={{ width: "100%" }}>
      <HeaderComponent />
      <ClientsList />
    </div>
  );
};

export default Clients;
