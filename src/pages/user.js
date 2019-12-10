import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// components
import Note from '../components/note/Note';
import StaticProfile from '../components/profile/StaticProfile';
// mui
import Grid from '@material-ui/core/Grid';
// redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    noteIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const noteId = this.props.match.params.noteId;

    if (noteId) this.setState({ noteIdParam: noteId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { notes, loading } = this.props.data;
    const { noteIdParam } = this.state;

    const notesMarkup = loading ? (
      <p>loading data...</p>
    ) : notes === null ? (
      <p>No notes for this user</p>
    ) : !noteIdParam ? (
      notes.map(note => <Note key={note.noteId} note={note} />)
    ) : (
      notes.map(note => {
        if (note.noteId !== noteIdParam)
          return <Note key={note.noteId} note={note} />;
        else return <Note key={note.noteId} note={note} openDialog />;
      })
    );

    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {notesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <p>loading profile...</p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);
