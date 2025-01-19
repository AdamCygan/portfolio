import { MemoryGameContainer } from "../game";
import "./app.style.css";

const App = () => {
  return (
    <div className='app'>
      <h1 className='app__title'>Memory Game!</h1>
      <p className='app__description'>
        Test your memory by matching cards on a grid. Choose a difficulty and
        see how fast you can complete the game. Ready to begin? Let&apos;s play!
      </p>
      <MemoryGameContainer />
    </div>
  );
};

export default App;
