import { SET_NOTES, LOADING_DATA, LIKE_NOTE, UNLIKE_NOTE } from '../types';

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
    case LIKE_NOTE:
    case UNLIKE_NOTE:
      let index = state.notes.findIndex(
        note => note.noteId === action.payload.noteId
      );
      state.notes[index] = action.payload;
      return {
          ...state
      };

    default:
      return state;
  }
}
