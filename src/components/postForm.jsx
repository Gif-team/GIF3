import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { AlertContext } from "../context/alertContext";
import { url } from "../pages/config";

import { Header } from "./header";
import { AlertPopUp } from "./alertPopUp";
import { ImageCard } from "./imageCard";
import SelectSmall from "./dropButton";

import Camera from "../imgs/camera.svg";
import Floor from "../imgs/floor.svg";
import Gwan from "../imgs/gwan.svg";
import LostItem from "../imgs/lostItem.svg";
import TrashCan from "../imgs/trashcan.svg";

export default function PostForm({ postData = {} }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(postData?.title || "");
  const [amount, setAmount] = useState(postData?.price || "");
  const [description, setDescription] = useState(postData?.content || "");

  const [selectedLostItem, setSelectedLostItem] = useState(
    postData?.category || ""
  );
  const [selectedGwan, setSelectedGwan] = useState(postData?.building.id || "");
  const [selectedFloor, setSelectedFloor] = useState(
    postData?.building.floor || ""
  );

  const [imgFiles, setImgFiles] = useState(postData?.imgs || []);
  const imgRef = useRef();

  const lostItems = ["찾았습니다", "잃어버렸습니다"];
  const gwans = ["본관", "금봉관", "기숙사"];
  const floors = ["1층", "2층", "3층", "4층", "5층"];

  const { alertPopUp, setAlertPopUp } = useContext(AlertContext);

  // 알림 팝업
  useEffect(() => {
    setAlertPopUp(alertPopUp);
  }, [alertPopUp]);

  // 이미지 배열에 추가
  const addImage = () => {
    const file = imgRef.current.files[0];
    if (file && imgFiles.length < 10) {
      setImgFiles((prevFiles) => [...prevFiles, file]);
    }
  };

  // 이미지 배열에서 삭제
  const deleteImage = (index) => {
    setImgFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // 게시물 제출
  const sendPost = async () => {
    try {
      const postResponse = await axios.post(
        `${url}/post/create`,
        {
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
        },
        { withCredentials: true }
      );

      // 서버로부터 받은 postId 저장 (이미지 업로드 시 사용)
      const postId = postResponse.data.result.id;

      // 이미지 업로드 기능
      for (let file of imgFiles) {
        // 1. 각 이미지마다 해당하는 파일명, 파일형을 보낸 후 url을 받아옴
        const presignedUrlRes = await axios.post(
          `${url}/s3/presigned-url`,
          {
            fileName: file.name,
            fileType: file.type,
          },
          { withCredentials: true }
        );

        const presignedUrl = presignedUrlRes.data.url;

        // 2. 받아온 url로 파일을 보냄
        await axios.post(presignedUrl, file, { withCredentials: true });

        // 3. 이미지 속성 db에 저장
        await axios.post(
          `${url}/image/save-image`,
          { postId: postId, fileName: file.name },
          { withCredentials: true }
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 유효성 검사
  const isFormValid =
    title.trim() !== "" &&
    amount.trim() !== "" &&
    description.trim() !== "" &&
    selectedLostItem.trim() !== "" &&
    selectedGwan.trim() !== "" &&
    selectedFloor.trim() !== "" &&
    imgFiles.length > 0;

  return (
    <div className="flex flex-col items-center w-full h-max">
      <Header />
      {alertPopUp && <AlertPopUp />}
      <main className="flex flex-col w-[37.5rem] h-max p-[3.75rem] py-9 border-x-2 items-center mt-16">
        <div className="flex flex-col w-full gap-14">
          {/* 이미지 */}
          <div className="flex w-full gap-[10px] overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar">
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
          <input
            type="text"
            placeholder="제목을 입력해주세요 (최대20글자)"
            maxLength="20"
            className="text-[2rem] font-semibold border-none leading-10 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="relative flex items-center w-full text-2xl">
            <input
              type="text"
              placeholder="사례금을 입력하세요(최대 100만원)"
              className="relative w-full pr-8 border-none outline-none"
              value={amount}
              onChange={(e) => {
                let value = e.target.value;

                // 숫자가 아닌 값 제거
                value = value.replace(/[^0-9]/g, "");

                // 맨 앞의 0 제거
                value = value.replace(/^0+/, "");

                // 최대값 100만 원 제한
                const maxAmount = 1000000;
                if (parseInt(value) > maxAmount) {
                  value = maxAmount.toString();
                }

                setAmount(value); // 상태 업데이트
              }}
            />
            <span className="absolute text-gray-500 right-2">원</span>
          </div>

          <textarea
            className="text-xl border-none outline-none resize-none"
            placeholder="설명을 입력하세요(최대 200글자)"
            maxLength="200"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {/* 드롭다운 */}
          <div className="flex items-center justify-center w-full">
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
              itemArray={
                selectedGwan === "기숙사" ? floors : floors.slice(0, 4)
              }
              onChange={setSelectedFloor}
              selected={selectedFloor}
            />
          </div>
        </div>

        {/* 제출 */}
        <button
          className={`px-4 py-3 bg-primary-primary rounded-3xl text-[white] mt-32 ${
            isFormValid ? "bg-opacity-100" : "bg-opacity-50"
          }`}
          disabled={!isFormValid}
          onClick={() => {
            sendPost(); // 첫 번째 함수 실행
            navigate("/main"); // 두 번째 함수 실행
          }}
        >
          추가하기
        </button>
      </main>
    </div>
  );
}
