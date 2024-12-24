import React, { useContext, useEffect, useState } from "react";
import { Header } from "../components/header";
import { AlertContext } from "../context/alertContext";
import { AlertPopUp } from "../components/alertPopUp";
import BadgeIcon from "../components/hidden";
import axios from "axios";
import { url } from "./config";
import Likes from "../imgs/likes.png";
import Lost from "../imgs/lost.png";
import Find from "../imgs/find.png";

export function Badge() {
  const { alertPopUp } = useContext(AlertContext);
  const [badge, setBadge] = useState(true);

  useEffect(() => {
    axios
      .get(`${url}/badge`, {
        withCredentials: true,
      })
      .then((res) => {
        setBadge(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="flex justify-center">
      <Header />
      {alertPopUp ? <AlertPopUp /> : null}
      <div className="flex justify-center flex-col w-[40%] m-20">
        <h1 className="text-[36px] font-semibold mb-4">뱃지</h1>
        <div className="flex gap-20">
          <div className="flex flex-col items-center gap-1">
            {badge.badge1 ? (
              <img className="w-[140px] h-[150px]" src={Find} />
            ) : (
              <BadgeIcon />
            )}
            <span
              className={`text-[20px] ${
                !badge ? "mt-8" : "mt-8"
              } font-semibold`}
            >
              탐색왕
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            {badge.badge2 ? (
              <img className="w-[165px] h-[160px]" src={Lost} />
            ) : (
              <BadgeIcon />
            )}
            <span
              className={`text-[20px] ${
                badge ? "mt-[34px]" : "mt-8"
              } font-semibold`}
            >
              깜빡이
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            {badge.badge3 ? (
              <img className="w-[180px] h-[180px]" src={Likes} />
            ) : (
              <BadgeIcon />
            )}
            <span
              className={`text-[20px] ${
                badge.badge3 ? null : "mt-8"
              } font-semibold`}
            >
              인기왕
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
