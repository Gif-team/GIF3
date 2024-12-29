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

  const [img, setImg] = useState([]);
  const [imgCnt, setImgCnt] = useState(0);

  const [data, setData] = useState([]);
  const [chatRoom, setChatRoom] = useState([]);
  const [user, setUser] = useState([]);

  // 알림
  const { alertPopUp, setAlertPopUp } = useContext(AlertContext);

  // 좋아요 상태 가져오기
  const fetchLikeState = () => {
    axios
      .get(`${url}/post/${Param.id}/like`, { withCredentials: true })
      .then((res) => {
        setLikeBool(res.data.liketrueorfalse);
        setLikeColor(res.data.liketrueorfalse ? "#ff6969" : "#E9E9E9");
      })
      .catch((err) => {
        console.error("좋아요 상태 가져오기 실패:", err);
      });
  };

  // 좋아요 상태 토글
  const ToggleLike = () => {
    const newLikeState = !likeBool;
    setLikeBool(newLikeState);
    setLikeColor(newLikeState ? "#ff6969" : "#E9E9E9");
    setLikeCount((prev) => (newLikeState ? prev + 1 : prev - 1));

    axios
      .post(
        `${url}/post/${Param.id}/like`,
        { like: newLikeState },
        { withCredentials: true }
      )
      .catch((err) => {
        console.error(err);
        setLikeBool(!newLikeState); // 요청 실패 시 복구
        setLikeColor(!newLikeState ? "#ff6969" : "#E9E9E9");
        setLikeCount((prev) => (!newLikeState ? prev + 1 : prev - 1));
      });
  };

  // 이미지 전환
  const changeImage = (direction) => {
    if (direction === "left") {
      setImgCnt((prev) => (prev === 0 ? img.length - 1 : prev - 1));
    } else if (direction === "right") {
      setImgCnt((prev) => (prev === img.length - 1 ? 0 : prev + 1));
    }
  };

  useEffect(() => {
    // 게시물 데이터 가져오기
    const getPost = () => {
      axios
        .get(`${url}/post/${Param.id}`, { withCredentials: true })
        .then((res) => {
          setData(res.data);
          setLikeCount(res.data.likeNumber);
          setLikeBool(res.data.likeState);
          setLikeColor(res.data.likeState ? "#ff6969" : "#E9E9E9");
        });
    };

    // 이미지 데이터 가져오기
    const getImgs = () => {
      axios
        .get(`${url}/post/${Param.id}`, { withCredentials: true })
        .then((res) => {
          setImg(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 로그인된 유저 정보 확인
    const GetLoggedUserInfo = () => {
      axios
        .get(`${url}/auth/user`, { withCredentials: true })
        .then((res) => {
          setUser(res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 채팅방 데이터 가져오기
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

    GetLoggedUserInfo();
    GetChatRoom();
    getPost();
    getImgs();
    fetchLikeState(); // 좋아요 상태 가져오기
  }, [Param.id]);

  // 채팅방 생성 및 참여
  const HandleChatRoom = () => {
    if (Param.id == chatRoom.id) {
      axios
        .post(`${url}/chat/room/join/${chatRoom.id}`, { withCredentials: true })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      navigate("/chating");
    } else {
      axios
        .post(`${url}/chat/room`, { withCredentials: true })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      navigate("/chating");
    }
  };

  // 끌어올리기
  const PullPost = () => {
    axios
      .post(
        `${url}/post/${Param.id}/update`,
        {
          postId: Param.id,
        },
        {
          headers: {
            withCredentials: true,
          },
        }
      )
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
      .delete(`${url}/post/${Param.id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* 페이지 렌더링 */}
      <Header />
      <div>
        <Heart
          fill={likeColor}
          onClick={ToggleLike}
          style={{ cursor: "pointer" }}
        />
        <span>{likeCount}</span>
      </div>
    </div>
  );
}
