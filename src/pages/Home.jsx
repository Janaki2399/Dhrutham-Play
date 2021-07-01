import { useNavigate } from "react-router";
import illustration1 from "../assets/music file2-09.svg";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-wrapper">
      <div className="flex flex-column margin-all ">
        <div className="margin-auto margin-left">
          <div className="heading-big">Learn Carnatic music hassle free </div>
          <div className="heading-big2">
            Curated videos from beginner to advanced level
          </div>
          <button
            className="btn btn-primary-contained margin-top"
            onClick={() => navigate("/categories")}
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="margin-auto home-img">
        <img src={illustration1} alt="img" width="100%" height="100%" />
      </div>
    </div>
  );
};
