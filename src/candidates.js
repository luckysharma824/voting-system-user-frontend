import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Candidate = () => {
  const [candidates, setCandidates] = useState([]);
  const location = useLocation();

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

  useEffect(() => {
    if (location.state !== null && location.electionType !== null) {
      let state = location.state.state;
      let electionType = location.state.electionType;
      let url =
        "http://localhost:8080/candidate/states/" + state + "/" + electionType;
      fetchData(url, getCandidateList);
    }
  }, []);

  function getCandidateList(resultObj) {
    setCandidates(resultObj.result);
  }

  function handleVoting(value) {
    let url = "http://localhost:8080/user/voting?candId=" + value;
    restCall(url, "POST", null);
  }

  function restCall(url, httpMethod, data) {
    const requestOptions = {
      method: httpMethod,
      headers: { "Content-Type": "application/json" },
      body: data === null ? null : JSON.stringify(data),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
      });
  }

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>Candidate Name</td>
            <td>Party Name</td>
            <td>Party Symbol</td>
            <td>Election Type</td>
            <td>Do Vote</td>
          </tr>
        </thead>
        <tbody>
          {candidates.map((cand, index) => (
            <tr id={cand.id} key={cand.id}>
              <td>{cand.name}</td>
              <td>{cand.partyDetail.name}</td>
              <td>{cand.partyDetail.symbol}</td>
              <td>{cand.electionDetail.electionType}</td>
              <td>
                <button id="do-vote" onClick={() => handleVoting(cand.id)}>
                  Please Click To Vote
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Candidate;
