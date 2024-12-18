import React, { useState } from "react";
import blueLogo from "../imgs/blueLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "./config";

const emailRegex = /^[a-zA-Z0-9._%+-]+@gsm\.hs\.kr$/i;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  function send() {
    axios
      .post(`${url}/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        navigate("/main");
      })
      .catch((err) => {
        setEmailError(true);
        setPasswordError(true);
        console.log(err);
      });
  }
  const isFormValid = !emailError && !passwordError;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!value.match(emailRegex));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(!value.match(passwordRegex));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center mt-[140px] justify-between gap-8 p-8 border rounded-lg border-gray-login">
        <img src={blueLogo} className="w-[90px]" alt="로고" />
        <div className="flex flex-col justify-between gap-3">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className={`${
                emailError ? "text-primary-errorcolor " : "text-black"
              } text-[14px] font-medium`}
            >
              이메일
            </label>
            <input
              id="email"
              placeholder="학교 이메일을 입력해주세요..."
              type="text"
              value={email}
              onChange={handleEmailChange}
              className={`focus:outline-none text-[14px] p-3 w-[360px] h-[40px] border  ${
                emailError
                  ? "border-primary-errorcolor rounded-lg"
                  : "border-gray-login rounded-lg"
              }`}
            />
            {emailError ? (
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
                passwordError ? "text-primary-errorcolor " : "text-black"
              }`}
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              id="password"
              placeholder="비밀번호를 입력해주세요..."
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={`focus:outline-none text-[14px] p-3 w-[360px] h-[40px] border  ${
                passwordError
                  ? "border-primary-errorcolor rounded-lg"
                  : "border-gray-login rounded-lg"
              }`}
            />
            {passwordError ? (
              <div className="min-h-5 text-primary-errorcolor font-semibold text-[12px]">
                올바른 비밀번호를 입력하세요
              </div>
            ) : (
              <span
                onClick={() => navigate("/changePassword")}
                className="ml-auto text-[12px] cursor-pointer text-primary-primary"
              >
                비밀번호 재설정
              </span>
            )}
          </div>
        </div>
        <div className="text-center">
          <button
            className={`text-white mt-4 px-36 py-2 rounded-lg font-semibold ${
              isFormValid && password !== "" && email !== ""
                ? "bg-primary-primary"
                : "bg-primary-second"
            }`}
            disabled={!isFormValid}
            onClick={send}
          >
            로그인
          </button>
          <div>
            <span className="text-gray-500">아직 회원이 아니신가요? </span>
            <span
              onClick={() => navigate("/signup")}
              className="cursor-pointer text-primary-primary"
            >
              회원가입
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
