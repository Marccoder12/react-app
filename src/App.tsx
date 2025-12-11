import ListGroup from "./components/ListGroup";

function App() {
  function handleClick() {
    console.log("Hello");
  }
  return (
    <div>
      <ListGroup />
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
