import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faPlus, faEye, faHeart } from "@fortawesome/pro-solid-svg-icons";
import { getPostListFromServer } from "@/services/dashboardService";


import Container from "@/components/dashboard/Container";
import Select from "@/components/dashboard/Select";

//temp data
import Image from "@/components/dashboard/Image";
import Pagination from "@/components/dashboard/Pagination";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "@/components/dashboard/Dropdown";
import EmptyTr from "@/components/dashboard/EmptyTr";
import { getDateYYYYMMDD, showOneButtonPopup } from "@/common/common";
import { showModal } from "@/modules/redux/ducks/modal";
import ErrorPopup from "@/components/dashboard/ErrorPopup";
import { useWindowSize } from "@/hook/useWindowSize";


const text = {
  post_list : "投稿リスト",
  post : "投稿する",
  number : "番号",
  cover_image : "表紙",
  title : "タイトル",
  access_count : "アクセス数",
  good : "いいね",
  date : "掲載日",
  status : "状態",
  count : "回",
  empty_message: "投稿がありません。",
};

const searchList = [
  {
    id: "all",
    name: "シリーズすべて"
  },
  {
    id: "all",
    name: "シリーズすべて1"
  },
  {
    id: "all",
    name: "シリーズすべて2"
  },
];

export default function DashboardPostList(props) {
  const [stateData, setStateData] = useState();
  const reduxAuthors = useSelector(({post}) => post?.authorMine?.authors);
  const params = useParams('page');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windows = useWindowSize();


  const moveToDetailPage = (item) => {
    if( windows.width > 960 ){
      navigate(`/dashboard/post/detail/${item.id}`)
    }
  };


  const getPostList = async (page) => {
    const params = new FormData();
    params.append("authorId", reduxAuthors[0].id);
    params.append("page", page);
    // params.append("typeId", "");
    // params.append("categoryId", "");
    // params.append("seriesId", "");
    // params.append("issueId", "");
    // params.append("subscribeTierId", "");
    // params.append("keyword", "");
    // params.append("orderKey", "");
    // params.append("order", "");
    // params.append("limit", "");

    const {status, data: result} = await getPostListFromServer(params);
    console.log('getPostList', status, result);
    
    if( status === 200 ){
      setStateData(result)
    }
    else{
      //error 처리
      showOneButtonPopup(dispatch, result);
    }
  };

  const handleClickPost = (event) => {
    if( reduxAuthors === undefined || reduxAuthors.length === 0 ){
      showOneButtonPopup(dispatch, 'クリエイターとして登録してください。');
    }
    else{
      navigate('/post/upload');
    }
  };

  const handleItemClickSearch = (event) => {
    console.log('Search', event);
    
  };

  const renderPostListElements = () => {
    if( stateData?.posts.length === 0 ){
      return <EmptyTr text={text.empty_message} />
    }

    return stateData?.posts?.map((item, index) => {
      return (
        <tr key={index} onClick={() => moveToDetailPage(item)}>
          <td className="hide-m">{item.id}</td>
          <td className="td_imgs">
            <div className="cx_thumb"><span><Image hash={item.thumbnailImage} alt="thumbnail" /></span></div>
          </td>
          <td className="td_subject">{item.title}</td>
          <td className="td_number1"><FontAwesomeIcon icon={faEye} className='view-m' />{item.viewCount}<em className="hide-m">{text.count}</em></td>
          <td className="td_number2"><FontAwesomeIcon icon={faHeart} className='view-m' />{item.likeCount}</td>
          <td className="td_txt1"><span className="view-m">{text.date}：</span>{ getDateYYYYMMDD(item.startAt, '/') }</td>
          <td className="td_txt"><span className="view-m">{text.status}</span>{item.status}</td>
          <td className="td_btns">
            <Link to={`/dashboard/post/detail/${item.id}`} className="btn-pk n blue2">
              <span><i className="fa-solid fa-angle-right"><FontAwesomeIcon icon={faAngleRight} />{text.detail}</i></span>
            </Link>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    //리스트 불러오기
    getPostList( params.page === undefined ? 1 : params.page );
  }, [params]);

  //header back callback 현재 로케이션 보내느걸로
  return (
    <Container
      type={"post"} >
      
      <div className="inr-c">
			
        <div className="hd_titbox hd_mst1">
          <h2 className="h_tit0"><span>{text.post_list}</span></h2>
          <div className="rgh">
            <div onClick={handleClickPost} className="btn-pk n blue2"><span><FontAwesomeIcon icon={faPlus} /> {text.post}</span></div>
          </div>
        </div>
        <div className="hd_titbox2">
          <Select 
            name={"typeId"}
            className={"select1 wid1"}
            dataList={searchList}
            handleItemClick={handleItemClickSearch} />
          {/* <Dropdown
            name={"typeId"}
            className={'select1 wid1'}
            dataList={searchList} 
            selected={'all'} 
            handleItemClick={handleItemClickSearch}/> */}
            
        </div>

        <div className="tbl_basic mtbl_ty1">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col className="imgs"/>
              <col className="wid1"/>
              <col className="wid2"/>
              <col className="wid3"/>
              <col className="wid3"/>
              <col className="wid3"/>
              <col/>
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{text.number}</th>
                <th>{text.cover_image}</th>
                <th>{text.title}</th>
                <th>{text.access_count}</th>
                <th>{text.good}</th>
                <th>{text.date}</th>
                <th>{text.status}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                renderPostListElements()
              }
            </tbody>
          </table>
        </div>
        
        <Pagination
          className={''}
          page={stateData?.meta.currentPage}
          itemsCountPerPage={stateData?.meta.itemsPerPage}
          totalItemsCount={stateData?.meta.totalItems}
          callback={(page) => navigate(`/dashboard/post/${page}`)}
          />
       
      </div>


    </Container>
  );
}



