
import './App.css';
import Calendar from './components/calendar';
import moment from 'moment';

function App() {

  const now = moment([2022, 5, 27])
  
  return (
    <Calendar date={now}/>
  );
}

export default App;
