import './App.css';
import { Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
import Country from "./components/Country";
import { ThemeProvider } from '../src/ThemeContext';

function App() {
  return (
    <div className="App">
      <div>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/detail/:cca3" element={<Country/>}/> 
          </Routes>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
