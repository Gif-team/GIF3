import Profile from "../imgs/profile.svg";

const colors = {
  true: "bg-gray-700",
};

// 선택된 채팅 목록
export function ChatingList({ isSelected, userInfo, title }) {
  return (
    <div className={`flex items-center p-4 ${colors[isSelected] || "bg"}`}>
      {/* svg 크기 72px*/}
      <img src={Profile} width="72" height="72" alt="profile" />
      <section className="pl-[15px]">
        <h3 className="text-xl font-semibold">{title}</h3>
      </section>
    </div>
  );
}
