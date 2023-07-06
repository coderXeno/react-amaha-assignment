import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clock from './components/Clock';
import Lists from './components/Lists';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/clock' element={<Clock />} />
          <Route path='/lists'  element={<Lists />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;