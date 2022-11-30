import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";
import { LOGOUT_REQUEST_SUCCESS } from "./login";

/* --- Action Types --- */
export const [EDIT_POST, EDIT_POST_SUCCESS, EDIT_POST_FAILURE] =
  createRequestActionTypes("post/EDIT");
export const [UPLOAD_POST, UPLOAD_POST_SUCCESS, UPLOAD_POST_FAILURE] =
  createRequestActionTypes("post/UPLOAD");
export const [INIT_UPLOAD_POST] =createRequestActionTypes("INIT/post/UPLOAD");
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
const [SET_SERIES, INIT_SERIES] = createRequestActionTypes("post/SET_SERIES");
const [CURRENT_POST_INIT] = createRequestActionTypes("post/CURRENT_POST_INIT");

/* --- Actions --- */
export const setPostEditAction = createAction(EDIT_POST);
export const setPostAction = createAction(UPLOAD_POST);
export const initPostAction = createAction(INIT_UPLOAD_POST);
export const getPostDetailAction = createAction(POST_DETAIL);
export const getAuthorMineAction = createAction(AUTHOR_MINE);
export const currentPostInit = createAction(CURRENT_POST_INIT);
export const getCurrentPost = createAction(GET_CURRENT_POST);
export const getPostReaction = createAction(GET_POST_REACTION);
export const setSeriesAction = createAction(SET_SERIES);
export const initSeriesAction = createAction(INIT_SERIES);

const initialState = {
  post: null,
  authorMine: null,
  reactions: [],
  timelines: [],
  currentPost: null,
  series: null,
  postUpload: null,
};

const post = handleActions(
  {
    [UPLOAD_POST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.postUpload = action.payload;
      });
    },
    [UPLOAD_POST_FAILURE]: (state, action) => {
      return produce(state, (draft) => {
        draft.postUpload = action.payload;
      });
    },
    [INIT_UPLOAD_POST]: (state, action) => {
      return produce(state, (_) => {
        return {
          ...state,
          postUpload: null,
        };
      });
    },
    [EDIT_POST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.post = action.payload.post;
      });
    },
    [POST_DETAIL_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.post = action.payload.post;
      });
    },
    [AUTHOR_MINE_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.authorMine = action.payload;
      });
    },
    [SET_SERIES]: (state, action) => {
      return produce(state, (draft) => {
        draft.series = action.payload;
      });
    },
    [INIT_SERIES]: (state, action) => {
      return produce(state, (_) => {
        return {
          ...state,
          series: null,
        };
      });
    },
    [CURRENT_POST_INIT]: (state, action) => {
      return produce(state, (draft) => {
        console.log("CURRENT_POST_INIT");
        draft.currentPost = null;
      });
    },
    [GET_CURRENT_POST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.currentPost = action.payload;
      });
    },
    [GET_POST_REACTION_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.currentPost.reactions = action.payload.reactions;
      });
    },
    [LOGOUT_REQUEST_SUCCESS]: (state, _) => {
      //2022.11.01 lhk- logout 시 author 정보도 초기화
      return produce(state, (_) => {
        return {
          ...initialState,
        };
      });
    },
  },
  initialState
);

export default post;
