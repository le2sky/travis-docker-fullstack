import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    axios.get("/api/values").then((response) => {
      console.log("response", response);
      setLists(response.data);
    });
  }, []);

  const changeHandler = (event) => {
    setValue(event.currentTarget.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    axios.post("/api/value", { value: value }).then((response) => {
      if (response.data.success) {
        console.log("response", response);
        setLists([...lists, response.data]);
        setValue("");
      } else {
        alert("값을 DB에 넣는데 실패했습니다.");
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO</h1>
        <div className="container">
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="오늘의 할 일을 입력해주세요"
              onChange={changeHandler}
              value={value}
            ></input>
            <button type="submit">확인</button>
          </form>
          {lists &&
            lists.map((list, index) => <li key={index}>{list.value} </li>)}
        </div>
      </header>
    </div>
  );
}

export default App;
