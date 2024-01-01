import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Elections = () => {
  const [stateList, setStateList] = useState([]);
  const [elections, setElections] = useState([]);

  const navigate = useNavigate();

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

  function getStatesList(states) {
    setStateList(states);
    //handleStateChange(states[0]);
  }

  function getElectionList(elections) {
    setElections(elections);
  }

  function handleStateChange(state) {
    if (state === "") {
      setElections([]);
    } else {
      let url = "http://localhost:8080/electionDetail/" + state;
      fetchData(url, getElectionList);
    }
  }

  useEffect(() => {
    var url = "http://localhost:8080/states";
    fetchData(url, getStatesList);
  }, []);

  return (
    <div className="container">
      <select
        className="list-group"
        id="statelist"
        onChange={(e) => handleStateChange(e.target.value)}
      >
        <option key="-1" value="">
          --Please choose state--
        </option>
        {stateList.map((st, index) => (
          <option key={index} value={st}>
            {st}
          </option>
        ))}
      </select>
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>Election State</td>
            <td>Election Type</td>
            <td>Status</td>
            <td>View Candidates</td>
          </tr>
        </thead>
        <tbody>
          {elections.map((el, index) => (
            <tr id={el.id} key={el.id}>
              <td>{el.state}</td>
              <td>{el.electionType}</td>
              <td>{String(el.votingStatus)}</td>
              <td>
                <button
                  onClick={() =>
                    navigate("/candidate", { state: { state: el.state } })
                  }
                >
                  Click
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Elections;
