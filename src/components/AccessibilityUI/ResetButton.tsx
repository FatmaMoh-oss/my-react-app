import { COMMON_STYLES } from "@/components/AccessibilityUI/types";

interface ResetButtonProps {
  onClick: () => void;
  disabled: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const ResetButton = ({
  onClick,
  disabled,
  icon,
  children,
}: ResetButtonProps) => (
  <button
    className={`w-full py-2 px-6 text-lg text-white transition-colors flex items-center justify-center gap-2 ${
      !disabled ? COMMON_STYLES.ENABLED_BUTTON : COMMON_STYLES.DISABLED_BUTTON
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    {icon}
    {children}
  </button>
);
