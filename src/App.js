import { useState } from 'react';
import './App.css';
import Search from './components /Search/Search';
import Table from './components /Table';

function App() {
  const [searchValue , setSearchValue] = useState("");

  return (
    <div className="App">
      <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
      <Table searchValue={searchValue}/>
    </div>
  );
}

export default App;
