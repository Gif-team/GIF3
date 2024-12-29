import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

export function Post({ post, filter, search = {} }) {
  const nav = useNavigate();
  const [hidden, setHidden] = useState(false);
  const [imgs, setImgs] = useState("");

  useEffect(() => {
    // 초기값으로 숨김 해제
    setHidden(false);

    // 검색 조건 확인
    if (search && !post.title.includes(search)) {
      setHidden(true);
      return;
    }

    // 필터 조건 확인
    if (
      (filter.category !== 0 && post.category !== filter.category) || // 카테고리 필터
      (filter.building_Id !== 0 && post.building.id !== filter.building_Id) || // 건물 ID 필터
      (filter.floor !== 0 && post.building.floor !== filter.floor) // 층수 필터
    ) {
      setHidden(true);
      return;
    }
  }, [filter, search, post]);

  useEffect(() => {
    const getImgs = () => {
      axios
        .get(`/api/image/${post.id}`, { withCredentials: true })
        .then((res) => {
          setImgs(res.data.result);
        })
        .catch((error) => console.error(error));
    };
    getImgs();
  }, [post]);

  return (
    <div
      onClick={() => nav(`/post/${post.id}`)}
      className={` w-[200px] m-3 h-[340px] cursor-pointer rounded-lg border-gray-border border justify-between ${
        hidden ? "hidden" : null
      }`}
    >
      {/* {imgs.map((img) => (
        <img src={img} alt="게시물 사진" />
      ))} */}
      <div className="gap-3 flex flex-col justify-center m-[12px]">
        <h3 className="text-[21px] font-bold">{post.title}</h3>
        <div className=" opacity-[0.5] text-[13px]">
          {`${post.category ? "찾았습니다" : "잃어버렸습니다"} ∙ ${
            post.building.floor
          }층 ∙ ${where(post.building.id)} ∙ ${getDate(post.realtime)}`}
        </div>
        <span className="text-gray-fee">사례금:{post.price}원</span>
      </div>
    </div>
  );
}
