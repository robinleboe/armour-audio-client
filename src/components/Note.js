import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
// components
import AaButton from '../util/AaButton';
// mui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
// icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

// redux
import { connect } from 'react-redux';
import { likeNote, unlikeNote } from '../redux/actions/dataActions';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20
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
  likedNote = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.noteId === this.props.note.noteId)
    )
      return true;
    else return false;
  };

  likeNote = () => {
    this.props.likeNote(this.props.note.noteId);
  };

  unlikeNote = () => {
    this.props.unlikeNote(this.props.note.noteId);
  };

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
      user: { authenticated }
    } = this.props;
    const likeButton = !authenticated ? (
      <AaButton tip="like">
        <Link to="/login">
          <FavoriteBorderIcon color="primary" />
        </Link>
      </AaButton>
    ) : this.likedNote() ? (
      <AaButton tip="Undo like" onClick={this.unlikeNote}>
        <FavoriteIcon color="primary" />
      </AaButton>
    ) : (
      <AaButton tip="Like Note" onClick={this.likeNote}>
        <FavoriteBorderIcon color="primary" />
      </AaButton>
    );
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
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <AaButton tip="comments">
            <ChatIcon color="primary" />
          </AaButton>
          <span>{commentCount} Comments</span>
          {/* {console.log("authenticated",authenticated)} */}
          {console.log("user",this.props.note)}
        </CardContent>
      </Card>
    );
  }
}

Note.propTypes = {
  likeNote: PropTypes.func.isRequired,
  unlikeNote: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeNote,
  unlikeNote
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Note));
