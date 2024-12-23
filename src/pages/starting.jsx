import { useNavigate } from "react-router-dom";

export function Starting() {
  const navigate = useNavigate();
  return (
    <div className="overflow-y-hidden flex flex-col items-center justify-around m-[190px] gap-32">
      <svg
        width="320"
        height="180"
        viewBox="0 0 360 215"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_di_136_643)">
          <path
            d="M270.527 185.083C270.527 189.019 269.158 192.356 266.42 195.094C263.853 197.832 260.259 199.201 255.638 199.201C251.018 199.201 247.339 197.832 244.6 195.094C242.033 192.356 240.75 189.019 240.75 185.083V40.8191C240.75 32.0914 242.889 25.5029 247.167 21.0535C251.446 16.6041 258.205 14.3794 267.446 14.3794H337.268C341.033 14.3794 344.113 15.5773 346.509 17.9731C348.905 20.1978 350.103 23.2782 350.103 27.2142C350.103 31.1502 348.905 34.3162 346.509 36.712C344.113 38.9367 341.033 40.049 337.268 40.049H278.741C273.265 40.049 270.527 42.7871 270.527 48.2633V92.4151H329.824C333.589 92.4151 336.669 93.613 339.065 96.0089C341.461 98.2336 342.659 101.314 342.659 105.25C342.659 109.186 341.461 112.352 339.065 114.748C336.669 116.972 333.589 118.085 329.824 118.085H270.527V185.083Z"
            fill="#5956E8"
          />
        </g>
        <g filter="url(#filter1_di_136_643)">
          <path
            d="M203.529 78.5537C203.529 74.6177 204.727 71.2806 207.122 68.5425C209.518 65.8044 213.027 64.4354 217.647 64.4354C222.268 64.4354 225.776 65.8044 228.172 68.5425C230.567 71.2806 231.765 74.6177 231.765 78.5537V185.083C231.765 189.019 230.567 192.356 228.172 195.094C225.776 197.832 222.268 199.201 217.647 199.201C213.027 199.201 209.518 197.832 207.122 195.094C204.727 192.356 203.529 189.019 203.529 185.083V78.5537ZM198.908 25.4175C198.908 19.9413 200.791 15.4919 204.556 12.0693C208.32 8.47558 212.684 6.67871 217.647 6.67871C222.61 6.67871 226.974 8.47558 230.739 12.0693C234.503 15.4919 236.386 19.9413 236.386 25.4175C236.386 30.8937 234.503 35.3431 230.739 38.7658C226.974 42.1884 222.61 43.8997 217.647 43.8997C212.684 43.8997 208.32 42.1884 204.556 38.7658C200.791 35.3431 198.908 30.8937 198.908 25.4175Z"
            fill="#5956E8"
          />
        </g>
        <g filter="url(#filter2_di_136_643)">
          <path
            d="M187.594 96.5224C191.872 96.5224 195.124 97.6347 197.348 99.8594C199.744 101.913 200.942 104.737 200.942 108.33V112.181C200.942 124.331 198.632 135.883 194.011 146.835C189.562 157.616 183.23 167.114 175.016 175.328C166.801 183.371 156.876 189.789 145.239 194.58C133.773 199.372 121.109 201.768 107.248 201.768C93.0439 201.768 79.9524 199.201 67.9732 194.067C55.994 188.933 45.6406 182.002 36.9129 173.275C28.3564 164.547 21.6823 154.365 16.8906 142.728C12.099 131.091 9.70312 118.684 9.70312 105.507C9.70312 92.1585 12.099 79.666 16.8906 68.0291C21.6823 56.3922 28.442 46.2099 37.1696 37.4822C45.8973 28.7545 56.2507 21.9093 68.2299 16.9465C80.3802 11.8126 93.814 9.24561 108.531 9.24561C122.393 9.24561 134.629 11.3847 145.239 15.663C155.849 19.7701 164.491 24.5618 171.165 30.038C175.101 33.2895 177.24 36.7977 177.583 40.5626C177.925 44.1563 177.069 47.2367 175.016 49.8036C173.133 52.3706 170.481 54.0819 167.058 54.9376C163.807 55.6221 160.555 54.7664 157.304 52.3706C150.801 47.7501 143.699 43.7285 135.998 40.3059C128.468 36.7121 119.312 34.9152 108.531 34.9152C98.2634 34.9152 88.8512 36.7121 80.2946 40.3059C71.9092 43.8996 64.6362 48.8624 58.4754 55.1943C52.4859 61.355 47.7798 68.7992 44.3571 77.5268C41.1057 86.0834 39.4799 95.41 39.4799 105.507C39.4799 115.603 41.1057 124.93 44.3571 133.487C47.7798 142.043 52.4859 149.487 58.4754 155.819C64.465 162.151 71.567 167.114 79.7813 170.708C88.1667 174.301 97.3222 176.098 107.248 176.098C116.147 176.098 124.275 174.729 131.634 171.991C138.993 169.253 145.41 165.488 150.886 160.697C156.362 155.905 160.897 150.257 164.491 143.755C168.085 137.08 170.566 129.893 171.935 122.192H115.719C111.269 122.192 107.847 120.823 105.451 118.085C103.226 115.347 102.114 112.352 102.114 109.101C102.114 106.02 103.226 103.196 105.451 100.63C107.847 97.8914 111.269 96.5224 115.719 96.5224H187.594Z"
            fill="#5956E8"
          />
        </g>
        <defs>
          <filter
            id="filter0_di_136_643"
            x="231.45"
            y="8.07939"
            width="127.954"
            height="203.421"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3" />
            <feGaussianBlur stdDeviation="4.65" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_136_643"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_136_643"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="-1" dy="-7" />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect2_innerShadow_136_643"
            />
          </filter>
          <filter
            id="filter1_di_136_643"
            x="189.608"
            y="0.378711"
            width="56.0785"
            height="211.122"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3" />
            <feGaussianBlur stdDeviation="4.65" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_136_643"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_136_643"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="-1" dy="-7" />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect2_innerShadow_136_643"
            />
          </filter>
          <filter
            id="filter2_di_136_643"
            x="0.403125"
            y="2.94561"
            width="209.838"
            height="211.122"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3" />
            <feGaussianBlur stdDeviation="4.65" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_136_643"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_136_643"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="-1" dy="-7" />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect2_innerShadow_136_643"
            />
          </filter>
        </defs>
      </svg>
      <button
        onClick={() => navigate("/login")}
        className="px-24 py-2 font-semibold text-white rounded-md bg-primary-primary"
      >
        로그인
      </button>
    </div>
  );
}
