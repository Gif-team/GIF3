//use client
import React, { useEffect, useState } from "react";
import SelectSmall from "../components/dropButton";
import Floor from "../imgs/floor.svg";
import Gwan from "../imgs/gwan.svg";
import LostItem from "../imgs/lostItem.svg";

/** 드롭다운 필터 */
export function FilterPopup({ setFilter }) {
  // filter 뒷 배경 움직임 막기
  useEffect(() => {
    const html = document.documentElement;
    if (setFilter) {
      html.style.overflowY = "hidden";
    } else {
      html.style.overflowY = "auto";
    }
    return () => {
      html.style.overflowY = "auto";
    };
  }, [setFilter]);

  const lostItems = ["찾았습니다", "잃어버렸습니다"];
  const gwans = ["본관", "금봉관", "기숙사"];
  const floors = ["1층", "2층", "3층", "4층", "5층"];

  const [selectedLostItem, setSelectedLostItem] = useState("");
  const [selectedGwan, setSelectedGwan] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");

  //저장된 필터 정보 가져와서 필터 초기화
  useEffect(() => {
    const storedFilter = localStorage.getItem("filter");
    if (storedFilter) {
      const { category, building_Id, floor } = JSON.parse(storedFilter);
      setSelectedLostItem(lostItems[category - 1]);
      setSelectedGwan(gwans[building_Id - 1]);
      setSelectedFloor(floors[floor - 1]);
    }
  }, [floors, gwans, lostItems]);

  // 필터 적용하기, 배열이름.indexOf(찾고싶은 값)
  const handleApply = () => {
    const filterInfo = {
      category: lostItems.indexOf(selectedLostItem) + 1,
      building_Id: gwans.indexOf(selectedGwan) + 1,
      floor:
        selectedGwan === "기숙사"
          ? floors.indexOf(selectedFloor) + 1
          : floors.indexOf(selectedFloor.slice(0, 4)) + 1, // 기숙사일 때만 5층 포함
    };

    localStorage.setItem("filter", JSON.stringify(filterInfo));
    setFilter(false);
  };

  return (
    <div className="fixed top-0 left-0 bg-[rgba(1,1,1,0.3)] w-full h-full z-10">
      <div className="relative z-20 top-[50%] left-[50%] bg-gray-700 w-[50%] h-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded-3xl p-4 max-w-2xl">
        <header className="flex items-start justify-between h-1/4">
          <div className="flex-1"></div>
          <h1 className="flex-1 text-2xl font-bold">필터</h1>
          <svg
            onClick={() => setFilter(false)}
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
        </header>
        <main className="flex items-start justify-center h-1/2">
          <SelectSmall
            svg={LostItem}
            title="분실물"
            itemArray={lostItems}
            onChange={setSelectedLostItem}
            selected={selectedLostItem}
          />
          <SelectSmall
            svg={Gwan}
            title="관"
            itemArray={gwans}
            onChange={setSelectedGwan}
            selected={selectedGwan}
          />
          <SelectSmall
            svg={Floor}
            title="층"
            itemArray={selectedGwan === "기숙사" ? floors : floors.slice(0, 4)} // 기숙사일 때만 5층 포함
            onChange={setSelectedFloor}
            selected={selectedFloor}
          />
        </main>
        <footer className="flex items-end justify-end h-1/4">
          <button
            className="p-2 text-white bg-primary-primary rounded-3xl"
            onClick={handleApply}
          >
            적용하기
          </button>
        </footer>
      </div>
    </div>
  );
}
