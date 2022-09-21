import React, { useState, useEffect, useCallback } from "react";
import { useWindowSize } from "@/hook/useWindowSize";

import Group from "./Group";
import styled from "styled-components";
import { Body3 } from "@/styledMixins";
import logoGnb from "@IMAGES/dashboardeditplan-imglogognb.png";
import btnAuthorGnb from "@IMAGES/authorseries-btnauthorgnb.png";
import iconBar from "@ICONS/icon_menu_without_space.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import { faAngleLeft, faBars } from "@fortawesome/pro-solid-svg-icons";
import tempProfile from "@IMAGES/img_profile.png";

import Button from "@COMPONENTS/Button";
import { getToken } from "@/common/common";

const LoginMenu = ({ isMobile }) => {
  return (
    <>
      {(isMobile && (
        <SearchIconDiv>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ width: "100%", height: "100%" }}
          />
        </SearchIconDiv>
      )) || <Group />}
      <BtnContainer>
        <BtnPost>
          <TxtBtnPost>投稿</TxtBtnPost>
        </BtnPost>
        <BtnAuthorGnb src={btnAuthorGnb} fixedWidth />
      </BtnContainer>
    </>
  );
};

const NonLoginMenu = ({ isMobile }) => {
  return (
    <>
      {(isMobile && (
        <SearchIconDiv>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ width: "100%", height: "100%" }}
          />
        </SearchIconDiv>
      )) || <Group />}
      <Button
        text="ログイン"
        color="--white"
        bgColor="--violet-blue"
        width="100px"
        height="40px"
        marginLeft="1em"
        marginRight="1em"
        callback={() => (window.location.href = "/account")}
        borderRadius="20px"
      />
    </>
  );
};

const Header = ({ handleLeftMenu, backTitle, handleBack }) => {
  // login 구현 후 redux store에서 값 받아와야함
  const token = getToken();
  const isLogin = token !== undefined;

  const [isMobile, setIsMobile] = useState(false);
  const size = useWindowSize();
  useEffect(() => {
    if (size.width > 700) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [size]);

  return (
    <header id="header" className="header">
      <div className="inr-c">
        {
          isLogin 
            && <button type="button" className="btn_gnb" title="메뉴"><span><FontAwesomeIcon icon={faBars} /></span></button>
        }
        <h1 className="logo"><a href="#"><span className="ico_logo">PlayToons</span></a></h1>

        <div className="rgh">
          <div className="box_hd_sch">
            <input type="text" className="inp_txt" placeholder="検索キーワードを入力" />
            <button type="button" className="btns"><span><FontAwesomeIcon icon={faMagnifyingGlass} /></span></button>
          </div>
          {/* mobile button */}
          <button type="button" className="mo_btns view-m"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          
          {
            isLogin  
              ? (
                <>
                  <a href="#" className="btn_tugo btn-pk n blue bdrs"><span>投稿</span></a>
                  <a href="#" className="btn_profile"><span style={{backgroundImage: `url(${tempProfile})`}}></span></a>
                </>
              )
              : (
                <a href="#" className="btn_tugo btn-pk n blue bdrs">ログイン</a>
              )
          }
        </div>
      </div>
    {
      backTitle && 
        <div class="head_con">
          <button type="button" class="btn_back" onClick={handleBack}><span class="icon"><FontAwesomeIcon icon={faAngleLeft} />{backTitle}</span></button>
        </div>
    }
    </header>
  );
};

const HeaderDiv = styled.div`
  width: 100vw;
  height: 100px;
  background-color: var(--white);
  box-shadow: 0px 2px 20px -10px #00000080;
  padding-left: 1.5em;
  padding-right: 1.5em;
  margin-bottom: 0.7em;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
`;
const LeftMenu = styled.div`
  display: flex;
  align-items: center;
`;

const IcoBars = styled.div`
  cursor: pointer;
  width: 21px;
  height: 18px;
  background-image: url("${iconBar}");
  background-size: 100% 100%;
`;

const ImgLogoGnb = styled.img`
  width: 162px;
  height: 26px;
  margin-left: 22px;
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;
`;

const SearchIconDiv = styled.div`
  margin-left: 1em;
  margin-right: 1em;
  width: 24px;
  height: 24px;
  min-width: 400px;
`;

const BtnContainer = styled.div`
  margin-left: 30px;
  display: flex;
  align-items: center;
  min-width: 154px;
`;

const BtnPost = styled.div`
  height: 40px;
  display: flex;
  padding: 0 17px;
  justify-content: flex-end;
  align-items: center;
  min-width: 74px;
  background-color: var(--violet-blue);
  border-radius: 20px;
`;

const TxtBtnPost = styled.div`
  ${Body3}
  min-height: 20px;
  min-width: 37px;
  color: var(--white);
  line-height: 20px;
  white-space: nowrap;
`;

const BtnAuthorGnb = styled.img`
  width: 48px;
  height: 48px;
  margin-left: 32px;
`;

export default Header;
