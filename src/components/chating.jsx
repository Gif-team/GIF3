import Profile from "../imgs/profile.svg";

const chatings = {
  other:
    "max-w-[400px] p-[10px] ml-[15px] rounded-tr-[15px] rounded-b-[15px] bg-primary-primary text-white font-medium break-words",
  my: "max-w-[400px] p-[10px] mr-[15px] rounded-tl-[15px] rounded-b-[15px] bg-gray-700 text-black font-medium break-words",
};

// 상대 || 나의 채팅
export function ChatingTo({ whose, msg }) {
  return (
    <>
      <div
        className={`flex ${
          whose === "other" ? "" : "flex-row-reverse"
        } items-start p-4`}
      >
        {/* svg 크기 32px*/}
        <img src={Profile} width="32" height="32" alt="profile" />
        <section className={`${chatings[whose]}`}>
          <p>
            {/*여기에 댓글 추가*/}
            {msg}
          </p>
        </section>
      </div>
    </>
  );
}
