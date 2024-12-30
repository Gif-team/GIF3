import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AlertContext } from "../context/alertContext";
import { Header } from "../components/header";
import { Post } from "../components/post";
import { AlertPopUp } from "../components/alertPopUp";
import { FilterPopup } from "../components/filterPopup";

import { url } from "./config";
import axios from "axios";
import FilterBtn from "../imgs/filterBtn.svg";
import WriteBtn from "../imgs/writeBtn.svg";
import ChatBtn from "../imgs/chatBtn.svg";

const example = [
  // {
  //   id: 1,
  //   title: "에어팟 찾기",
  //   content: "에어팟을 잃어버렸어요",
  //   category: false,
  //   price: 10000,
  //   realtime: "2024-12-30T10:45:21.000",
  //   writer: "배경진",
  //   writerId: 1,
  //   building: {
  //     id: 1,
  //     floor: 3,
  //   },
  // },
  {
    id: 1,
    title: "우유찾기",
    content: "내 우유 누가 먹음?",
    category: false,
    price: 10000,
    realtime: "2024-12-29T20:21:01.000",
    writer: "배경진",
    writerId: 1,
    building: {
      id: 2,
      floor: 5,
    },
  },
];

export function Main({ search }) {
  const { alertPopUp, setAlertPopUp } = useContext(AlertContext);
  const [filter, setFilter] = useState(false);
  const [filterInfo, setFilterInfo] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();

  useEffect(() => {
    axios
      .get(`${url}/post`, { withCredentials: true })
      .then((res) => {
        setPosts(Object.values(res.data.posts));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const storedFilter = localStorage.getItem("filter");
    if (storedFilter) {
      setFilterInfo(JSON.parse(storedFilter));
    }
  }, []);

  return (
    <div className="flex flex-col items-center w-full ">
      {filter ? <FilterPopup setFilter={setFilter} /> : null}
      <Header />
      {alertPopUp ? <AlertPopUp /> : null}
      <div className="w-[60%] flex flex-col">
        <h1 className="m-5 mt-20 text-2xl font-bold">최신 게시물</h1>
        <div className="flex flex-wrap">
          {loading ? (
            <div>로딩 중...</div>
          ) : example.length > 0 ? (
            example.map((post) => (
              <Post
                key={post.id}
                post={post}
                filter={filterInfo}
                search={search}
              />
            ))
          ) : (
            <div>게시물이 없습니다.</div>
          )}
        </div>
      </div>
      <div className="fixed flex flex-col gap-4 bottom-6 right-16">
        {/* chatBtn */}
        <img
          src={ChatBtn}
          alt="btn"
          onClick={() => navigator("/chating")}
          className="cursor-pointer"
        />

        {/* writeBtn */}
        <img
          src={WriteBtn}
          alt="btn"
          onClick={() => navigator("/write")}
          className="cursor-pointer"
        />

        {/* filterBtn */}
        <img
          src={FilterBtn}
          alt="btn"
          onClick={() => setFilter(true)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
