import React, { useState } from "react";
import blueLogo from "../imgs/logo1.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const passwordregex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;
const url = "";

export function ChangePassword() {
  const navigate = useNavigate();
  const [checkPassword, setCheckPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const isFormValid = !passwordCheckError && !passwordError;

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(!value.match(passwordregex));
  };

  const handleCheckPasswordChange = (e) => {
    const value = e.target.value;
    setCheckPassword(value);
    setPasswordError(password == checkPassword);
  };

  function send() {
    axios.post(url, {
      password: password,
      checkPassword: checkPassword,
    });
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center mt-[140px] justify-between gap-8 p-8 border rounded-lg border-gray-login">
        <img src={blueLogo} className="w-[90px]" alt="로고" />
        <div className="flex flex-col justify-between gap-3">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className={`${
                password ? "text-primary-errorcolor " : "text-black"
              } text-[14px] font-medium`}
            >
              새 비밀번호
            </label>
            <input
              id="email"
              placeholder="영문, 숫자, 특수문자 2개 이상 포함 8글자 이상"
              type="text"
              value={password}
              onChange={handlePasswordChange}
              className={`focus:outline-none text-[14px] p-3 w-[360px] h-[40px] border  ${
                passwordError
                  ? "border-primary-errorcolor rounded-lg"
                  : "border-gray-login rounded-lg"
              }`}
            />
            {passwordError ? (
              <div className="text-primary-errorcolor min-h-5 font-semibold text-[12px]">
                올바른 이메일 주소를 입력하세요
              </div>
            ) : (
              <div className="min-h-5"></div>
            )}
          </div>
          <div className="flex flex-col ">
            <label
              className={` text-[14px] font-medium ${
                passwordCheckError ? "text-primary-errorcolor " : "text-black"
              }`}
              htmlFor="password"
            >
              새 비밀번호 재입력
            </label>
            <input
              id="password"
              placeholder="새 비밀번호를 재입력해주세요..."
              type="password"
              value={checkPassword}
              onChange={handleCheckPasswordChange}
              className={`focus:outline-none text-[14px] p-3 w-[360px] h-[40px] border  ${
                passwordCheckError
                  ? "border-primary-errorcolor rounded-lg"
                  : "border-gray-login rounded-lg"
              }`}
            />
            {passwordCheckError ? (
              <div className="min-h-5 text-primary-errorcolor font-semibold text-[12px]">
                올바른 비밀번호를 입력하세요
              </div>
            ) : (
              <div className="min-h-5"></div>
            )}
          </div>
        </div>
        <button
          className={`text-white mt-4 px-36 py-2 rounded-lg font-semibold ${
            isFormValid && password !== "" && checkPassword !== ""
              ? "bg-primary-primary"
              : "bg-primary-second"
          }`}
          disabled={!isFormValid}
          onClick={send}
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  );
}
