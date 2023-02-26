import React, { useState } from "react";
import axios from "axios";

export default function Body() {
  const [resultJson, setResultJson] = useState();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [error, setError] = useState("");

  const sendRequest = () => {
    axios(`http://localhost:8000/${searchInputValue}`)
      .then((r) => {
        setError("");
        setResultJson(r.data);
      })
      .catch((e) => {
        console.log(e)
        setResultJson();
        setError('Bad request');
      });
    }
  const [resultEmail, setResultEmail] = useState();
  const [message, setMessage] = useState("");
  const sendEmail = () => {
    axios.post('http://localhost:8000/subEmail', {email: resultEmail})
      .then((r) => {
        setMessage(r.data.detail);
      })
      .catch((e) => {
        setMessage('Bad email');
      });
  };
  return (
    <main className="main">
      <div className="FAQ">
        <div className="Ask">
          Why is this needed?
        </div>
        <div className="Answer">
          This is a product for learning web programming. It is able to issue requests on the page, and when connected to it by url. Just give it a try, there is a tool at the bottom to do the job. Only GET requests. This is like SWAPI or PokeAPI.
        </div>
        <div className="Ask">
          What is the project stack?
        </div>
        <div className="List">
          • Python 3.9, FastAPI, Golang <p></p>
          • JavaScript, React <p></p>
          • Nginx, Docker, Redis, PostgreSQL
        </div>
        <div className="Ask">
          Created by one person?
        </div>
        <div className="Answer">
          Yes.
        </div>
        <div className="Ask">
          Is it possible to contribute to the project?
        </div>
        <div className="Answer">
          Yes, send feedback. Button in the header. The footer contains links to social networks.
        </div>
        <div className="Ask">
          Is it in agreement with the developers of Red Dead Redemption?
        </div>
        <div className="Answer">
          No, this project is written on pure enthusiasm. The database is only superficially filled, if you would like to help the project with filling the database - you are welcome.
        </div>
        <div className="Ask">
          Why FastAPI?
        </div>
        <div className="Answer">
          At first, I tested this framework for a long time with Flask, (I like the syntax of such frameworks, they are easy to compose API) and synchronous frameworks are very good for such projects, but the choice was for FastAPI due to the development of the project. Initially, I thought that the project would only contain one database and that's it, but now it has a lot of microservices (two backends, one frontend, a non-relational database and a relational one) and that may not be all!
        </div>
      </div>
      <div className="Mail">
        <div className="sub">
          <input
            value={resultEmail}
            onChange={(e) => {
              setResultEmail(e.target.value);
            }}
            className="form-control-sub"
            placeholder="example@gmail.com"
          ></input>
          <button onClick={sendEmail} className='btn-sub'>
            {(message) || "Subscribe for new updates"}
          </button>
        </div>
      </div>
      <div className="Request">
        <div className="API">
          <input
            value={searchInputValue}
            onChange={(e) => {
              setSearchInputValue(e.target.value);
            }}
            className="form-control"
            placeholder="people/1/"
          ></input>
          <button onClick={sendRequest} className='btn'>request</button>
        </div>
        
        {(resultJson || error) && <pre className="JSONResponse">
          {JSON.stringify(resultJson, null, `\t`)}
          {error && <div style={{ color: "red" }}>{error}</div>}
        </pre>}
      </div>
    </main>
  );
}