import { IconType } from "react-icons/lib";
import { cn } from "../../util/class_name_utils";

interface IconContainerProps {
  children: React.ReactNode | null,
  handler: () => void,
  Icon: IconType | undefined,
  iconsClassName: string
}

const IconContainer: React.FC<IconContainerProps> = ({ children, handler, Icon, iconsClassName }) => {
  return (
    <button
      className={`text-center p-2  relative  max-h-8 aspect-[1/1] text-white `}
      onClick={handler}
    >
      {Icon && <Icon
        className={cn("text-xl text-white", iconsClassName)}
      />}
      {children && children}
    </button>
  );
};

export default IconContainer;
