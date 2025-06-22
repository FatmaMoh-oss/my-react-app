interface DrawerHeaderProps {
  title: string;
  onClose: () => void;
}

export const DrawerHeader = ({ title, onClose }: DrawerHeaderProps) => (
  <div className="flex justify-between items-center mb-10 mt-[4rem]">
    <h1 className="text-2xl font-medium">{title}</h1>
    <button
      onClick={onClose}
      className="p-2 hover:bg-gray-100 transition-colors"
    >
      <span className="text-2xl cursor-pointer">&times;</span>
    </button>
  </div>
);
