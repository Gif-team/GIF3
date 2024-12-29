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

function where(lo) {
  if (lo === 1) return "본관";
  else if (lo === 2) return "금봉관";
  else return "기숙사";
}

function getDate(value) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  const betweenTimeHour = Math.floor(betweenTime / 60);
  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);

  if (betweenTime < 1) return "방금전";
  else if (betweenTime < 60) return `${betweenTime}분전`;
  else if (betweenTimeHour < 24) return `${betweenTimeHour}시간전`;
  else if (betweenTimeDay < 365) return `${betweenTimeDay}일전`;
  else return `${Math.floor(betweenTimeDay / 365)}년전`;
}

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

  // 알림 팝업 상태
  const { alertPopUp, setAlertPopUp } = useContext(AlertContext);

  const ToggleLike = () => {
    setLikeBool(!likeBool);
  };

  // 좋아요 상태 변경
  useEffect(() => {
    if (mount) {
      setLikeColor(likeBool ? "#ff6969" : "#E9E9E9");
      setLikeCount((prev) => (likeBool ? prev + 1 : prev - 1));

      axios
        .post(
          `${url}/post/${Param.id}/like`,
          { like: likeBool },
          { withCredentials: true }
        )
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

  useEffect(() => {
    const getPost = () => {
      axios
        .get(`${url}/post/${Param.id}`, { withCredentials: true })
        .then((res) => {
          setData(res.data);
          setLikeCount(res.data.likeNumber);
          setLikeBool(res.data.likeState);
        })
        .catch((err) => console.log(err));
    };

    const getImgs = () => {
      axios
        .get(`${url}/post/${Param.id}/images`, { withCredentials: true })
        .then((res) => {
          setImg(res.data);
        })
        .catch((err) => console.log(err));
    };

    const getUserInfo = () => {
      axios
        .get(`${url}/auth/user`, { withCredentials: true })
        .then((res) => {
          setUser(res.data.result);
        })
        .catch((err) => console.log(err));
    };

    const getChatRoom = () => {
      axios
        .get(`${url}/chat/room`, { withCredentials: true })
        .then((res) => {
          setChatRoom(res.data.result);
        })
        .catch((err) => console.log(err));
    };

    getPost();
    getImgs();
    getUserInfo();
    getChatRoom();
  }, [Param.id]);

  // 채팅방 생성
  const CreateChatRoom = () => {
    axios
      .post(`${url}/chat/room`, {}, { withCredentials: true })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    navigate("/chating");
  };

  // 채팅방 참여
  const JoinChatRoom = () => {
    axios
      .post(
        `${url}/chat/room/join/${chatRoom.id}`,
        {},
        { withCredentials: true }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    navigate("/chating");
  };

  const HandleChatRoom = () => {
    if (Param.id === chatRoom.id) {
      JoinChatRoom();
    } else {
      CreateChatRoom();
    }
  };

  const PullPost = () => {
    axios
      .post(
        `${url}/post/${Param.id}/update`,
        { postId: Param.id },
        { headers: { withCredentials: true } }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const DeletePost = () => {
    axios
      .delete(`${url}/post/${Param.id}`, { withCredentials: true })
      .then(() => navigate("/main"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Header />
      {alertPopUp && <AlertPopUp />}
      <div className="flex mt-[60px] items-center justify-center flex-col p-[25px]">
        <div className="flex items-center">
          <img
            src={LeftArrow}
            alt="left"
            className="cursor-pointer"
            onClick={() => changeImage("left")}
          />
          <img
            src={img[imgCnt]}
            alt="img"
            className="w-[550px] h-[550px] select-none rounded-2xl"
          />
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
          {user.username !== data.writer ? (
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
                onClick={() => {
                  DeletePost();
                  navigate("/main");
                }}
              >
                삭제하기
              </button>
              <button
                className="px-4 py-3 text-white bg-primary-primary rounded-3xl"
                onClick={() => navigate(`/postEdit/${Param.id}`)}
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
            <section className="flex flex-col gap-3">
              <h1 className="text-2xl font-bold">{data.title}</h1>
              <p className="text-sm font-bold text-gray-400">
                {`${data.category ? "찾았습니다" : "잃어버렸습니다"} ∙ ${
                  data.building?.floor
                }층 ∙ ${where(data.building?.id)} ∙ ${getDate(data.realtime)}`}
              </p>
              <p className="text-base font-bold">
                사례금 : {data.price || "price"}원
              </p>
            </section>
            <section className="flex items-center gap-3 ml-auto h-max">
              <Heart onClick={ToggleLike} stroke={likeColor} fill={likeColor} />
              <p>{likeCount}</p>
            </section>
          </div>
          <p>{data.content}</p>
        </main>
      </div>
    </div>
  );
}
