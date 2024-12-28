import { useContext, useEffect, useState } from "react";
import { Header } from "../components/header";
import { AlertContext } from "../context/alertContext";
import { AlertPopUp } from "../components/alertPopUp";
import Post from "../components/post";
import ProfileImg from "../imgs/profile.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "./config";

//CHECKLIST
/**
 *[ ] post 받아오는 기능 구현
 *[ ]
 *[ ]
 */

export function Profile() {
  const { alertPopUp, setAlertPopUp } = useContext(AlertContext);
  const navigation = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setAlertPopUp(alertPopUp);
  }, [alertPopUp]);

  useEffect(() => {
    axios
      .get(`${url}/auth/user`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // post 정보 받아오기
  useEffect(() => {
    // axios.get(`${url}/post/my`, { withCredentials: true }).then((res) => {
    //   console.log(res.data);
    // });
  }, []);

  const MemberShipCancel = () => {
    axios
      .delete(`${url}/auth/user/delete`)
      .then((res) => {
        console.log(res.data);
        navigation("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Logout = () => {
    axios
      .post(`${url}/auth/logout`)
      .then((res) => {
        console.log(res.data);
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
        <div className="flex items-center pt-8">
          {/* profile 이미지 */}
          <img src={ProfileImg} alt="profile" width={128} height={128} />
          <div className="ml-6 ">
            <h1 className="text-3xl font-bold">
              {userInfo.username || "Loading name..."}
            </h1>
            <p className="text-sm font-bold text-gray-500">
              {userInfo.email || "Loading email..."}
            </p>
          </div>
          {/* 프로필 네비 */}
          <ul className="flex flex-col items-center justify-center border border-gray-[#EFF0F2] ml-auto rounded-xl p-6 text-center">
            <li className="text-base font-bold">프로필</li>
            <div className="bg-[#EFF0F2] w-full h-[1px] my-3"></div>
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
              <li className="cursor-pointer" onClick={MemberShipCancel}>
                회원탈퇴
              </li>
            </div>
          </ul>
        </div>
        <div>
          <h3 className=" text-[24px] font-medium my-3">내가 작성한 글</h3>
          <div className="flex flex-wrap ">
            {/* 내가 작성한 글 */}
            {/* {posts.map((post) => {
              <Post key={post.id} />;
            })} */}
          </div>
        </div>
      </main>
    </div>
  );
}
