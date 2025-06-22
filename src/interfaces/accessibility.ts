import { Dispatch, SetStateAction } from "react";

export interface AdditionalSettings {
  background: string;
  color: string;
  textDecoration: string;
  visibility: string;
  cursor: string;
}

// All available functions and values
export interface AccessibilityContextType {
  // Scaling multipliers
  fontScale: number;
  lineHeightScale: number;
  letterSpacingScale: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  increaseLineHeight: () => void;
  decreaseLineHeight: () => void;
  increaseLetterSpacing: () => void;
  decreaseLetterSpacing: () => void;
  // Additional settings values
  background: string;
  color: string;
  textDecoration: string;
  visibility: string;
  cursor: string;
  // Additional functions
  textAlign: string;
  setTextAlign: Dispatch<SetStateAction<string>>;
  handleAlignmentChange: (value: string) => void;
  highlightLinksColor: (
    bgColor: string,
    textColor: string,
    underline: string
  ) => void;
  hideImages: (visibility: string) => void;
  biggerCursor: () => void;
  resetSettings: () => void;
  updateAdditionalSetting: (
    key: keyof AdditionalSettings,
    value: string
  ) => void;
  additionalSettings: AdditionalSettings;
  resetTextAlignment: () => void;
  isTextAlignmentDefault: () => boolean;
  isResetButtonEnabled: () => boolean;
}
