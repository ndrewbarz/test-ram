import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, Avatar } from '@material-ui/core';
import { AccordionDetails } from '@material-ui/core';
import { AccordionSummary } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  accordion: {
    display: 'flex',
    flexDirection: 'column',
  },
  messageAva: {
    outlineLeft: '2px solid transparent',
    borderLeft: '5px solid #d6d6d6',
    marginRight: '5px',
  },
  messageHeader: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
  },
  messageInfo: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '200px',
  },
  messageDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  messageBody: {
    maxWidth: 500,
    width: '100%',
    margin: '10px',
    padding: '10px',
  },
  quickPost: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignSelf: 'self-start',
    width: '100%',
    margin: '2px',
    padding: '2px',
  },
}));

const History = ({ messages }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className={classes.root}>
      {messages.map((message, idx) => {
        return (
          <Accordion
            key={message.id}
            expanded={expanded === `panel${idx}`}
            onChange={handleChange(`panel${idx}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1bh-content'
              id='panel1bh-header'
            >
              <Typography className={classes.heading}>
                {message.title}
              </Typography>
              {/* <Typography className={classes.secondaryHeading}>
                {message.body}
              </Typography> */}
            </AccordionSummary>
            <AccordionDetails className={classes.accordion}>
              <div className={classes.messageHeader}>
                <div className={classes.messageAva}>
                  <Avatar src={message.recipientAvatar} />
                </div>
                <div className={classes.messageInfo}>
                  <Typography>Sent to: {message.recipient} </Typography>
                  <Typography>Date: {message.date.slice(0, 10)} </Typography>
                  <Typography>At: {message.date.slice(11, 19)} </Typography>
                </div>
                {message.interGalaxyCheck ? (
                  <div className={classes.quickPost}>
                    <CheckIcon style={{ color: 'lightgreen' }} />
                    <Typography>Using Quickpost™</Typography>
                  </div>
                ) : null}
              </div>
              <div className={classes.messageBody}>
                <Typography variant='body2' gutterBottom>
                  {message.body}
                </Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default History;
