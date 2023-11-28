import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  // 1. basic - using normal flow
  // useEffect(() => {
  //   let isCancelled = false;
  //   fetch("https://jsonplaceholder.org/users")
  //     .then((data) => data.json())
  //     .then((data) => {
  //       if (!isCancelled) {
  //         console.log(data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log({ err });
  //     });

  //   return () => {
  //     isCancelled = true;
  //   };
  // }, []);

  // 2. fetch method - Abort Controller
  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;
  //   fetch("https://jsonplaceholder.org/users", { signal })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       if (err.name === "AbortError") {
  //         console.log("API cancelled");
  //       } else {
  //         console.log({ err });
  //       }
  //     });

  //   return () => {
  //     controller.abort();
  //   };
  // }, []);

  // 3. axios method - cancel
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    axios
      .get("https://jsonplaceholder.org/users", {
        cancelToken: cancelToken.token,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("API cancelled: ", err);
        } else {
          console.log({ err });
        }
      });

    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <div className="App">
      <h1>test</h1>
    </div>
  );
}

export default App;
