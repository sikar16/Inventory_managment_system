import { Route, Routes } from "react-router-dom";

function App() {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("oo");
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <center>
                {" "}
                <h1>hhhhhhhhhhh</h1>
                <form>
                  <input type="text" placeholder="email" /> <br />
                  <br />
                  <input type="password" placeholder="password" />
                  <br /> <br />
                  <button onClick={handleSubmit}>submit</button>
                </form>
              </center>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
