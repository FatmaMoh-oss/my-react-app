
interface DrawerOverlayProps {
  onClose: () => void;
}

export const DrawerOverlay = ({ onClose }: DrawerOverlayProps) => (
  <div
    className="fixed inset-0 bg-[#8d8d8d] opacity-40 z-30"
    onClick={onClose}
  />
);
