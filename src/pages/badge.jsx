import React, { useContext, useEffect, useState } from "react";
import { Header } from "../components/header";
import { AlertContext } from "../context/alertContext";
import { AlertPopUp } from "../components/alertPopUp";
import axios from "axios";
import { url } from "./config";
import Likes from "../imgs/Badge1.svg";
import Lost from "../imgs/Badge2.svg";
import Find from "../imgs/Badge3.svg";
import BadgeNone from "../imgs/BadgeNone.svg";

export function Badge() {
  const { alertPopUp } = useContext(AlertContext);
  const [badge, setBadge] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/badge`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setBadge(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex justify-center">
      <Header />
      {alertPopUp ? <AlertPopUp /> : null}
      <div className="flex justify-center flex-col w-[40%] m-20">
        <h1 className="text-[36px] font-semibold mb-4">뱃지</h1>
        <div className="flex flex-wrap justify-center w-full gap-20 ">
          <div className="flex-1 overflow-hidden">
            <img alt="탐색왕" src={badge.badge3 ? Find : BadgeNone} />
            <p className="text-[20px] font-semibold text-center">인기왕</p>
          </div>
          <div className="flex-1 overflow-hidden">
            <img alt="깜빡이" src={badge.badge2 ? Lost : BadgeNone} />
            <p className="text-[20px] font-semibold text-center">깜빡이</p>
          </div>
          <div className="flex-1 overflow-hidden">
            <img alt="인기왕" src={badge.badge1 ? Likes : BadgeNone} />
            <p className="text-[20px] font-semibold text-center">탐색왕</p>
          </div>
        </div>
      </div>
    </div>
  );
}
