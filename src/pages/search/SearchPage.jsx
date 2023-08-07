import * as Style from "./styles/SearchPageStyle";

//아이콘
import { IconDown } from "../../assets/index";

// 공통 컴포넌트
import {
  Container,
  Header,
  NavigationBar,
  SearchBar,
} from "../../components/index";

//import문
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";

//utils
import {
  BE_URL,
  endpoint_user,
  endpoint_favorite,
  getUserToken,
} from "../../utils.js";

//병원리스트 - 병원카드 컴포넌트
import { HospitalCard } from "./HospitalCard";

//검색 정렬 옵션
const SORT_OPTIONS = [
  { name: "인기순", state: "review" },
  { name: "이름순", state: "name" },
];

export const SearchPage = () => {
  // 위치정보 depth1, depth2
  const [depth1, setDepth1] = useState("전국");
  const [depth2, setDepth2] = useState("");
  const handleDepthChange = (first, second) => {
    setDepth1(first);
    setDepth2(second);
  };
  //url에서 id 추출
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParams = searchParams.get("query");

  // 키워드 검색어 - url에 keyword가 넘어오면 넣고, 없으면 빈 string
  const [searchKeyword, setSearchKeyword] = useState(
    queryParams !== null ? queryParams : ""
  );

  //검색결과 총 데이터 개수
  const [totalCount, setTotalCount] = useState(0);
  //검색 필터 옵션
  const [option, setOption] = useState(SORT_OPTIONS[0]);
  // 검색 시 url query params 업데이트
  useEffect(() => {
    updateURL();
  }, [searchKeyword]);

  // 옵션창 펼쳐졌는지
  const [isOpenOption, setIsOpenOption] = useState(false);

  //무한스크롤 구현
  const [hospitalList, setHospitalList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [ref, inView] = useInView();

  // 유저 정보
  const userToken = getUserToken();
  const { data: userQuery, userIsLoading } = useQuery(["user"], async () => {
    //유저 토큰이 있는 경우에만 요청
    if (userToken) {
      try {
        const response = await axios.get(`${BE_URL}${endpoint_user}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else {
      return null;
    }
  });

  //유저정보
  const userData = userQuery?.data ?? [];
  const user_id = userData.id;

  //무한스크롤
  //병원리스트 추가 시 중복제거
  function removeDuplicates(array, key) {
    const uniqueKeys = new Set();
    return array.filter((item) => {
      if (uniqueKeys.has(item[key])) {
        return false;
      }
      uniqueKeys.add(item[key]);
      return true;
    });
  }
  // 서버에서 병원데이터를 가지고 오는 함수
  useEffect(() => {
    const getHospital = async () => {
      setLoading(true);
      let url;
      if (depth1 === "전국") {
        url = `${BE_URL}hospital?size=10&page=${page}&sort=${option.state}&dutyName=${searchKeyword}`;
      } else if (depth2 === "전체") {
        url = `${BE_URL}hospital?depth1=${depth1}&size=10&page=${page}&sort=${option.state}&dutyName=${searchKeyword}`;
      } else {
        url = `${BE_URL}hospital?depth1=${depth1}&depth2=${depth2}&size=10&page=${page}&sort=${option.state}&dutyName=${searchKeyword}`;
      }
      await axios.get(url).then((res) => {
        // 중복 제거
        const uniqueHospitals = removeDuplicates(
          [...hospitalList, ...res.data.data[0][0]],
          "id"
        );
        setHospitalList(uniqueHospitals);
      });
      setLoading(false);
    };
    getHospital();
  }, [page]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView]);

  useEffect(() => {
    // depth1, depth2, searchKeyword가 바뀔 때는 병원 데이터를 초기화
    const resetHospitalList = async () => {
      setLoading(true);
      setPage(1);
      setHospitalList([]);
      let url;
      if (depth1 === "전국") {
        url = `${BE_URL}hospital?size=10&page=${page}&sort=${option.state}&dutyName=${searchKeyword}`;
      } else if (depth2 === "전체") {
        url = `${BE_URL}hospital?depth1=${depth1}&size=10&page=${page}&sort=${option.state}&dutyName=${searchKeyword}`;
      } else {
        url = `${BE_URL}hospital?depth1=${depth1}&depth2=${depth2}&size=10&page=${page}&sort=${option.state}&dutyName=${searchKeyword}`;
      }
      await axios.get(url).then((res) => {
        setHospitalList(res.data.data[0][0]);
        setTotalCount(res.data.data[1]);
      });
      setLoading(false);
    };

    resetHospitalList();
  }, [depth1, depth2, searchKeyword, option.state]);

  // 즐겨찾기 리스트 받아오기
  const { data: favoritesQuery, favoriteIsLoading } = useQuery(
    ["favorites"],
    // instance를 사용해 중복되는 옵션 제거
    () => {
      // userToken이 있는 경우에만 API 호출 수행
      if (userToken) {
        return axios.get(`${BE_URL}${endpoint_favorite}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
      } else {
        // 로그인되지 않은 경우, 빈 배열이나 기본값 반환
        return null;
      }
    },
    {
      //백엔드에서 주는 데이터를 내가 원하는 가공해서 받을 수 있습니다.
      select: (response) => {
        return response.data;
      },
      // 에러 핸들링
      onError: (error) => {
        console.log(error);
      },
    }
  );

  //로딩중일 경우 null값 반환
  if (userIsLoading || favoriteIsLoading) {
    return null;
  }

  //즐겨찾기 리스트
  const favoritesList = favoritesQuery?.data ?? [];

  //오늘 날짜(요일) 저장
  let now = new Date();
  const today = now.getDay();

  // 검색 옵션버튼 클릭 시
  const handleOptionClick = () => {
    setIsOpenOption(!isOpenOption);
  };

  // 검색 옵션(SORT OPTION) 변경 시
  const handleOptionChange = (e) => {
    const selectedOptionState = e.target.value;
    const selectedOption = SORT_OPTIONS.find(
      (option) => option.state === selectedOptionState
    );

    if (selectedOption) {
      setOption(selectedOption);
      setIsOpenOption(false);
    }
  };

  // 키워드 검색 요청 시
  const handleSearch = (search) => {
    setSearchKeyword(search);
  };

  // 검색 시 url query params 업데이트
  const updateURL = () => {
    const params = new URLSearchParams();
    params.set("query", searchKeyword);
    window.history.pushState({}, "", `/search?${params.toString()}`);
  };

  const renderHospitalCards = (hospital) => {
    //today가 0일 경우(일요일) 7번째 dutyTime값을 가져오도록 함
    const dutyTimeStart =
      today === 0 ? hospital.dutyTime7s : hospital[`dutyTime${today}s`]; // 오늘 요일에 해당하는 dutyTime 시작 시간
    const dutyTimeClose =
      today === 0 ? hospital.dutyTime7c : hospital[`dutyTime${today}c`]; // 오늘 요일에 해당하는 dutyTime 종료 시간
    //즐겨찾기 해당여부 체크
    const favorite = favoritesList.some(
      (favoriteItem) =>
        favoriteItem.userId === user_id &&
        favoriteItem.hospitalId === hospital.id
    );
    return (
      <HospitalCard
        key={hospital.id}
        hpid={hospital.id}
        hospitalName={hospital.dutyName}
        hospitalAddress={`${hospital.dutyAddr1Depth} ${hospital.dutyAddr2Depth} ${hospital.dutyAddr3Depth}`}
        today={today}
        dutyTimeStart={dutyTimeStart}
        dutyTimeClose={dutyTimeClose}
        favorite={favorite}
      />
    );
  };

  return (
    <Container>
      <Header label={"병원 찾기"} />
      <Style.Wrapper>
        <SearchBar
          onSearch={(search) => handleSearch(search)}
          keyword={searchKeyword}
          depth1={depth1}
          depth2={depth2}
          onLocationChange={handleDepthChange}
        />
        <Style.SearchHeader>
          <span>총 {totalCount} 개</span>
          <Style.DropdownContainer>
            <button onClick={handleOptionClick}>
              {option.name}
              <img alt="icon-down" src={IconDown}></img>
            </button>
            {isOpenOption && (
              <div>
                {SORT_OPTIONS.map((option) => (
                  <option
                    key={option.state}
                    value={option.state}
                    onClick={handleOptionChange}
                  >
                    {option.name}
                  </option>
                ))}
              </div>
            )}
          </Style.DropdownContainer>
        </Style.SearchHeader>
        {hospitalList.length > 0 ? (
          hospitalList.map((hospital) => (
            <div key={hospital.id}>
              {hospitalList[hospitalList.length - 1].id === hospital.id ? (
                <div className="list-item" ref={ref}>
                  {renderHospitalCards(hospital)}
                </div>
              ) : (
                <div className="list-item">{renderHospitalCards(hospital)}</div>
              )}
            </div>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </Style.Wrapper>
      <NavigationBar />
    </Container>
  );
};
