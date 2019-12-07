import { SET_NOTES, LOADING_DATA, LIKE_NOTE, UNLIKE_NOTE, DELETE_NOTE } from '../types';
import axios from 'axios';

// get all notes
export const getNotes = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/notes')
    .then(res => {
      dispatch({
        type: SET_NOTES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_NOTES,
        payload: []
      });
    });
};

// like a note
export const likeNote = noteId => dispatch => {
  axios
    .get(`/note/${noteId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_NOTE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// unlike a note
export const unlikeNote = noteId => dispatch => {
  axios
    .get(`/note/${noteId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_NOTE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// delete note
export const deleteNote = noteId => dispatch => {
  axios
    .delete(`/note/${noteId}`)
    .then(() => {
      dispatch({
        type: DELETE_NOTE,
        payload: noteId
      });
    })
    .catch(err => console.log(err));
};