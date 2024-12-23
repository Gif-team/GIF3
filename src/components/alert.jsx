export function Alert() {
  return (
    <div className="items-center gap-3 flex py-5 px-4 bg-gray-alertgray w-[100%] h-[100%]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="5 0"
        viewBox="0 0 60 60"
        fill="none"
      >
        <g clip-path="url(#clip0_23_1134)">
          <rect width="60" height="60" rx="30" fill="#CBCCCE" />
          <path
            d="M30.05 37.5C36.611 37.5 41.925 32.1859 41.925 25.625C41.925 19.0641 36.611 13.75 30.05 13.75C23.4891 13.75 18.175 19.0641 18.175 25.625C18.175 32.1859 23.4891 37.5 30.05 37.5ZM30.05 43.4375C22.1235 43.4375 6.30005 47.4156 6.30005 55.3125V58.2812C6.30005 59.9141 7.63599 61.25 9.2688 61.25H50.8313C52.4641 61.25 53.8 59.9141 53.8 58.2812V55.3125C53.8 47.4156 37.9766 43.4375 30.05 43.4375Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_23_1134">
            <rect width="60" height="60" rx="30" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div>
        <span className="font-bold">모태환</span>
        <span>님이 회원님의 게시물에 하트를 눌렀습니다.</span>
      </div>
    </div>
  );
}
