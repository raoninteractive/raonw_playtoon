import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [
  GET_AUTHOR_LIST,
  GET_AUTHOR_LIST_SUCCESS,
  GET_AUTHOR_LIST_FAILURE,
] = createRequestActionTypes("author/GET_AUTHOR_LIST");

export const [
  SET_CURRENT_AUTHOR,
  SET_CURRENT_AUTHOR_SUCCESS,
  SET_CURRENT_AUTHOR_FAILURE,
] = createRequestActionTypes("author/SET_CURRENT_AUTHOR");
const CURRENT_AUTHOR_INIT = "author/CURRENT_AUTHOR_INIT";

/* --- Actions --- */
export const getAuthorList = createAction(GET_AUTHOR_LIST);
export const setCurrentAuthor = createAction(SET_CURRENT_AUTHOR);
export const currentAuthorInit = createAction(CURRENT_AUTHOR_INIT);

/**
 * login reducer 초기값
 */
const initialState = {
  authors: [],
  authorsMeta: null,
  recents: [],
  recentsMeta: null,
  currentAuthor: null,
};

const author = handleActions(
  {
    [GET_AUTHOR_LIST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        /** SUCCESS 처리 */
        draft.authors = action.payload.authors || [];
        draft.authorsMeta = action.payload.authorsMeta || null;
        draft.recents = action.payload.recents || [];
        draft.recentsMeta = action.payload.recentsMeta || null;
      });
    },
    [SET_CURRENT_AUTHOR_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.currentAuthor = action.payload;
      });
    },
    [CURRENT_AUTHOR_INIT]: (state, action) => {
      return produce(state, (draft) => {
        draft.currentAuthor = null;
      });
    },
  },
  initialState
);

export default author;
