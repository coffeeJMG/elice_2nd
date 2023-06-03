/* eslint-disable */

import React, { useEffect, useState } from "react";
import XMLParser from "react-xml-parser";
import { useNavigate } from "react-router-dom";
import userData from "./userdb.json";

// 공통 컴포넌트 연결해서 테스트함
import { Button } from "../../components/Button";
import { NavigationBar } from "../../components/NavigationBar";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer";
import { CardBox } from "../../components/CardBox";
import { Header } from "../../components/Header";
import MyPage from "./myPage";

// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";

function ChildPage() {

  return (
    
    <Container>
      <Header />
      <Header
        label={"내정보"}
        onClick={() => {
          console.log("Button was clicked!");
        }}
      />
      <Footer />
      <NavigationBar />
    </Container>
  );
}

export default ChildPage;
