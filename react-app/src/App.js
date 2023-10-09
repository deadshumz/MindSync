import {useState, React} from 'react';
import styles from './App.module.css';
import Sidebar from './components/Sidebar';
import Settings from './components/Settings';
import MainView from './components/MainView';



function App() {

  const [selectedOption, setSelectedOption] = useState('default');

  function getComponentByOption(option) {
    const componentByOption = {
      'default' : <MainView>default</MainView>,
      'settings' : <Settings/>
    }
    return componentByOption[option]
  }
  
  return (
    <div className={styles.App}>
      <Sidebar setSelectedOption={setSelectedOption}/>
      {getComponentByOption(selectedOption)}
    </div>
  );
}

export default App;
