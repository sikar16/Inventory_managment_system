import React from "react";

interface TitleProps {
  tableName: string;
  onClick: () => void;
  action: string;
}

function Title({ tableName, action, onClick }: TitleProps) {
  return (
    <div className="flex justify-between mb-3 mx-4  ">
      <p className="text-[#002a47] dark:text-gray-200 text-4xl font-medium">
        {tableName}
      </p>
      <button
        className="bg-[#002A47] dark:bg-[#313131] hover:dark:bg-[#5a5a5a] dark:text-gray-200 px-3 py-1 text-white rounded-md"
        onClick={onClick}
      >
        {action}
      </button>
    </div>
  );
}

export default Title;
