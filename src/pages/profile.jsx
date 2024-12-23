import React from "react";
import { useContext, useEffect, useState } from "react";
import { Header } from "../components/header";
import { AlertContext } from "../context/alertContext";
import { AlertPopUp } from "../components/alertPopUp";
import { Post } from "../components/post";
import ProfileImg from "../imgs/profile.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const { alertPopUp, setAlertPopUp } = useContext(AlertContext);
  const [open, setOpen] = useState(alertPopUp);
  const navigation = useNavigate();

  useEffect(() => {
    setOpen(alertPopUp);
  }, [alertPopUp]);

  const MemberShipCancel = () => {
    const url = "/api/auth/user/delete";
    axios
      .delete(url)
      .then((res) => {
        console.log(res);
        navigation("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Logout = () => {
    const url = "/api/auth/logout";
    axios
      .post(url)
      .then((res) => {
        console.log(res);
        navigation("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center w-full ">
      <Header />
      {alertPopUp && <AlertPopUp />}
      <main className="mt-[60px] w-[674px]">
        <div className="flex items-center pt-[10px]">
          {/* profile svg */}
          <img src={ProfileImg} alt="profile" width={128} height={128} />
          <h1 className="ml-6 text-3xl font-bold">김지훈</h1>
          <ul className="flex flex-col items-center justify-center  bg-[#EFF0F2] ml-auto rounded-xl p-[24px] text-center">
            <li className="font-bold">프로필</li>
            <div className="bg-[#4f5665] w-full h-[1px] my-3"></div>
            <div className="flex flex-col w-full gap-4 itms-center">
              <li
                className="cursor-pointer "
                onClick={() => navigation("/badge")}
              >
                뱃지 보기
              </li>
              <li className="cursor-pointer" onClick={Logout}>
                로그아웃
              </li>
              <li
                className="text-red-500 cursor-pointer"
                onClick={MemberShipCancel}
              >
                회원탈퇴
              </li>
            </div>
          </ul>
        </div>
        <div>
          <h3 className=" text-[24px] font-medium mb-3">내가 작성한 글</h3>
          <div className="flex flex-wrap ">
            {/* map 사용 예정 */}
            {/* <Post />
            <Post />
            <Post /> */}
          </div>
        </div>
      </main>
    </div>
  );
}
