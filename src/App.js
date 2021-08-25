import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MessageForm from './components/MessageForm';
import History from './components/History';
import { Container } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Layout from './components/Layout';
import MessageService from './components/API/MessageService';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
const useStyles = makeStyles((theme) => ({
  spinnerStyle: {
    margin: '40%',
  },
}));

const App = () => {
  const classes = useStyles();

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem('messages')) || []
  );

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  async function fetchCharacters() {
    setLoading(true);
    setTimeout(async () => {
      const characters = await MessageService.getAll();
      setCharacters(characters);
      setLoading(false);
    }, 1000);
  }

  const createMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  return (
    <Router>
      <div className='App'>
        <Layout>
          <Container maxWidth='sm'>
            <Switch>
              <Route exact path='/'>
                {loading ? (
                  <CircularProgress className={classes.spinnerStyle} />
                ) : (
                  <MessageForm characters={characters} create={createMessage} />
                )}
              </Route>
              <Route exact path='/history'>
                <History messages={messages} />
              </Route>
            </Switch>
          </Container>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
