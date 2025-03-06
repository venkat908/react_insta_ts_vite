import { memo } from "react";

interface AddStoryButtonProps {
  onClick: () => void;
}

const AddStoryButton = memo(({ onClick }: AddStoryButtonProps) => (
  <div className="flex flex-col items-center space-y-1">
    <button
      onClick={onClick}
   
      className="group flex justify-center items-center w-16 h-16 rounded-full border-4 border-blue-400 border-dashed shadow-md transition-all duration-300 hover:border-blue-500 hover:bg-blue-100 hover:shadow-lg"
      aria-label="Add new story"
    >
   
      <span className="text-3xl text-blue-400 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110 m-0 p-0">
        +
      </span>
    </button>
    <span className="text-xs font-semibold text-gray-600">Add Story</span>
  </div>
));

AddStoryButton.displayName = "AddStoryButton";

export default AddStoryButton;
