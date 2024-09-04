import Header from "../Shared/Header";
import NotFoundImg from "../../assets/notfound-decor.svg";
import Hero from "../Shared/Hero";

const NotFound = () => {
  return (
    <>
      <Header />
      <Hero />
      <div className="flex justify-center">
        <img className="max-w-4xl" src={NotFoundImg} alt="Page is not found" />
      </div>
    </>
  );
};

export default NotFound;
