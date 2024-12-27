import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { url } from "./config";
import { AlertPopUp } from "../components/alertPopUp";
import { AlertContext } from "../context/alertContext";
import { Header } from "../components/header";

import { ReactComponent as Heart } from "../imgs/heart.svg";
import Profile from "../imgs/profile.svg";
import LeftArrow from "../imgs/leftArrow.svg";
import RightArrow from "../imgs/rightArrow.svg";

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
  const navigate = useNavigate();

  const [likeBool, setLikeBool] = useState(false);
  const [likeColor, setLikeColor] = useState("#E9E9E9");
  const [likeCount, setLikeCount] = useState(0);
  const [mount, setMount] = useState(false);

  const [img, setImg] = useState([]);
  const [imgCnt, setImgCnt] = useState(0);

  const [data, setData] = useState([]);
  const [chatRoom, setChatRoom] = useState([]);
  const [user, setUser] = useState([]);

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

  // 게시물 데이터 요청
  useEffect(() => {
    axios
      .get(`${url}/post/${Param.id}`, { withCredentials: true })
      .then((res) => {
        setData(res.data);
        setLikeCount(res.data.LikeNumber);
        getImage();
      });
  }, [Param.id, getImage]);

  useEffect(() => {
    GetLoggedUserInfo();
    GetChatRoom();
  }, []);

  // 로그인된 유저 확인
  const GetLoggedUserInfo = () => {
    axios
      .get(`${url}/auth`, { withCredentials: true })
      .then((res) => {
        setUser(res.data.result.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 채팅방 확인
  const GetChatRoom = () => {
    axios
      .get(`${url}/chat/room`, { withCredentials: true })
      .then((res) => {
        setChatRoom(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 채팅방 생성
  const CreateChatRoom = () => {
    axios
      .post(`${url}/chat/room`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/chating");
  };

  // 채팅방 참여
  const JoinChatRoom = () => {
    axios
      .post(`${url}/chat/room/join/${chatRoom.id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/chating");
  };

  // 채팅방을 생성하고 참여 or 채팅방이 있으면 참여
  const HandleChatRoom = () => {
    if (Param.id == chatRoom.id) {
      JoinChatRoom();
    } else {
      CreateChatRoom();
      JoinChatRoom();
    }
  };

  // 끌어올리기
  const PullPost = () => {
    axios
      .post(`${url}/post/${data.postId}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 게시물 삭제
  const DeletePost = () => {
    axios
      .delete(`${url}/post/${data.postId}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        navigate("/main");
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
          <img
            src={LeftArrow}
            alt="left"
            className="cursor-pointer"
            onClick={() => changeImage("left")}
          />
          {/* 본 이미지*/}
          <img
            src={img[imgCnt]}
            alt="img"
            className="w-[550px] h-[550px] select-none rounded-2xl"
          />
          {/* 오른쪽 화살표 */}
          <img
            src={RightArrow}
            alt="right"
            className="cursor-pointer"
            onClick={() => changeImage("right")}
          />
        </div>
        <header className="flex items-center w-full gap-6 text-xl font-bold">
          <img src={Profile} className="w-9 h-9" />
          <div className="py-8 text-xl font-bold">{data.writer}</div>
          {/* 조회인이 나인지 타인인지  */}
          {user != data.writer ? (
            <button
              className="px-4 py-3 ml-auto text-white bg-primary-primary rounded-3xl"
              onClick={HandleChatRoom}
            >
              채팅하기
            </button>
          ) : (
            <div className="flex gap-3 ml-auto">
              <button
                className="px-4 py-3 text-white bg-red-500 rounded-3xl"
                onClick={() => DeletePost}
              >
                삭제하기
              </button>
              <button
                className="px-4 py-3 text-white bg-primary-primary rounded-3xl"
                onClick={() => navigate(`/postEdit${data.postId}`)}
              >
                수정하기
              </button>
              <button
                className="px-4 py-3 bg-white border text-primary-primary border-primary-primary rounded-3xl"
                onClick={PullPost}
              >
                끌어올리기
              </button>
            </div>
          )}
        </header>
        <div className="w-full h-[2px] bg-primary-primary"></div>
        <main className="flex flex-col w-full gap-8 px-1 pt-6">
          <div className="flex">
            {/* 내용 */}
            <section className="flex flex-col gap-3">
              <h1 className="text-2xl font-bold">{data.title}</h1>
              <p className="text-sm font-bold text-gray-400">
                {data.Category || "category"} · {data.realTime || "realTime"}
              </p>
              <p className="text-base font-bold">
                사례금 : {data.Price || "price"}원
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
          <p className="text-sm font-normal">{data.Content || "content"}</p>
        </main>
      </div>
    </div>
  );
}
