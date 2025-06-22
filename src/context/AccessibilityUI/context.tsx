"use client";

import {
  AccessibilityContextType,
  AdditionalSettings,
} from "@/interfaces/accessibility";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import { removeTextAlignmentClasses } from "@/utils/tailwindOverrideUtils";
import { getStoredMultiplier, getStoredTextAlign } from "@/utils/storage";
import { applyScaling, applyTextAlign } from "@/utils/dom";
import { debounce } from "@/utils/debounce";

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({
  children,
}) => {
  const pathname = usePathname();

  // --- Additional Settings State ---
  const initialAdditionalSettings: AdditionalSettings = {
    background: "",
    color: "",
    textDecoration: "",
    visibility: "",
    cursor: "",
  };

  const [additionalSettings, setAdditionalSettings] =
    useState<AdditionalSettings>(() => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("additionalSettings");
        return stored ? JSON.parse(stored) : initialAdditionalSettings;
      }
      return initialAdditionalSettings;
    });

  // States with initial values from storage
  const [fontScale, setFontScale] = useState(() =>
    getStoredMultiplier("fontScale", 1)
  );
  const [lineHeightScale, setLineHeightScale] = useState(() =>
    getStoredMultiplier("lineHeightScale", 1)
  );
  const [letterSpacingScale, setLetterSpacingScale] = useState(() =>
    getStoredMultiplier("letterSpacingScale", 1)
  );
  const [textAlign, setTextAlign] = useState(() => getStoredTextAlign());

  // Optimized useEffect for handling all style-related updates
  useEffect(() => {
    const styleElements: Record<string, HTMLStyleElement> = {};

    const getStyleElement = (id: string) => {
      if (!styleElements[id]) {
        const element =
          (document.getElementById(id) as HTMLStyleElement) ||
          document.createElement("style");
        element.id = id;
        if (!element.parentNode) {
          document.head.appendChild(element);
        }
        styleElements[id] = element;
      }
      return styleElements[id];
    };

    // Debounced DOM updates for performance
    const debouncedUpdateLinks = debounce(() => {
      const links = document.querySelectorAll("a");
      links.forEach((a) => {
        const el = a as HTMLElement;
        el.style.background = additionalSettings.background;
        el.style.color = additionalSettings.color;
        el.style.textDecoration = additionalSettings.textDecoration;
      });
    }, 16);

    // Handle visibility styles
    if (additionalSettings.visibility === "hidden") {
      const styleElement = getStyleElement("hide-images-style");
      styleElement.innerHTML = `
        img { visibility: hidden !important; }
        [class*="bg-[url"],
        [style*="background-image"],
        [style*="background:"][style*="url"],
        [style*="background"][style*="url"] {
          background-image: none !important;
        }
      `;
    } else {
      document.getElementById("hide-images-style")?.remove();
    }

    // Handle cursor styles
    if (additionalSettings.cursor) {
      const styleElement = getStyleElement("custom-cursor-style");
      styleElement.innerHTML = `
        *, *:hover { 
          cursor: url(${additionalSettings.cursor}) 8 4, auto !important;
        }
        a, button, [role="button"], input[type="submit"], input[type="button"] {
          cursor: url(${additionalSettings.cursor}) 8 4, pointer !important;
        }
        input[type="text"], input[type="number"], textarea, [contenteditable="true"] {
          cursor: url(${additionalSettings.cursor}) 8 4, text !important;
        }
      `;
    } else {
      document.getElementById("custom-cursor-style")?.remove();
    }

    // Execute debounced updates
    debouncedUpdateLinks();

    // Cleanup function
    return () => {
      Object.values(styleElements).forEach((element) => {
        element.parentNode?.removeChild(element);
      });
      debouncedUpdateLinks.cancel();
    };
  }, [additionalSettings, pathname]);

  // Optimized useEffect for text alignment
  useEffect(() => {
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--text-align", textAlign);
      document.body.style.textAlign = textAlign;
    });
  }, [textAlign]);

  // Optimized useEffect for scaling values
  useEffect(() => {
    requestAnimationFrame(() => {
      const root = document.documentElement;
      const body = document.body;

      const updates = {
        "--font-scale": fontScale.toString(),
        "--line-height-scale": lineHeightScale.toString(),
        "--letter-spacing-scale": letterSpacingScale.toString(),
      };

      Object.entries(updates).forEach(([prop, value]) => {
        root.style.setProperty(prop, value);
      });

      body.classList.toggle("custom-line-height", lineHeightScale > 1);
    });
  }, [fontScale, lineHeightScale, letterSpacingScale]);

  // Optimized update function for text alignment
  const updateTextAlign = (value: string) => {
    setTextAlign(value);
    removeTextAlignmentClasses();
    localStorage.setItem("textAlign", value);
    applyTextAlign(value);
    const updatedSettings = { ...additionalSettings, textAlign: value };
    localStorage.setItem("additionalSettings", JSON.stringify(updatedSettings));
    setAdditionalSettings(updatedSettings);
  };

  // Optimized scaling update function
  const updateScale = (
    key: "fontScale" | "lineHeightScale" | "letterSpacingScale",
    value: number,
    setter: Dispatch<SetStateAction<number>>
  ) => {
    requestAnimationFrame(() => {
      setter(value);
      localStorage.setItem(key, value.toString());
      if (key === "fontScale") {
        const bodyStyle = document.body.style as CSSStyleDeclaration & {
          zoom?: string;
        };
        bodyStyle.zoom = value.toString();
        if (!("zoom" in document.body.style)) {
          bodyStyle.transform = `scale(${value})`;
          bodyStyle.transformOrigin = "left top";
        }
      } else {
        applyScaling(key, value);
      }
    });
  };

  // Recommended font size by WCAG 2.2
  const increaseFontSize = () =>
    updateScale("fontScale", Math.min(fontScale + 0.25, 2.0), setFontScale); // 25% increments, up to 200%

  const decreaseFontSize = () =>
    updateScale("fontScale", Math.max(fontScale - 0.25, 1), setFontScale);

  // Recommended line height by WCAG 2.2
  const increaseLineHeight = () => {
    const newScale = Math.min(lineHeightScale + 0.1, 2.0); // Maximum of 200%
    updateScale("lineHeightScale", newScale, setLineHeightScale);
  };

  const decreaseLineHeight = () => {
    const newScale = Math.max(lineHeightScale - 0.1, 1); // Minimum of 150%
    updateScale("lineHeightScale", newScale, setLineHeightScale);
  };

  const increaseLetterSpacing = () =>
    updateScale(
      "letterSpacingScale",
      Math.min(letterSpacingScale + 0.4, 3),
      setLetterSpacingScale
    );

  const decreaseLetterSpacing = () =>
    updateScale(
      "letterSpacingScale",
      Math.max(letterSpacingScale - 0.4, 1),
      setLetterSpacingScale
    );

  // Optimized helper functions
  const updateAdditionalSetting = (
    key: keyof AdditionalSettings,
    value: string
  ) => {
    const newSettings = { ...additionalSettings, [key]: value };
    setAdditionalSettings(newSettings);
    localStorage.setItem("additionalSettings", JSON.stringify(newSettings));
  };

  const highlightLinksColor = (
    bgColor: string,
    textColor: string,
    underline: string
  ) => {
    const newSettings = {
      ...additionalSettings,
      background: additionalSettings.background === bgColor ? "" : bgColor,
      color: additionalSettings.color === textColor ? "" : textColor,
      textDecoration:
        additionalSettings.textDecoration === underline ? "" : underline,
    };
    setAdditionalSettings(newSettings);
    localStorage.setItem("additionalSettings", JSON.stringify(newSettings));
  };

  const hideImages = (visibility: string) => {
    const newVisibility =
      additionalSettings.visibility === visibility ? "" : visibility;
    updateAdditionalSetting("visibility", newVisibility);
  };

  const biggerCursor = () => {
    const cursorUrl = "/assets/common/cursor.svg";
    const isCursorActive = additionalSettings.cursor === cursorUrl;
    const newCursor = isCursorActive ? "" : cursorUrl;
    updateAdditionalSetting("cursor", newCursor);
  };

  const resetTextAlignment = () => {
    setTextAlign("");
    localStorage.removeItem("textAlign");
    document.documentElement.style.removeProperty("--text-align");
    document.body.style.textAlign = "";
    document.getElementById("__next")?.removeAttribute("data-align");

    requestAnimationFrame(() => {
      document
        .querySelectorAll("h1,h2,h3,h4,h5,h6,span,p,div")
        .forEach((el) => {
          if (el instanceof HTMLElement) {
            el.removeAttribute("data-align");
            el.style.textAlign = "";
          }
        });
    });
  };

  const resetSettings = () => {
    setFontScale(1);
    setLineHeightScale(1);
    setLetterSpacingScale(1);
    setTextAlign("");
    localStorage.clear();

    requestAnimationFrame(() => {
      document.body.style.setProperty("zoom", "1");
      document.body.style.setProperty("transform", "");
      document.body.style.setProperty("transform-origin", "");
      document.getElementById("custom-cursor-style")?.remove();
    });

    setAdditionalSettings(initialAdditionalSettings);
  };

  // Change from useMemo to a function
  const isTextAlignmentDefault = () => textAlign === "";

  const isResetButtonEnabled = () => {
    const isFontModified = fontScale !== 1;
    const isLineHeightModified = lineHeightScale !== 1;
    const isLetterSpacingModified = letterSpacingScale !== 1;

    const isAdditionalSettingsModified = Object.entries(
      additionalSettings
    ).some(
      ([key, value]) =>
        key !== "textAlign" &&
        value !== initialAdditionalSettings[key as keyof AdditionalSettings]
    );

    return (
      isFontModified ||
      isLineHeightModified ||
      isLetterSpacingModified ||
      isAdditionalSettingsModified
    );
  };

  // Context value
  const contextValue = useMemo(
    () => ({
      fontScale,
      lineHeightScale,
      letterSpacingScale,
      increaseFontSize,
      decreaseFontSize,
      increaseLineHeight,
      decreaseLineHeight,
      increaseLetterSpacing,
      decreaseLetterSpacing,
      background: additionalSettings.background,
      color: additionalSettings.color,
      textDecoration: additionalSettings.textDecoration,
      visibility: additionalSettings.visibility,
      cursor: additionalSettings.cursor,
      textAlign,
      setTextAlign,
      isTextAlignmentDefault,
      resetTextAlignment,
      handleAlignmentChange: updateTextAlign,
      highlightLinksColor,
      hideImages,
      biggerCursor,
      resetSettings,
      updateAdditionalSetting,
      additionalSettings,
      isResetButtonEnabled,
    }),
    [
      fontScale,
      lineHeightScale,
      letterSpacingScale,
      additionalSettings,
      textAlign,
      isTextAlignmentDefault,
      isResetButtonEnabled,
    ]
  );

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }
  return context;
};
