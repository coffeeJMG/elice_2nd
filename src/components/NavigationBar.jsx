/* eslint-disable */

// 이미지 링크
import star from "../assets/star.svg";
import map from "../assets/map.svg";
import miniLogo from "../assets/miniLogo.svg";
import myInfo from "../assets/myInfo.svg";
import reservation from "../assets/reservation.svg";

// 상수값 연결 링크
import colors from "../constants/colors";
import fontSize from "../constants/fontSize";

import React from "react";
import styled from "styled-components";

export const NavigationBar = () => {
  return (
    <>
      <Nav>
        <NavUl>
          <NavLi>
            <NavA href="#">
              <NavImg src={reservation} alt="star"></NavImg>
              <NavP>예약현황</NavP>
            </NavA>
          </NavLi>

          <NavLi>
            <NavA href="#">
              <NavImg src={map} alt="star"></NavImg>
              <NavP>병원찾기</NavP>
            </NavA>
          </NavLi>

          <NavLi>
            <NavA href="#">
              <NavLogo src={miniLogo} alt="star"></NavLogo>
            </NavA>
          </NavLi>

          <NavLi>
            <NavA href="#">
              <NavImg src={star} alt="star"></NavImg>
              <NavP>즐겨찾기</NavP>
            </NavA>
          </NavLi>

          <NavLi>
            <NavA href="#">
              <NavImg src={myInfo} alt="star"></NavImg>
              <NavP>내정보</NavP>
            </NavA>
          </NavLi>
        </NavUl>
      </Nav>
    </>
  );
};

const Nav = styled.div`
  width: 100%;
  border-top: 1px solid ${colors.InputBorderOut};
  margin: auto;
  z-index: 99;
`;

const NavUl = styled.ul`
  height: 90px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLi = styled.li`
width: 31%;
padding: 1%;
}
`;

const NavA = styled.a`
  color: ${colors.fontColor};
`;

const NavImg = styled.img`
  width: 41px;
  height: 41px;
`;

const NavP = styled.p`
  color: #777777;
  font-weight: 500;
  margin: 4px 0 0 0;
`;

const NavLogo = styled.img`
  margin-bottom: 20px;
`;
