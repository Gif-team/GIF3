import React, { useState } from "react";
import blueLogo from "../imgs/logo1.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "./config";

const emailRegex = /^[a-zA-Z0-9._%+-]+@gsm\.hs\.kr$/i;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;

export function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);

  const isFormValid = !emailError && !passwordError && !passwordCheckError;

  function send() {
    axios
      .post(`${url}/auth/signup`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
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

  const handlePasswordCheckChange = (e) => {
    const value = e.target.value;
    setPasswordCheck(value);
    setPasswordCheckError(value !== password);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center mt-[110px] justify-between gap-8 p-8 border rounded-lg border-gray-login">
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
              placeholder="영문, 숫자, 특수문자 포함 8글자 이상"
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
                영문, 숫자, 특수문자를 포함하여 8글자 이상으로 적어주세요
              </div>
            ) : (
              <div className="min-h-5"></div>
            )}
          </div>

          <div className="flex flex-col">
            <label
              className={`text-[14px] font-medium" ${
                passwordCheckError ? "text-primary-errorcolor " : "text-black"
              }`}
              htmlFor="passwordChec"
            >
              비밀번호 확인
            </label>
            <input
              id="passwordCheck"
              type="password"
              placeholder="비밀번호를 재입력해주세요..."
              value={passwordCheck}
              onChange={handlePasswordCheckChange}
              className={`focus:outline-none text-[14px] p-3 w-[360px] h-[40px] border  ${
                passwordCheckError
                  ? "border-primary-errorcolor rounded-lg"
                  : "border-gray-login rounded-lg"
              }`}
            />
            {passwordCheckError ? (
              <div className="min-h-5 text-primary-errorcolor font-semibold text-[12px]">
                비밀번호가 일치하지 않아요
              </div>
            ) : (
              <div className="min-h-5"></div>
            )}
          </div>
        </div>
        <button
          className={`text-white mt-4 px-36 py-2 rounded-lg font-semibold ${
            isFormValid &&
            password !== "" &&
            passwordCheck !== "" &&
            email !== ""
              ? "bg-primary-primary"
              : "bg-primary-second"
          }`}
          disabled={!isFormValid}
          onClick={send}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
