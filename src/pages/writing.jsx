import React, { useContext, useEffect, useState, useRef } from "react";

import { Header } from "../components/header";
import { AlertContext } from "../context/alertContext";
import { AlertPopUp } from "../components/alertPopUp";
import SelectSmall from "../components/dropButton";
import { ImageCard } from "../components/imageCard";
import axios from "axios";

import Camera from "../imgs/camera.svg";
import Floor from "../imgs/floor.svg";
import Gwan from "../imgs/gwan.svg";
import LostItem from "../imgs/lostItem.svg";
import TrashCan from "../imgs/trashcan.svg";

export function Writing() {
  const { alertPopUp, setAlertPopUp } = useContext(AlertContext);
  const [open, setOpen] = useState(alertPopUp);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [commaAmount, setCommaAmount] = useState("");
  const [description, setDescription] = useState("");

  const [imgFiles, setImgFiles] = useState([]); // 이미지 파일들을 저장할 배열
  const imgRef = useRef();

  const [selectedLostItem, setSelectedLostItem] = useState("");
  const [selectedGwan, setSelectedGwan] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");

  const lostItems = ["찾았습니다", "잃어버렸습니다"];
  const gwans = ["본관", "금봉관", "기숙사"];
  const floors = ["1층", "2층", "3층", "4층", "5층"];

  const setCommaMoney = (value) => {
    let removeComma = value.replace(/[^0-9.]/g, "").replaceAll(",", "");
    if (removeComma <= 1000000) {
      setCommaAmount(removeComma && parseInt(removeComma).toLocaleString());
      setAmount(removeComma);
    }
  };

  const isFormValid =
    title.trim() !== "" &&
    amount.trim() !== "" &&
    description.trim() !== "" &&
    selectedLostItem.trim() !== "" &&
    selectedGwan.trim() !== "" &&
    selectedFloor.trim() !== "" &&
    imgFiles.length > 0;

  useEffect(() => {
    setOpen(alertPopUp);
  }, [alertPopUp]);

  const postWrite = () => {
    const url = "/api/post/create";

    const data = {
      title: title,
      price: Number(amount),
      content: description,
      category: Boolean(!lostItems.indexOf(selectedLostItem)),
      building: {
        id: Number(gwans.indexOf(selectedGwan) + 1),
        floor: Number(
          selectedGwan === "기숙사"
            ? floors.indexOf(selectedFloor) + 1
            : floors.indexOf(selectedFloor.slice(0, 4)) + 1
        ),
      },
      images: imgFiles.map((file, index) => ({
        imageId: index,
        imageUrl: file,
      })),
    };

    // console.log(data);

    axios
      .post(url, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 이미지 추가 핸들러
  const handleImage = () => {
    const file = imgRef.current.files[0];
    if (file && imgFiles.length < 10) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setImgFiles((prevFiles) => [...prevFiles, reader.result]); // 이미지 추가
      };
    }
  };

  // 이미지 삭제 핸들러
  const handleDeleteImage = (index) => {
    setImgFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center w-full ">
      <Header />
      {alertPopUp && <AlertPopUp />}
      <div className="flex flex-col mt-[60px] w-[600px] p-[36px]">
        {/* 이미지 */}
        <div className="flex space-x-2 overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar">
          <div
            className="flex items-center justify-center 
            border border-gray-400 rounded-lg select-none
            w-[150px] h-[150px] flex-shrink-0"
          >
            {/* 카메라 이미지 추가 버튼 */}
            <input
              type="file"
              id="imgUpload"
              className="hidden"
              ref={imgRef}
              onChange={handleImage}
            />
            <label
              htmlFor="imgUpload"
              className="flex items-center justify-center w-full h-full cursor-pointer"
            >
              <img src={Camera} alt="camera" />
            </label>
          </div>

          {/* 추가한 이미지들 */}
          {imgFiles.map((imgFile, index) => (
            <div key={index} className="relative">
              <ImageCard url={imgFile} />
              {/* 삭제 버튼 */}
              <button
                className="absolute p-1 bg-[rgba(255,255,255,0.8)] rounded-full top-2 right-1"
                onClick={() => handleDeleteImage(index)}
              >
                <img src={TrashCan} alt="trash" />
              </button>
            </div>
          ))}
        </div>

        {/* 내용 */}
        <div className="bg-gray-400 w-full h-[1px] my-5"></div>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="제목을 입력해주세요 (최대20글자)"
            maxLength="20"
            className="text-4xl font-semibold border-none outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="사례금을 입력하세요(최대 100만원)"
            className="border-none outline-none"
            value={commaAmount}
            onChange={(e) => setCommaMoney(e.target.value)}
          />

          <textarea
            className="border-none outline-none resize-none"
            placeholder="설명을 입력하세요(최대 200글자)"
            maxLength="200"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* 드롭다운 필터 */}
        <div className="flex items-center justify-center w-full mb-5">
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
            itemArray={selectedGwan === "기숙사" ? floors : floors.slice(0, 4)}
            onChange={setSelectedFloor}
            selected={selectedFloor}
          />
        </div>

        {/* 추가 버튼 */}
        <button
          className={`px-[36px] py-[12px] bg-primary-primary rounded-[40px] text-[white] ml-auto ${
            isFormValid ? "bg-opacity-100" : "bg-opacity-50"
          }`}
          disabled={!isFormValid}
          onClick={postWrite}
        >
          추가
        </button>
      </div>
    </div>
  );
}
