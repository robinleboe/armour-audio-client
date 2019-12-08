import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// components
import AaButton from '../util/AaButton';
// mui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
// icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteNote } from '../redux/actions/dataActions';

const styles = theme => ({
  ...theme.spread,
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
});

class DeleteNote extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteNote = () => {
    this.props.deleteNote(this.props.noteId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <AaButton
          tip="Delete Note"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </AaButton>
        <Dialog
          open={this.state.open}
          onClose={this.state.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to delete this Note?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteNote} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteNote.propTypes = {
  deleteNote: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  noteId: PropTypes.string.isRequired
};

export default connect(null, { deleteNote })(withStyles(styles)(DeleteNote));
