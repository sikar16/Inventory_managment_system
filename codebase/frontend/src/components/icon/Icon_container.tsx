import { cn } from "../../utils/class_name_utils";

const IconContainer = ({ children, handler, Icon, iconsClassName }: any) => {
  return (
    <button
      className={`text-center p-2  relative  max-h-8 aspect-[1/1] `}
      onClick={handler}
    >
      <Icon
        className={cn("text-xl text-blue-950 dark:text-white", iconsClassName)}
      />
      {children && children}
    </button>
  );
};

export default IconContainer;
