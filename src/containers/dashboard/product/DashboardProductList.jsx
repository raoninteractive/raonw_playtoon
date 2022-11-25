import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { showOneButtonPopup } from "@/common/common";
import Image from "@/components/dashboard/Image";
import Pagination from "@/components/dashboard/MyPagination";
import Search from "@/components/dashboard/Search";
import Button from "@/components/dashboard/Button";
import { getProductListFromServer } from "@/services/postService";
import tempImg1 from "@IMAGES/temp_seller_image.png";
import { useDispatch, useSelector } from "react-redux";
import { editShopProductToServer, getAuthorIdFromServer } from "@/services/dashboardService";
import { cloneDeep } from "lodash";
import { useCallback } from "react";

const text = {
  see_product: "商品一覧",
  sales_detail: "販売内訳",
  qna_product: "商品のお問い合せ",
  see_review: "レビュ一覧",
  product_name: "商品名",
  number: "番号",
  product: "商品",
  title: "タイトル",
  price: "価格",
  date: "販売開始日",
  status: "状態",
  detail: "詳細",
  modify: "修正",
  category: "カテゴリ",
  dont_see: "非表示",
};

const tempData = {
  meta: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 3,
  },
  list: [
    {
      number: "1",
      id: 23,
      image: tempImg1,
      title: "大学のリンゴ一個の重さで10メートルの素材",
      price: "1200000CP",
      date: "2022/06/11",
      status: {
        code: "enabled",
        name: "販売中",
      },
    },
    {
      number: "2",
      id: 256,
      image: tempImg1,
      title: "大学のリンゴ一個の重さで10メートルの素材",
      price: "1200000CP",
      date: "2022/06/11",
      status: {
        code: "pending",
        name: "審査中",
      },
    },
    {
      number: "3",
      id: 2,
      image: tempImg1,
      title: "大学のリンゴ一個の重さで10メートルの素材",
      price: "1200000CP",
      date: "2022/06/11",
      status: {
        code: "suspended",
        name: "販売不可",
      },
    },
  ],
};


export default function DashboardProductList(props) {
  const [stateData, setStateData] = useState(undefined);
  const [stateKeyword, setStateKeyword] = useState(undefined);
  const reduxAuthors = useSelector(({post}) => post.authorMine?.authors);
  const dispatch = useDispatch();


  //==============================================================================
  // function
  //==============================================================================
  const getStatusColor = (status) => {
    let className = "";

    switch (status.code) {
      default:
        className = "cl-sell";
        break;
      case "pending":
        className = "cl-ing";
        break;
      case "suspended":
        className = "cl-non";
        break;
    } //switch

    return className;
  };
  //==============================================================================
  // api
  //==============================================================================
  const getProductList = async (keyword, page) => {
    const formData = new FormData();
    formData.append('authorId', reduxAuthors[0].id);
    if( keyword !== undefined ){
      formData.append('keyword', keyword);
    }
    if( page !== undefined ){
      formData.append('page', page);
    }
    
    const {status, data} = await getAuthorIdFromServer(formData);
    // const {status, data} = await getProductListFromServer(formData);
    console.log('getProductList', status, data);
    
    if( status === 200 ){
      setStateData(tempData);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
  };

  const editProductInStatus = async (item, funSetButtonStatus) => {
    const {status, data} = await editShopProductToServer(item);
    console.log('editProductInStatus', status, data);
    
    if( status === 200 ){
      
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
    
    funSetButtonStatus(undefined);
  };

  //==============================================================================
  // event
  //==============================================================================
  /**
     키워드 검색
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleSearch = (keyword) => {
    setStateKeyword(keyword);
    getProductList(keyword);
  };
  
  /**
   pagination
   * @version 1.0.0
   * @author 2hyunkook
   */
  const handlePagination = (page) => {
    getProductList(stateKeyword, page);
  };

  /**
     비표시 이벤트
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleItemClick = useCallback((item, funSetButtonStatus) => {
    let lodashItem = cloneDeep(item);
    lodashItem.status = 'pending';
    editProductInStatus(lodashItem, funSetButtonStatus);
  }, []);

  //==============================================================================
  // hook & render
  //==============================================================================
  const renderProductList = () => {
    return stateData?.list?.map((item, index) => {
      return (
        <tr key={index}>
          <td className="hide-m">{item.number}</td>
          <td className="td_imgs2">
            <div className="cx_thumb ">
              <span>
                <Image hash={item.image} alt={"cover iamge"} />
              </span>
            </div>
          </td>
          <td className="td_subject">{item.title}</td>
          <td className="td_number3">{item.price}</td>
          <td className="td_text1">
            <span className="view-m">{text.category}：</span>
            {item.date}
          </td>
          <td className={`td_txt3 cl-sell ${getStatusColor(item.status)}`}>
            <span className="view-m">{text.status}</span>
            {item.status.name}
          </td>
          <td className="td_btns2 ty1">
            <Link
              className="btn-pk s blue2"
              to={`/dashboard/product/detail/${item.id}`}
            >
              {text.detail}
            </Link>
            <Link
              className="btn-pk s blue2"
              to={`/dashboard/product/edit/${item.id}`}
            >
              {text.modify}
            </Link>
            <Button
              className="btn-pk s blue2"
              text={text.dont_see}
              onClick={(e, funSetButtonStatus) => handleItemClick(item, funSetButtonStatus)}
            >
              {}
            </Button>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    //리스트 불러오기
    getProductList();
  }, []);

  return (
    <>
      <div className="inr-c">
        <div className="hd_titbox2">
          <Search
            className={"inp_txt sch"}
            placeholder={text.product_name}
            onClick={handleSearch}
          />
        </div>

        <div className="tbl_basic mtbl_ty1">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col className="imgs2" />
              <col className="" />
              <col className="wid2" />
              <col className="wid4" />
              <col className="wid4" />
              <col className="wid4" />
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{text.number}</th>
                <th>{text.product}</th>
                <th>{text.title}</th>
                <th>{text.price}</th>
                <th>{text.date}</th>
                <th>{text.status}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderProductList()}</tbody>
          </table>
        </div>

        <Pagination 
          meta={stateData?.meta} 
          callback={handlePagination} />
      </div>
    </>
  );
}
