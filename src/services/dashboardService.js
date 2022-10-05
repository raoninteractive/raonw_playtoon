import { getGetMethodUrl } from "@/common/common";
import { apiServer } from "./api";

/**
*
  call dashboard -> シリーズリスト 
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getSeriesStoryList = async (params) => {
  try {
    return await apiServer("get", "/post/series" + getGetMethodUrl(params));
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
  call type list ex) 만화, 소설등  
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getPostTypeListFromServer = async () => {
  try {
    return await apiServer("get", "/post/type");
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
   타입 별 카테고리 목록
*
* @version 1.0.0
* @author 2hyunkook
* @param typeId type id
*/
export const getPostCategoryListFromServer = async (typeId) => {
  try {
    return await apiServer("get", `/post/category/${typeId}`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
  파일 저장 
*
* @version 1.0.0
* @author 2hyunkook
* @parma  const params = new FormData();
          params.append("authorId", "");               
          params.append("subscribeTierId", "");        
          params.append("productId", "");
          params.append("type", "image");                 //image, video, binary
          params.append("usage", "cover");                //profile, background, cover, logo, post, product, thumbnail, attachment
          params.append("loginRequired", true);
          params.append("licenseRequired", false);        //product 에 관련된 항목 추후 확인 필요
          params.append("rating", "G");                   //G, PG-13, R-15, R-17, R-18, R-18G
          params.append("file", file);
* @return hash : [get] /file/{hash} api로 파일 경로 가져옴
*/
export const setFileToServer = async (params) => {
  const header = {
    "content-type": "multipart/form-data",
  };

  try {
    return await apiServer("post", "/file", params, header);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
   파일 경로 불러오기 
*
* @version 1.0.0
* @author 2hyunkook
* @return 파일경로
*/
export const getFileUrlFromServer = async (hash, params) => {
  let parameters = "";
  if( params !== undefined ){
    parameters = `?${getGetMethodUrl(params)}`;
  }

  try {
    return await apiServer("get", `/file/${hash}${parameters}`);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};


/**
*
  call dashboard -> 投稿リスト
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getPostListFromServer = async (params) => {
  try {
    return await apiServer("get", "/post" + getGetMethodUrl(params));
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};


/**
*
  태그 검색
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getTagFromServer = async (query) => {
  try {
    return await apiServer("get", `/tag/${query}`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};


/**
*
  태그 작성
*
* @version 1.0.0
* @author 2hyunkook
* @return json ex) {"result":0,"tag":{"name":"test5","public":true,"rating":"G","id":"15","createdAt":"2022-09-28T05:07:21.051Z","updatedAt":"2022-09-28T05:07:21.051Z"}}
*/
export const setTagToServer = async (params) => {
  try {
    return await apiServer("post", "/tag", params);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
  Dashbaord - series 시리즈 작성
*
* @version 1.0.0
* @author 2hyunkook
*/
export const setSeriesToServer = async (params) => {
  try {
    return await apiServer("post", "/post/series", params);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};


