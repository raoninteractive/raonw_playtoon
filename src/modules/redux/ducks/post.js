import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [EDIT_POST, EDIT_POST_SUCCESS, EDIT_POST_FAILURE] =
  createRequestActionTypes("post/EDIT");
export const [UPLOAD_POST, UPLOAD_POST_SUCCESS, UPLOAD_POST_FAILURE] =
  createRequestActionTypes("post/UPLOAD");
export const [POST_DETAIL, POST_DETAIL_SUCCESS, POST_DETAIL_FAILURE] =
  createRequestActionTypes("post/DETAIL");
export const [AUTHOR_MINE, AUTHOR_MINE_SUCCESS, AUTHOR_MINE_FAILURE] =
  createRequestActionTypes("author/MINE");
export const [
  GET_CURRENT_POST,
  GET_CURRENT_POST_SUCCESS,
  GET_CURRENT_POST_FAILURE,
] = createRequestActionTypes("post/GET_CURRENT_POST");
export const [
  GET_POST_REACTION,
  GET_POST_REACTION_SUCCESS,
  GET_POST_REACTION_FAILURE,
] = createRequestActionTypes("post/GET_POST_REACTION");

/* --- Actions --- */
export const setPostEditAction = createAction(EDIT_POST);
export const getPostDetailAction = createAction(POST_DETAIL);
export const getAuthorMineAction = createAction(AUTHOR_MINE);
export const getCurrentPost = createAction(GET_CURRENT_POST);
export const getPostReaction = createAction(GET_POST_REACTION);

const initialState = {
  post: null,
  authorMine: null,
  reactions: [],
  timelines: [],
  currentPost: null,
};

const post = handleActions(
  {
    [EDIT_POST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log("post edit", action.payload);
        draft.post = action.payload.post;
      });
    },
    [POST_DETAIL_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log("post detail : ", action.payload);
        draft.post = action.payload.post;
      });
    },
    [AUTHOR_MINE_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log("author mine", action.payload);
        draft.authorMine = action.payload;
      });
    },
    [GET_CURRENT_POST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.currentPost = action.payload;
      });
    },
    [GET_POST_REACTION_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log("action.payload.reactions : ", action.payload.reactions);
        draft.currentPost.reactions = action.payload.reactions;
      });
    },
  },
  initialState
);

export default post;
