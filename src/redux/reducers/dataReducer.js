import {
  SET_NOTES,
  LOADING_DATA,
  LIKE_NOTE,
  UNLIKE_NOTE,
  DELETE_NOTE,
  POST_NOTE,
  SET_NOTE
} from '../types';

const initialState = {
  notes: [],
  note: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_NOTES:
      return {
        ...state,
        notes: action.payload,
        loading: false
      };
      case SET_NOTE:
      return {
        ...state,
        note: action.payload
      };
    case LIKE_NOTE:
    case UNLIKE_NOTE: {
      let index = state.notes.findIndex(
        note => note.noteId === action.payload.noteId
      );
      state.notes[index] = action.payload;
      return {
        ...state
      };
    }
    case DELETE_NOTE: {
      let index = state.notes.findIndex(
        note => note.noteId === action.payload
      );
      state.notes.splice(index, 1);
      return {
        ...state
      };
    }
    case POST_NOTE:
      return {
        ...state,
        notes: [action.payload, ...state.notes]
      };
    default:
      return state;
  }
}
