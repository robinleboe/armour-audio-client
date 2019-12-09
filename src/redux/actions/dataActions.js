import {
  SET_NOTES,
  LOADING_DATA,
  LIKE_NOTE,
  UNLIKE_NOTE,
  DELETE_NOTE,
  SET_ERRORS,
  POST_NOTE,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_NOTE,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from '../types';
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

export const getNote = noteId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/note/${noteId}`)
    .then(res => {
      dispatch({
        type: SET_NOTE,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

// post a Note
export const postNote = newNote => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/note', newNote)
    .then(res => {
      dispatch({
        type: POST_NOTE,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
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

// submit comment
export const submitComment = (noteId, commentData) => dispatch => {
  axios
    .post(`/note/${noteId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
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

// get user data for user page
export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_NOTES,
        payload: res.data.notes
      });
    })
    .catch(() => {
      dispatch({
        type: SET_NOTES,
        payload: null
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
