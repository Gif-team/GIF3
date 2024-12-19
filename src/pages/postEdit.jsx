import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";

import { AlertContext } from "../context/alertContext";
import { Header } from "../components/header";
import { AlertPopUp } from "../components/alertPopUp";
import { ImageCard } from "../components/imageCard";
import SelectSmall from "../components/dropButton";

import Camera from "../imgs/camera.svg";
import Floor from "../imgs/floor.svg";
import Gwan from "../imgs/gwan.svg";
import LostItem from "../imgs/lostItem.svg";
import TrashCan from "../imgs/trashcan.svg";

export default function PostEdit({ postId }) {
  const { alertPopUp, setAlertPopUp } = useContext(AlertContext);
  const [open, setOpen] = useState(alertPopUp);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLostItem, setSelectedLostItem] = useState("");
  const [selectedGwan, setSelectedGwan] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [imgFiles, setImgFiles] = useState([]);
  const imgRef = useRef();

  const lostItems = ["찾았습니다", "잃어버렸습니다"];
  const gwans = ["본관", "금봉관", "기숙사"];
  const floors = ["1층", "2층", "3층", "4층", "5층"];

  // 알림 팝업
  useEffect(() => {
    setOpen(alertPopUp);
  }, [alertPopUp]);

  // 이미지 배열에 추가 (업로드는 제출 시 진행)
  const addImage = async () => {
    const file = imgRef.current.files[0];
    if (file && imgFiles.length < 10) {
      setImgFiles((prevFiles) => [...prevFiles, file]);
    }
  };

  // 이미지 배열에서 제거
  const deleteImage = (index) => {
    setImgFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // 이미지를 서버에서 가져옴
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data: fileNames } = await axios.get(`/api/images/${postId}`);

        const imageUrls = await Promise.all(
          fileNames.map(async (fileName) => {
            const {
              data: { url },
            } = await axios.get(`/api/image-url/${fileName}`);
            return url;
          })
        );

        setImgFiles(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [postId]);

  // 유효성 검사
  const isFormValid =
    title.trim() !== "" &&
    amount.trim() !== "" &&
    description.trim() !== "" &&
    selectedLostItem.trim() !== "" &&
    selectedGwan.trim() !== "" &&
    selectedFloor.trim() !== "" &&
    imgFiles.length > 0;

  // 수정된 게시물 제출
  const updatePost = async () => {
    try {
      const data = {
        title,
        price: Number(amount),
        content: description,
        category: Boolean(!lostItems.indexOf(selectedLostItem)),
        building: {
          id: gwans.indexOf(selectedGwan) + 1,
          floor:
            selectedGwan === "기숙사"
              ? floors.indexOf(selectedFloor) + 1
              : floors.indexOf(selectedFloor.slice(0, 4)) + 1,
        },
        images: [],
      };

      // 이미지 업로드
      for (let file of imgFiles) {
        const { data: presignedUrl } = await axios.post(
          `/api/s3/presigned-url`,
          {
            fileName: file.name,
            fileType: file.type,
          }
        );

        await axios.put(presignedUrl, file, {
          headers: { "Content-Type": file.type },
        });

        const {
          data: { url },
        } = await axios.get(`/api/image-url/${file.name}`);
        data.images.push(url);
      }

      await axios.put(`/api/post/update/${postId}`, data);
      console.log("Post updated successfully.");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Header />
      {alertPopUp && <AlertPopUp />}
      <div className="flex flex-col mt-[60px] w-[600px] p-[36px]">
        {/*이미지*/}
        <div className="flex space-x-2 overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar">
          <div
            className="flex items-center justify-center 
            border border-gray-400 rounded-lg select-none
            w-[150px] h-[150px] flex-shrink-0"
          >
            <input
              type="file"
              id="imgUpload"
              className="hidden"
              ref={imgRef}
              onChange={addImage}
            />
            <label
              htmlFor="imgUpload"
              className="flex items-center justify-center w-full h-full cursor-pointer"
            >
              <img src={Camera} alt="camera" />
            </label>
          </div>

          {imgFiles.map((imgFile, index) => (
            <div key={index} className="relative">
              <ImageCard url={URL.createObjectURL(imgFile)} />
              <button
                className="absolute p-1 bg-[rgba(255,255,255,0.8)] rounded-full top-2 right-1"
                onClick={() => deleteImage(index)}
              >
                <img src={TrashCan} alt="trash" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-400 w-full h-[1px] my-5"></div>

        {/*게시물*/}
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
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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

        {/*드롭다운*/}
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

        {/* 제출 */}
        <button
          className={`px-[36px] py-[12px] bg-primary-primary rounded-[40px] text-[white] ml-auto ${
            isFormValid ? "bg-opacity-100" : "bg-opacity-50"
          }`}
          disabled={!isFormValid}
          onClick={updatePost}
        >
          수정
        </button>
      </div>
    </div>
  );
}
