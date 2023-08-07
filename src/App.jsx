import { RegisterForm } from "./pages/registerForm/RegisterForm";

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 페이지 연결
import {
  AdminHome,
  Home,
  MyPage,
  Login,
  SearchPage,
  SignUp,
  Detail,
  Reserve,
  MapHospital,
  Jail,
  ReservationChk,
  ChildPage,
  Favorite,
  ModifyForm,
} from "./pages/index";

const token = localStorage.getItem("token");

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Helmet>
                <title>아이사랑</title>
              </Helmet>
              <Home />
            </>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 로그인</title>
              </Helmet>
              <Login />
            </>
          }
        ></Route>
        <Route
          path="/SignUp"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 회원가입</title>
              </Helmet>
              <SignUp />
            </>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 신규병원등록</title>
              </Helmet>
              <RegisterForm />
            </>
          }
        />
        <Route
          path="admin"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 관리자페이지</title>
              </Helmet>
              <AdminHome />
            </>
          }
        />
        <Route
          path="/reserve"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 예약현황</title>
              </Helmet>
              {isLogin ? <ReservationChk /> : <Login />}
            </>
          }
        />
        <Route
          path="/search"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 병원찾기</title>
              </Helmet>
              {isLogin ? <SearchPage /> : <Login />}
            </>
          }
        />
        <Route
          path="/detail/"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 병원상세</title>
              </Helmet>
              {isLogin ? <Detail /> : <Login />}
            </>
          }
        />
        <Route
          path="/detail/reserve"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 예약하기</title>
              </Helmet>
              {isLogin ? <Reserve /> : <Login />}
            </>
          }
        />
        <Route
          path="/detail/map"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 병원위치찾기</title>
              </Helmet>
              {isLogin ? <MapHospital /> : <Login />}
            </>
          }
        />
        <Route
          path="/Mypage"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 내정보</title>
              </Helmet>
              {isLogin ? <MyPage /> : <Login />}
            </>
          }
        />
        <Route
          path="/Mypage/ChildPage"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 아이정보</title>
              </Helmet>
              {isLogin ? <ChildPage /> : <Login />}
            </>
          }
        />
        <Route
          path="/favorite"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 즐겨찾기</title>
              </Helmet>
              {isLogin ? <Favorite /> : <Login />}
            </>
          }
        />
        <Route
          path="/modify"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 병원정보수정</title>
              </Helmet>
              {isLogin ? <ModifyForm /> : <Login />}
            </>
          }
        />
        <Route
          path="/jail"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 승인대기</title>
              </Helmet>
              <Jail />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
