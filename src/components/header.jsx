import blueLogo from "../imgs/logo1.svg";
import searchIcon from "../imgs/search.svg";
import { useContext, useState } from "react";
import { AlertContext } from "../context/alertContext";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { alertPopUp, setAlertPopUp } = useContext(AlertContext);
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  return (
    <header className="fixed z-20 flex items-center justify-between w-full h-16 p-3 px-6 bg-white border-b-2 border-primary-primary">
      <section className="flex items-center flex-1">
        <img
          onClick={() => nav("/main")}
          className="w-8 h-8 cursor-pointer"
          src={blueLogo}
          alt="logo"
        />
      </section>
      <section className="flex items-center justify-center flex-1">
        <div className="relative">
          <img
            alt="search"
            src={searchIcon}
            className="absolute transform -translate-y-1/2 top-5 left-2"
          />
          <input
            onSubmit={() => {
              nav("/main", { state: { search: search } });
            }}
            type="text"
            placeholder="찾고 싶은 물건을 입력해보세요!"
            className="focus:outline-primary-primary h-[40px] rounded-lg bg-primary-bg w-[600px] pl-10"
          />
        </div>
      </section>
      <section className="flex flex-row-reverse items-center flex-1">
        <div className="relative flex items-center gap-5">
          <svg
            className="cursor-pointer"
            onClick={() => setAlertPopUp(!alertPopUp)}
            width="28"
            height="28"
            viewBox="0 0 26 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 9.10144C21 6.9528 20.1571 4.89217 18.6569 3.37286C17.1566 1.85354 15.1217 1 13 1C10.8783 1 8.84344 1.85354 7.34315 3.37286C5.84286 4.89217 5 6.9528 5 9.10144C5 18.5531 1 21.2536 1 21.2536H25C25 21.2536 21 18.5531 21 9.10144Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.3067 26.6545C15.0723 27.0637 14.7358 27.4034 14.331 27.6396C13.9262 27.8757 13.4672 28 13 28C12.5329 28 12.0739 27.8757 11.6691 27.6396C11.2642 27.4034 10.9278 27.0637 10.6934 26.6545"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            onClick={() => nav("/profile")}
            className="cursor-pointer"
            width="28"
            height="28"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_12_699)">
              <rect width="36" height="36" rx="18" fill="#CBCCCE" />
              <path
                d="M18.15 22.5C22.0866 22.5 25.275 19.3116 25.275 15.375C25.275 11.4384 22.0866 8.25 18.15 8.25C14.2134 8.25 11.025 11.4384 11.025 15.375C11.025 19.3116 14.2134 22.5 18.15 22.5ZM18.15 26.0625C13.3941 26.0625 3.9 28.4494 3.9 33.1875V34.9688C3.9 35.9484 4.70156 36.75 5.68125 36.75H30.6188C31.5984 36.75 32.4 35.9484 32.4 34.9688V33.1875C32.4 28.4494 22.9059 26.0625 18.15 26.0625Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_12_699">
                <rect width="36" height="36" rx="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </section>
    </header>
  );
}
