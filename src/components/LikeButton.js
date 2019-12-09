import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// components
import AaButton from '../util/AaButton';
// redux
import { connect } from 'react-redux';
import { likeNote, unlikeNote } from '../redux/actions/dataActions';
// icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class LikeButton extends Component {
  likedNote = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.noteId === this.props.noteId)
    )
      return true;
    else return false;
  };

  likeNote = () => {
    this.props.likeNote(this.props.noteId);
  };

  unlikeNote = () => {
    this.props.unlikeNote(this.props.noteId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <AaButton tip="like">
          <FavoriteBorderIcon color="primary" />
        </AaButton>
      </Link>
    ) : this.likedNote() ? (
      <AaButton tip="Undo like" onClick={this.unlikeNote}>
        <FavoriteIcon color="primary" />
      </AaButton>
    ) : (
      <AaButton tip="Like" onClick={this.likeNote}>
        <FavoriteBorderIcon color="primary" />
      </AaButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  noteId: PropTypes.string.isRequired,
  likeNote: PropTypes.func.isRequired,
  unlikeNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeNote,
  unlikeNote
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
