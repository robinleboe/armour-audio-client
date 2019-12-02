import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Note from '../components/Note';

class home extends Component {
  state = {
    notes: null
  };
  componentDidMount() {
    axios
      .get('/notes')
      .then(res => {
        // console.log(res.data);
        this.setState({
          notes: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let recentNotesMarkup = this.state.notes ? (
      this.state.notes.map(note => <Note key={note.noteId} note={note} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentNotesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
