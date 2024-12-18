import React, { useContext } from "react";
import { AlertContext } from "../context/alertContext";

export function AlertPopUp() {
  const { alertPopUp, setAlertPopUp } = useContext(AlertContext);
  return (
    <>
      <div className="fixed top-0 left-0 z-10 w-full h-full bg-black bg-opacity-30" />
      <div className=" fixed right-0 h-[100%] transform w-1/3 bg-white p-5 z-20">
        <div className="flex items-start justify-between">
          <h5 className="text-lg font-semibold">알람</h5>
          <svg
            onClick={() => setAlertPopUp(!alertPopUp)}
            className="cursor-pointer"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="close">
              <path
                id="Path 2"
                d="M23.5425 23.5424L8.45758 8.45746"
                stroke="#7E8EF1"
                strokeLinecap="round"
              />
              <path
                id="Path 2_2"
                d="M23.5424 8.45746L8.45747 23.5424"
                stroke="#7E8EF1"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}
