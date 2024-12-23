import React from "react";

import Profile from "../imgs/profile.svg";

const colors = {
  true: "bg-gray-700",
};

const chatings = {
  other:
    "max-w-[400px] p-[10px] ml-[15px] rounded-tr-[15px] rounded-b-[15px] bg-primary-primary text-white font-medium break-words",
  my: "max-w-[400px] p-[10px] mr-[15px] rounded-tl-[15px] rounded-b-[15px] bg-gray-700 text-black font-medium break-words",
};

// 선택된 채팅 목록
export function ChatingButton({ isSelected, userInfo }) {
  return (
    <div className={`flex items-center p-4 ${colors[isSelected] || "bg"}`}>
      {/* svg 크기 72px*/}
      <img src={Profile} width="72" height="72" alt="profile" />
      <section className="pl-[15px]">
        <h3 className="text-xl font-semibold">{/*이름추가*/}김지훈</h3>
        <h4 className="text-xs font-medium text-[#555555]">
          {/*상태추가*/}교동 짬뽕 듣는중
        </h4>
      </section>
    </div>
  );
}

// 상대의 채팅
export function Chat({ whose, text }) {
  return (
    <>
      <div
        className={`flex ${
          whose == "other" ? "" : "flex-row-reverse"
        } items-start p-4`}
      >
        {/* svg 크기 32px*/}
        <img src={Profile} width="32" height="32" alt="profile" />
        <section className={`${chatings[whose]}`}>
          <p>
            {/*여기에 댓글 추가*/}
            {text}
          </p>
        </section>
      </div>
    </>
  );
}
