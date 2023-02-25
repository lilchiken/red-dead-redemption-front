import React, { useState } from "react";
import axios from "axios";

export default function Body() {
  const [resultJson, setResultJson] = useState();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [error, setError] = useState("");

  const sendRequest = async () => {
    axios(`http://localhost:8000/${searchInputValue}`)
    //axios(`https://swapi.dev/api/${searchInputValue}`)
      .then((r) => {
        setError("");
        setResultJson(r.data);
      })
      .catch((e) => {
        console.log(e)
        setResultJson();
        setError('Kakashka');
      });
  };
  return (
    <main>
      <div className="API">
        <input
          value={searchInputValue}
          onChange={(e) => {
            setSearchInputValue(e.target.value);
          }}
          class="form-control"
          placeholder="people/1/"
        ></input>
        <button onClick={sendRequest} className='btn'>request</button>
      </div>
      
      {(resultJson || error) && <pre className="JSONResponse">
        {JSON.stringify(resultJson, null, `\t`)}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </pre>}
    </main>
  );
}