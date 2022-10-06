import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ImgComic1 from "@IMAGES/tmp_comic1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCommentQuote,
  faShare,
} from "@fortawesome/pro-solid-svg-icons";
import { faAngleLeft, faAngleRight } from "@fortawesome/pro-light-svg-icons";
import Plan from "./Plan";
import Series from "./Series";

const PostItem = () => {
  return (
    <>
      <div className="lst_detail">
        <ul>
          <li className="item">
            <a href="#">
              <div className="thumb">
                <img src={ImgComic1} alt="" />
              </div>
              <div className="txt">
                <p className="h1">
                  2話 :
                  シェルターアークシェルターアークシェルターアークシェルターアークシェルターアーク
                </p>
                <p className="t1">
                  モと戦う為、特殊チームレンジャーを創設したが、
                  <br />
                  クモの圧倒的な力には勝てず。
                </p>
              </div>
              <div className="botm">
                <p className="d1">2022/09/12 12:00</p>
                <button type="button" className="btn01">
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ marginRight: "7px" }}
                  />
                  1.2k
                </button>
                <button type="button" className="btn01">
                  <FontAwesomeIcon
                    icon={faCommentQuote}
                    style={{ marginRight: "7px" }}
                  />
                  966
                </button>
              </div>
            </a>
          </li>
          <li className="item">
            <a href="#">
              <div className="thumb">
                <img src={ImgComic1} alt="" />
              </div>
              <div className="txt">
                <p className="h1">3話 : シェルターアーク</p>
                <p className="t1">
                  モと戦う為、特殊チームレンジャーを創設したが、
                  <br />
                  クモの圧倒的な力には勝てず。
                </p>
              </div>
              <div className="botm">
                <p className="d1">2022/09/12 12:00</p>
                <button type="button" className="btn01">
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ marginRight: "7px" }}
                  />
                  1.2k
                </button>
                <button type="button" className="btn01">
                  <FontAwesomeIcon
                    icon={faCommentQuote}
                    style={{ marginRight: "7px" }}
                  />
                  966
                </button>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div className="pagenation">
        <ul>
          <li className="prev">
            <a href="#">
              <FontAwesomeIcon icon={faAngleLeft} />
            </a>
          </li>
          <li>
            <a href="#">1</a>
          </li>
          <li className="on">
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li className="next">
            <a href="#">
              <FontAwesomeIcon icon={faAngleRight} />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

const Post = () => {
  const currentAuthor = useSelector(({ author }) => author.currentAuthor);
  const [selectTab, setSelectTab] = useState("POST");

  return (
    <div className="contents">
      <div className="wrap_author_detail">
        <div className="box_profile _longs">
          <ImgTmpProfileBgDiv
            className="pf_thumb"
            bgImg={currentAuthor?.backgroundImage}
          ></ImgTmpProfileBgDiv>
          <div className="pf_txt">
            <div className="icon">
              <img src={currentAuthor?.profileImage} alt="profile" />
            </div>
            <p className="h1">{currentAuthor?.nickname}</p>
            <p className="t1">{currentAuthor?.description}</p>
            <div className="btns">
              <a href="#" className="btn-pk n blue">
                フォロー
              </a>
              <a href="#" className="btn-pk n blue2">
                <FontAwesomeIcon icon={faShare} />
                共有する
              </a>
            </div>
          </div>
        </div>

        <div className="inr-c">
          <div className="tabs ty2">
            <ul>
              <li
                className={selectTab === "POST" ? "on" : ""}
                onClick={() => setSelectTab("POST")}
              >
                <a>
                  <span>投稿</span>
                </a>
              </li>
              <li
                className={selectTab === "SERIES" ? "on" : ""}
                onClick={() => setSelectTab("SERIES")}
              >
                <a>
                  <span>シリーズ</span>
                </a>
              </li>
              <li
                className={selectTab === "PLAN" ? "on" : ""}
                onClick={() => setSelectTab("PLAN")}
              >
                <a>
                  <span>プラン</span>
                </a>
              </li>
              <li
                className={selectTab === "POST2" ? "on" : ""}
                onClick={() => setSelectTab("POST2")}
              >
                <a>
                  <span>ストア</span>
                </a>
              </li>
            </ul>
          </div>
          {selectTab === "POST" && <PostItem />}
          {selectTab === "SERIES" && <Series item={currentAuthor} />}
          {selectTab === "PLAN" && <Plan item={currentAuthor} />}
        </div>
      </div>
    </div>
  );
};

const ImgTmpProfileBgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
  height: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export default Post;
