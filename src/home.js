import { useLocation } from "react-router-dom";

const Home = () => {
  const state = useLocation();
  console.log(state);
  return <div className="text-center">Welcome To The Voting System</div>;
};

export default Home;
