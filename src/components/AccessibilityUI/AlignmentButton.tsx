import {
  ALIGNMENT_STYLES,
  ICON_COLORS,
} from "@/components/AccessibilityUI/types";
import { Left, Right, Center } from "@/components/icons";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

interface AlignmentButtonProps {
  type: "left" | "right" | "center" | "justify";
  currentAlign: string;
  onAlignmentChange: (alignment: string) => void;
  title: string;
}

interface OneActionButtonProps {
  title?: string;
  onClick: () => void;
  icon: React.ReactNode;
  className: string;
}

const getAlignmentIcon = (type: string, isActive: boolean) => {
  const colors = isActive ? ICON_COLORS.active : ICON_COLORS.inactive;

  switch (type) {
    case "left":
      return <Left fill={colors.fill} stroke={colors.stroke} />;
    case "right":
      return <Right fill={colors.fill} stroke={colors.stroke} />;
    case "center":
      return <Center fill={colors.fill} stroke={colors.stroke} />;
    case "justify":
      return (
        <HiOutlineMenuAlt2
          className={`text-2xl ${isActive ? "text-white" : "text-[#3C0404]"}`}
        />
      );
    default:
      return null;
  }
};

const OneActionButton = ({
  title,
  onClick,
  icon,
  className,
}: OneActionButtonProps) => {
  return (
    <div className="flex flex-col items-center">
      <button
        className={`p-4 transition-colors hover:bg-gray-100 ${className}`}
        onClick={onClick}
      >
        {icon}
      </button>
      {title && <span className="mt-2 text-[1rem]">{title}</span>}
    </div>
  );
};

export const AlignmentButton = ({
  type,
  currentAlign,
  onAlignmentChange,
  title,
}: AlignmentButtonProps) => {
  const isActive = currentAlign === type;

  return (
    <OneActionButton
      title={title}
      icon={getAlignmentIcon(type, isActive)}
      onClick={() => onAlignmentChange(type)}
      className={`
        group
        ${isActive ? ALIGNMENT_STYLES.active : ALIGNMENT_STYLES.inactive}
      `}
    />
  );
};
