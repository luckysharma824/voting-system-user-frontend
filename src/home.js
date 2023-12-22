import { useEffect, useState } from "react";

const Home = () => {

  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    var url = "http://localhost:8080/states";
    fetchData(url, getStatesList);
  }, [])
  
  function getStatesList(states) {
    setStateList(states);
  }

  function fetchData(url, callback) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("fetchData: ", data);
        callback(data);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
        callback([]);
      });
  }



  return (
    <div >
    Welcome To The Voting System

    </div>
  );
};

export default Home;
