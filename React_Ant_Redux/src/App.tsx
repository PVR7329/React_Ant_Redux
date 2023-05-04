import { BrowserRouter as Router } from 'react-router-dom'
import { UserTable } from './Components/Table/UserTable';
import './App.css';




function App() {
  return (
    <>
      <Router>
        <UserTable />
      </Router>
    </>
  );
}

export default App;
