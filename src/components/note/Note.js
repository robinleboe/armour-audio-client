import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
// components
import AaButton from '../../util/AaButton';
import DeleteNote from './DeleteNote';
import NoteDialog from './NoteDialog';
import LikeButton from './LikeButton';
// mui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
// icons
import ChatIcon from '@material-ui/icons/Chat';
// redux
import { connect } from 'react-redux';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
    position: 'relative'
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

class Note extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      note: {
        body,
        createdAt,
        userImage,
        userHandle,
        noteId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteNote noteId={noteId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title="Profile Image"
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton noteId={noteId}/>
          <span>{likeCount} Likes</span>
          <AaButton tip="comments">
            <ChatIcon color="primary" />
          </AaButton>
          <span>{commentCount} Comments</span>
          <NoteDialog noteId={noteId} userHandle={userHandle} />
        </CardContent>
      </Card>
    );
  }
}

Note.propTypes = {
  user: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Note));
