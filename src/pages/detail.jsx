import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { url } from "./config";
import { AlertPopUp } from "../components/alertPopUp";
import { AlertContext } from "../context/alertContext";
import { Header } from "../components/header";

import { ReactComponent as Heart } from "../imgs/heart.svg";
import Profile from "../imgs/profile.svg";

const getDate = (value) => {
  const today = new Date();
  const timeValue = new Date(Math.floor(value));

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
};

const where = (lo) => {
  if (lo === 1) {
    return "기숙사";
  } else if (lo === 2) {
    return "본관";
  } else {
    return "금봉관";
  }
};

export function Detail() {
  const Param = useParams();

  const [likeBool, setLikeBool] = useState(false);
  const [likeColor, setLikeColor] = useState("#E9E9E9");
  const [likeCount, setLikeCount] = useState(0);
  const [mount, setMount] = useState(false);

  const [img, setImg] = useState([]);
  const [imgCnt, setImgCnt] = useState(0);

  const [data, setData] = useState([]);

  // 알림
  const { alertPopUp, setAlertPopUp } = useContext(AlertContext);

  const ToggleLike = () => {
    setLikeBool(!likeBool);
  };

  // 좋아요 로직
  useEffect(() => {
    if (mount == true) {
      setLikeColor(likeBool ? "#ff6969" : "#E9E9E9");
      setLikeCount(likeBool ? likeCount + 1 : likeCount - 1);

      likeBool
        ? axios
            .post(
              `${url}/post/${Param.id}/like`,
              { like: likeBool },
              { withCredentials: true }
            )
            .catch((err) => console.log(err))
        : axios
            .delete(`${url}/post/${Param.id}/like`, { withCredentials: true })
            .catch((err) => console.log(err));
    } else {
      setMount(true);
    }
  }, [likeBool]);

  // 이미지 전환
  const changeImage = (direction) => {
    if (direction === "left") {
      setImgCnt((prev) => (prev === 0 ? img.length - 1 : prev - 1));
    } else if (direction === "right") {
      setImgCnt((prev) => (prev === img.length - 1 ? 0 : prev + 1));
    }
  };

  // 이미지 요청
  const getImage = () => {
    axios
      .get(`${url}/post/${Param.id}`, { withCredentials: true })
      .then((res) => {
        setImg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 데이터 요청
  useEffect(() => {
    axios
      .get(`${url}/post/${Param.id}`, { withCredentials: true })
      .then((res) => {
        setData(res.data);
        setLikeCount(res.data.LikeNumber);
        getImage();
      });
  }, [Param.id, getImage]);

  const Chat = () => {
    axios
      .post(`${url}/chat/room`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Header />
      {alertPopUp && <AlertPopUp />}
      <div className="flex mt-[60px] items-center justify-center flex-col p-[25px]">
        <div className="flex items-center">
          {/* 왼쪽 화살표 */}
          <svg
            className="cursor-pointer"
            onClick={() => changeImage("left")}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.7273 3.68676C12.8176 3.59129 12.8881 3.47898 12.9349 3.35626C12.9817 3.23353 13.0039 3.10278 13.0002 2.97148C12.9965 2.84017 12.9669 2.71089 12.9133 2.591C12.8596 2.47112 12.7828 2.36298 12.6873 2.27276C12.5919 2.18254 12.4796 2.11201 12.3568 2.0652C12.2341 2.01838 12.1034 1.9962 11.9721 1.99991C11.8408 2.00363 11.7115 2.03317 11.5916 2.08684C11.4717 2.14052 11.3636 2.21729 11.2733 2.31276L2.77334 11.3128C2.59781 11.4984 2.5 11.7442 2.5 11.9998C2.5 12.2553 2.59781 12.5011 2.77334 12.6868L11.2733 21.6878C11.363 21.7853 11.4711 21.8641 11.5914 21.9195C11.7117 21.975 11.8419 22.0059 11.9743 22.0106C12.1067 22.0153 12.2387 21.9937 12.3626 21.9469C12.4866 21.9002 12.6 21.8293 12.6963 21.7383C12.7927 21.6474 12.8699 21.5382 12.9237 21.4171C12.9775 21.296 13.0067 21.1655 13.0095 21.033C13.0124 20.9006 12.989 20.7689 12.9405 20.6456C12.8921 20.5223 12.8196 20.4098 12.7273 20.3148L4.87534 11.9998L12.7273 3.68676Z"
              fill="black"
            />
          </svg>
          {/* 이미지 추가 (필수) */}
          <img
            src={img[imgCnt]}
            alt="img"
            className="w-[550px] h-[550px] select-none rounded-2xl"
          />
          {/* 오른쪽 화살표 */}
          <svg
            className="cursor-pointer"
            onClick={() => changeImage("right")}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M11.2727 20.3132C11.1824 20.4087 11.1119 20.521 11.0651 20.6437C11.0183 20.7665 10.9961 20.8972 10.9998 21.0285C11.0035 21.1598 11.0331 21.2891 11.0867 21.409C11.1404 21.5289 11.2172 21.637 11.3127 21.7272C11.4081 21.8175 11.5204 21.888 11.6432 21.9348C11.7659 21.9816 11.8966 22.0038 12.0279 22.0001C12.1592 21.9964 12.2885 21.9668 12.4084 21.9132C12.5283 21.8595 12.6364 21.7827 12.7267 21.6872L21.2267 12.6872C21.4022 12.5016 21.5 12.2558 21.5 12.0002C21.5 11.7447 21.4022 11.4989 21.2267 11.3132L12.7267 2.31224C12.637 2.21468 12.5289 2.13589 12.4086 2.08047C12.2883 2.02505 12.1581 1.99408 12.0257 1.98938C11.8933 1.98468 11.7613 2.00633 11.6374 2.05307C11.5134 2.09982 11.4 2.17073 11.3037 2.26168C11.2073 2.35263 11.1301 2.46182 11.0763 2.5829C11.0225 2.70398 10.9933 2.83453 10.9905 2.96698C10.9876 3.09942 11.011 3.23112 11.0595 3.35443C11.1079 3.47773 11.1804 3.59018 11.2727 3.68524L19.1247 11.9998L11.2727 20.3132Z"
              fill="black"
            />
          </svg>
        </div>

        <header className="flex items-center w-full gap-6 text-">
          <img src={Profile} className="w-9 h-9" />
          <div className="py-8 text-xl font-bold">{data.writer}</div>
          <button
            className="px-4 py-3 ml-auto text-white bg-primary-primary rounded-3xl"
            onClick={Chat}
          >
            채팅하기
          </button>
        </header>
        <div className="w-full h-[2px] bg-primary-primary"></div>
        <main className="flex flex-col w-full gap-8 px-1 pt-6">
          <div className="flex">
            {/* 내용 */}
            <section className="flex flex-col gap-3">
              <h1 className="text-2xl font-bold">{data.title}</h1>
              <p className="text-sm font-bold text-gray-400">
                {data.Category || "잃어버렸습니다 "}
                {data.realTime || "2시간전"}
              </p>
              <p className="text-base font-bold">
                사례금 : {data.Price || "2000원"}
              </p>
            </section>
            {/* 좋아요 */}
            <section className="flex items-center gap-3 ml-auto h-max">
              <Heart onClick={ToggleLike} stroke={likeColor} />
              <p className="text-2xl font-black text-gray-500">
                {likeCount || 0}
              </p>
            </section>
          </div>
          <p className="text-sm font-normal">
            {data.Content || "투명 케이스에 들어있습니다."}
          </p>
        </main>
      </div>
    </div>
  );
}
