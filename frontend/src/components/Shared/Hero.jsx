import Logo from "../../assets/panelista-logo-black.svg";

function Hero() {
  return (
    <div className="text-left pt-9 pl-20 pb-14">
      <img className="max-w-96" src={Logo} alt="Panelista logo" />
    </div>
  );
}

export default Hero;
