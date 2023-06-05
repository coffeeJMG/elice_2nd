import React, { useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import CardBox from "../../components/CardBox";
import IconLeft from "../../assets/iconLeftGreen.svg";
import IconRight from "../../assets/iconRightGreen.svg";
// import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

export const MyCalendar = () => {
  const curDate = new Date(); // 현재 날짜
  const [value, onChange] = useState(curDate); // 클릭한 날짜 - 초기값 현재 날짜
  const activeDate = moment(value).format("YY.MM.DD"); // 클릭한 날짜 (년-월-일)
  // const monthOfActiveDate = moment(value).format("MM월");
  // const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);

  // const getActiveMonth = (activeStartDate: moment.MomentInput) => {
  //   const newActiveMonth = moment(activeStartDate).format('MM월');
  //   setActiveMonth(newActiveMonth);
  // };

  return (
    <>
      <CardBox linkTo={"#"}>
        <ShowDate>
          <h1>{activeDate}</h1>
        </ShowDate>
      </CardBox>
      <CardBox linkTo={"#"}>
        <ShowCalendar>
          <Test
            locale="ko"
            onChange={onChange}
            value={value}
            nextLabel=<img alt="icon-right" src={IconRight}></img>
            prevLabel=<img alt="icon-left" src={IconLeft}></img>
            next2Label={null}
            prev2Label={null}
            showNeighboringMonth={false} // 앞뒤달에 이어지는 날짜
            /* { onActiveStartDateChange={({ activeStartDate }) =>
              getActiveMonth(activeStartDate)
            } } */
          />
        </ShowCalendar>
      </CardBox>
      <CardBox>
        <DiaryHeader>
          <div>
            <span>5월</span>
            <hr />
          </div>
        </DiaryHeader>
      </CardBox>
    </>
  );
};

const Test = styled(Calendar)`
  .react-calendar {
    width: 100%;
    max-width: 832px;
    background: red;
    border: 1px solid #a0a096;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }

  /* 상단 네비게이션 바 */
  .react-calendar__navigation {
    display: flex;
    width: 100%;
    height: 110px;

    .react-calendar__navigation__label {
      font-weight: bold;
      font-size: 20px;
    }

    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
  }

  .react-calendar--doubleView {
    width: 100%;
  }

  /* 요일 라벨 */
  .react-calendar__month-view__weekdays {
    text-align: center;
    font-size: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  /* 버튼 */
  button {
    height: 80px;
    margin: 3px;
    background-color: #6f876f;
    border-radius: 10px;
    color: white;
    font-size: 30px;
    padding: 5px 0;

    &:hover {
      background-color: #556b55;
    }

    &:active {
      background-color: #a5c1a5;
    }
  }

  /* 일자 그리드 스타일 */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;

    .react-calendar__tile {
      max-width: initial !important;
    }
  }

  /* 해당 월의 날짜가 아니면 투명도 0.7 */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.7;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #dfdfdf;
  }

  .react-calendar__tile--range {
    box-shadow: 0 0 6px 2px black;
  }

  /* 월 & 년도 버튼 스타일 */
  .react-calendar__year-view__months,
  .react-calendar__decade-view__years,
  .react-calendar__century-view__decades {
    display: grid !important;
    margin-top: 70px;
    grid-template-columns: 20% 20% 20% 20% 20%;

    &.react-calendar__year-view__months {
      grid-template-columns: 33.3% 33.3% 33.3%;
    }

    .react-calendar__tile {
      max-width: initial !important;
    }
  }
`;

const ShowDate = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;

  & h1 {
    font-size: 30px;
    color: #00ad5c;
    font-weight: bold;
    text-decoration-line: none;
  }
`;

const ShowCalendar = styled.div`
  // width: 100%;
  // display: flex;
  text-align: center;
  justify-content: center;
`;

const DiaryHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;

  & > div:nth-child(2) {
    color: #00ad5c;
    font-weight: 600;
    padding: 2%;
    margin: 2%;
    border-bottom: 2px solid;
  }

  & > span {
    width: 100%;
  }
`;
