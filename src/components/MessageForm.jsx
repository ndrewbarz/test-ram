import React, { useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  TextField,
} from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import { NativeSelect } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    margin: '20px 0',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    color: '#333',
    // border: '1px solid #333',
  },
  formStyle: {
    display: 'flex',
    flexDirection: 'column',
  },
  btn: {
    alignSelf: 'flex-end',
    width: '20%',
    background: '#4EADC5',
    '&:hover': {
      background: '#74cee4',
    },
  },
}));

const MessageForm = ({ characters, create }) => {
  const classes = useStyles();

  let dt = new Date().toJSON();

  const [message, setMessage] = useState({
    title: '',
    body: '',
    recipient: '',
    recipientId: null,
    recipientAvatar: '',
    date: dt,
    interGalaxyCheck: true,
  });

  const [alert, setAlert] = useState(null);
  const [titleErr, setTitleErr] = useState({ err: false, errText: '' });
  const [bodyErr, setBodyErr] = useState({ err: false, errText: '' });
  const [characterErr, setCaracterErr] = useState({ err: false, errText: '' });

  const addNewMessage = (e) => {
    e.preventDefault();
    setTitleErr({ err: false, text: '' });
    setBodyErr({ err: false, text: '' });
    setCaracterErr({ err: false, text: '' });

    if (message.title === '') {
      setTitleErr({ err: true, text: 'Please enter the title' });
    } else if (!message.title.match(/^[aA-zZ\s]+$/)) {
      setTitleErr({
        err: true,
        text: 'Title should not contain special characters',
      });
    } else if (message.title.length < 3 || message.title.length > 32) {
      setTitleErr({
        err: true,
        text: 'Title must be [3-32] characters length',
      });
    } else if (message.body.length > 256) {
      setBodyErr({
        err: true,
        text: 'Message must be shorter than 256 characters ',
      });
    } else if (message.body === '') {
      setBodyErr({ err: true, text: 'Message is required' });
    } else if (message.recipient === '') {
      setCaracterErr({ err: true, text: 'Please pick a character' });
    } else {
      const newMessage = {
        ...message,
        success: true,
        id: Date.now(),
      };
      create(newMessage);
      setAlert(true);
      setMessage({
        title: '',
        body: '',
        recipient: '',
        date: '',
        interGalaxyCheck: true,
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  };
  return (
    <div>
      {alert ? <Alert severity='success'>Message sent successfully</Alert> : ''}

      {/* {message.success === false ? (
        <Alert severity='error'>Something went wrong</Alert>
      ) : (
        setTimeout(() => {
        }, 2000)
      )} */}
      <h2>Send a new message here</h2>
      <form noValidate autoComplete='off' className={classes.formStyle}>
        <FormHelperText>Title</FormHelperText>
        <TextField
          label='Enter the title'
          variant='outlined'
          fullWidth
          error={titleErr.err}
          helperText={titleErr.text}
          value={message.title}
          onChange={(e) => setMessage({ ...message, title: e.target.value })}
        />
        <FormHelperText>Message</FormHelperText>
        <TextField
          id='outlined-multiline-static'
          label='Enter the message here'
          multiline
          fullWidth
          error={bodyErr.err}
          helperText={bodyErr.text}
          rows={4}
          required
          variant='outlined'
          value={message.body}
          onChange={(e) => setMessage({ ...message, body: e.target.value })}
        />
        <FormControl>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={message.interGalaxyCheck}
                  onChange={(e) =>
                    setMessage({
                      ...message,
                      interGalaxyCheck: e.target.checked,
                    })
                  }
                  name='gilad'
                />
              }
              label='I want to use InterGalaxy Quickpost™'
            />
          </FormGroup>
        </FormControl>
        <FormControl
          fullWidth
          variant='outlined'
          className={classes.formControl}
          error={characterErr.err}
        >
          <NativeSelect
            className={classes.selectEmpty}
            value={message.recipient}
            name='recipient'
            onChange={(e) =>
              setMessage({
                ...message,
                recipient: e.target.value,
                recipientId: e.target.options[e.target.selectedIndex].id,
                recipientAvatar:
                  e.target.options[e.target.selectedIndex].dataset.image,
              })
            }
            inputProps={{ 'aria-label': 'recipient' }}
          >
            <option value='' disabled>
              Pick a character
            </option>
            {characters.map((character) => (
              <option
                key={character.name}
                value={character.name}
                id={character.id}
                data-image={character.image}
              >
                {character.name}
              </option>
            ))}
          </NativeSelect>
          <FormHelperText>{characterErr.text}</FormHelperText>
        </FormControl>

        <Button
          className={classes.btn}
          variant='contained'
          color='primary'
          onClick={addNewMessage}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default MessageForm;
