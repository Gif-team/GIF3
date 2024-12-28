import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-3xl font-extrabold">Not Found</h1>
      <div className="flex gap-2 text-sm font-bold text-gray-500">
        <p>잘못된 접근입니다.</p>
        <button className="underline" onClick={() => navigate("/main")}>
          메인으로 돌아가기
        </button>
      </div>
    </div>
  );
}
