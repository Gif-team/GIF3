export function ImageCard({ url }) {
  return (
    <div
      className=" relative flex items-center justify-center 
      border border-gray-400 rounded-lg select-none
      w-[150px] h-[150px] overflow-hidden flex-shrink-0"
    >
      <img
        alt="이미지"
        src={url ? url : null}
        className="absolute object-cover w-full h-full"
      />
    </div>
  );
}
