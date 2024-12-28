import React, { useEffect, useState } from "react";
import blueLogo from "../imgs/logo1.svg";
import { useNavigate } from "react-router-dom";

function where(lo) {
  if (lo === 1) {
    return "기숙사";
  } else if (lo === 2) {
    return "본관";
  } else return "금봉관";
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

export function Post({ post, filter, search }) {
  const nav = useNavigate();
  const [hidden, setHidden] = useState(false);

  console.log(filter);
  console.log(search);

  useEffect(() => {
    if (!post.title.includes(search)) {
      setHidden(true);
    }
    if (post.category !== null && post.category !== filter) {
      setHidden(true);
    }
    if (post.building.id !== null && post.building.id !== filter) {
      setHidden(true);
    }
    if (post.building.floor !== null && post.building.floor !== filter) {
      setHidden(true);
    }
  }, [filter, search, post]);

  return (
    // <div
    //   onClick={() => nav(`/post/${post.id}`)}
    //   className={` w-[200px] m-3 h-[340px] rounded-lg border-gray-border border justify-between ${
    //     hidden ? "hidden" : null
    //   }`}
    // >
    //   <img className="w-full h-[200px]" src={blueLogo} alt="게시물 사진" />
    //   <div className="gap-3 flex flex-col justify-center m-[12px]">
    //     <h3 className="text-[21px] font-bold">{post.title}</h3>
    //     <div className=" opacity-[0.5] text-[13px]">
    //       {`${post.category ? "찾았습니다" : "잃어버렸습니다"} ∙ ${
    //         post.building.floor
    //       }층 ∙ ${where(post.building.id)} ∙ ${getDate(post.realtime)}`}
    //     </div>
    //     <span className="text-gray-fee">사례금:{post.price}원</span>
    //   </div>
    // </div>
    <div>{post.title} 제목</div>
  );
}
