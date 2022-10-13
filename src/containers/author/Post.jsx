import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import { getFileUrlFromServer } from "@API/fileService";

async function getFileURLData(hash, state) {
  const response = await getFileUrlFromServer(hash);
  if (response.status === 200) {
    state(response?.data?.url);
  }
}

// Post API 나오면 작업
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
  const [backgroundImgURL, setBackgroundImgURL] = useState(null);
  const [profileImgURL, setProfileImgURL] = useState(null);

  useEffect(() => {
    if (currentAuthor?.backgroundImage) {
      getFileURLData(currentAuthor.backgroundImage, setBackgroundImgURL);
    }
    if (currentAuthor?.profileImage) {
      getFileURLData(currentAuthor.profileImage, setProfileImgURL);
    }
  }, [currentAuthor]);
  const [selectTab, setSelectTab] = useState("POST");

  return (
    <div className="contents">
      <div className="wrap_author_detail">
        <div className="box_profile _longs">
          {/* 이미지 default 값 필요 */}
          <ImgTmpProfileBgDiv
            className="pf_thumb"
            bgImg={backgroundImgURL}
          ></ImgTmpProfileBgDiv>
          <div className="pf_txt">
            <div className="icon">
              {/* 이미지 default 값 필요 */}
              <img src={profileImgURL} alt="profile" />
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
                <Link to="">
                  <span>投稿</span>
                </Link>
              </li>
              <li
                className={selectTab === "SERIES" ? "on" : ""}
                onClick={() => setSelectTab("SERIES")}
              >
                <Link to="">
                  <span>シリーズ</span>
                </Link>
              </li>
              <li
                className={selectTab === "PLAN" ? "on" : ""}
                onClick={() => setSelectTab("PLAN")}
              >
                <Link to="">
                  <span>プラン</span>
                </Link>
              </li>
              <li
                className={selectTab === "POST2" ? "on" : ""}
                onClick={() => setSelectTab("POST2")}
              >
                <Link to="">
                  <span>ストア</span>
                </Link>
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
