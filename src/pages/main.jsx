import { useContext, useEffect } from "react";
import { useState } from "react";
import { Header } from "../components/header";
import { Post } from "../components/post";
import { AlertContext } from "../context/alertContext";
import { AlertPopUp } from "../components/alertPopUp";
import { url } from "./config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FilterPopup } from "../components/filterPopup";

const filter = localStorage.getItem("filter");

export function Main({ search }) {
  const { alertPopUp, setAlertPopUp } = useContext(AlertContext);
  const [open, setOpen] = useState(alertPopUp);
  const [filter, setFilter] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    setOpen(alertPopUp);
  }, [alertPopUp]);
  useEffect(() => {
    axios
      .get(`${url}/post`, {
        withCredentials: true,
      })
      .then((res) => {
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
      {open ? <AlertPopUp /> : null}
      <div className="w-[60%] flex flex-col">
        <h1 className="m-5 mt-20 text-2xl font-bold">최신 게시물</h1>
        <div className="flex flex-wrap">
          {posts.map((v) => (
            <Post key={v.id} post={v.posts} filter={filter} search={search} />
          ))}
        </div>
      </div>
      <div className="fixed flex flex-col gap-4 bottom-6 right-16">
        <svg
          onClick={() => navigator("/chating")}
          className="cursor-pointer"
          width="70"
          height="70"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="80" height="80" rx="40" fill="#5956E8" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M32.004 25.106C37.3968 24.6998 42.8135 24.7266 48.202 25.186L51.45 25.462C52.6416 25.5639 53.7643 26.0634 54.6377 26.8803C55.5112 27.6972 56.0846 28.784 56.266 29.966L56.47 31.304C57.164 35.8398 57.0991 40.4595 56.278 44.974C56.0824 46.0539 55.5136 47.0306 54.671 47.7336C53.8283 48.4367 52.7654 48.8212 51.668 48.82H33.716C33.302 48.82 32.896 48.922 32.532 49.118L24.71 53.322C24.4814 53.4448 24.2249 53.5063 23.9655 53.5003C23.7061 53.4943 23.4527 53.4212 23.23 53.288C23.0073 53.1548 22.823 52.9661 22.695 52.7403C22.5671 52.5146 22.4999 52.2595 22.5 52V34.966C22.5005 32.4798 23.4403 30.0855 25.131 28.2627C26.8218 26.4399 29.1388 25.3231 31.618 25.136L32.004 25.106ZM32 35C31.337 35 30.7011 35.2634 30.2322 35.7323C29.7634 36.2011 29.5 36.837 29.5 37.5C29.5 38.1631 29.7634 38.799 30.2322 39.2678C30.7011 39.7366 31.337 40 32 40C32.663 40 33.2989 39.7366 33.7678 39.2678C34.2366 38.799 34.5 38.1631 34.5 37.5C34.5 36.837 34.2366 36.2011 33.7678 35.7323C33.2989 35.2634 32.663 35 32 35ZM40 35C39.337 35 38.7011 35.2634 38.2322 35.7323C37.7634 36.2011 37.5 36.837 37.5 37.5C37.5 38.1631 37.7634 38.799 38.2322 39.2678C38.7011 39.7366 39.337 40 40 40C40.663 40 41.2989 39.7366 41.7678 39.2678C42.2366 38.799 42.5 38.1631 42.5 37.5C42.5 36.837 42.2366 36.2011 41.7678 35.7323C41.2989 35.2634 40.663 35 40 35ZM45.5 37.5C45.5 36.837 45.7634 36.2011 46.2322 35.7323C46.7011 35.2634 47.337 35 48 35C48.663 35 49.2989 35.2634 49.7678 35.7323C50.2366 36.2011 50.5 36.837 50.5 37.5C50.5 38.1631 50.2366 38.799 49.7678 39.2678C49.2989 39.7366 48.663 40 48 40C47.337 40 46.7011 39.7366 46.2322 39.2678C45.7634 38.799 45.5 38.1631 45.5 37.5Z"
            fill="white"
          />
        </svg>
        <svg
          onClick={() => navigator("/write")}
          className="cursor-pointer"
          width="70"
          height="70"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="80" height="80" rx="40" fill="#5956E8" />
          <g clip-path="url(#clip0_83_1298)">
            <path
              d="M56 40H24"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
            />
            <path
              d="M40 24V56"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_83_1298">
              <rect
                width="48"
                height="48"
                fill="white"
                transform="translate(16 16)"
              />
            </clipPath>
          </defs>
        </svg>
        <svg
          onClick={() => setFilter(true)}
          className="cursor-pointer"
          width="70"
          height="70"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="80" height="80" rx="40" fill="#5956E8" />
          <path
            d="M46.0003 55.76C46.0803 56.36 45.8803 57 45.4203 57.42C45.2352 57.6054 45.0155 57.7525 44.7735 57.8529C44.5316 57.9532 44.2722 58.0049 44.0103 58.0049C43.7483 58.0049 43.489 57.9532 43.247 57.8529C43.0051 57.7525 42.7853 57.6054 42.6003 57.42L34.5803 49.4C34.3623 49.1867 34.1965 48.9259 34.0959 48.6379C33.9953 48.35 33.9625 48.0427 34.0003 47.74V37.5L24.4203 25.24C24.0955 24.8231 23.9489 24.2945 24.0126 23.7699C24.0763 23.2452 24.3451 22.7671 24.7603 22.44C25.1403 22.16 25.5603 22 26.0003 22H54.0003C54.4403 22 54.8603 22.16 55.2403 22.44C55.6554 22.7671 55.9242 23.2452 55.9879 23.7699C56.0516 24.2945 55.905 24.8231 55.5803 25.24L46.0003 37.5V55.76ZM30.0803 26L38.0003 36.12V47.16L42.0003 51.16V36.1L49.9203 26H30.0803Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}
