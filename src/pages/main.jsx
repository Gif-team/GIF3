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

export function Main({ search }) {
  const { alertPopUp, setAlertPopUp } = useContext(AlertContext);
  const [filter, setFilter] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    axios
      .get(`${url}/post`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col items-center w-full ">
      {filter ? <FilterPopup setFilter={setFilter} /> : null}
      <Header />
      {alertPopUp ? <AlertPopUp /> : null}
      <div className="w-[60%] flex flex-col">
        <h1 className="m-5 mt-20 text-2xl font-bold">최신 게시물</h1>
        <div className="flex flex-wrap">
          {/* {posts.map((v) => (
            <Post key={v.id} post={v.posts} filter={filter} search={search} />
          ))} */}
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
