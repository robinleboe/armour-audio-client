import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AaButton from '../../util/AaButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// components
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
//mui
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// redux
import { connect } from 'react-redux';
import { getNote, clearErrors } from '../../redux/actions/dataActions';

const styles = theme => ({
  ...theme.spread,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
});
class NoteDialog extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.props.getNote(this.props.noteId);
  };
  handleClose = () => {
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      note: {
        noteId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <CircularProgress size={200} />
    ) : (
      <Grid container spacing={2}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton noteId={noteId} />
          <span>{likeCount} Likes</span>
          <AaButton tip="comments">
            <ChatIcon color="primary" />
          </AaButton>
          <span>{commentCount} Comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm noteId={noteId}/>
        <Comments comments={comments} />
      </Grid>
    );

    return (
      <Fragment>
        <AaButton
          onClick={this.handleOpen}
          tip="Expand note"
          tipClassName={classes.expandButton}
        >
          <UnfoldMoreIcon color="primary" />
        </AaButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <AaButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </AaButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

NoteDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getNote: PropTypes.func.isRequired,
  noteId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  note: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  note: state.data.note,
  UI: state.UI
});

const mapActionsToProps = {
  getNote,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(NoteDialog));
