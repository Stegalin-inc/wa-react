import { useState } from 'react';
import './App.css';
import { Auth } from './components/Auth/Auth';
import { ChatView } from './components/ChatView/ChatView';
import { Api } from './util/Api';

function App() {
  const [isLogged, setIsLogged] = useState(false)

  const onChooseCredentials = (waInstance, token) => {
    Api.setCredentials(waInstance, token);
    setIsLogged(true);
  }

  return (
    <div className="App">
      {!isLogged? <Auth onChoose={onChooseCredentials}/>: <ChatView />}
    </div>
  );
}

export default App;
