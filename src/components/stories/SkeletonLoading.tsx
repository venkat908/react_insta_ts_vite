import { memo } from "react";

const SkeletonLoading = memo(() => {
  const skeletonItems = Array(5).fill(null);

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="mx-auto max-w-screen-md">
        
        <div className="mb-4 w-40 h-10 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-lg animate-pulse"></div>

        <div className="flex overflow-x-auto items-start py-3 pb-2 space-x-4 scrollbar-hide">
       
          <div className="flex flex-col flex-shrink-0 items-center space-y-2">
            <div className="flex justify-center items-center w-20 h-20 rounded-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 border-4 border-gray-300 border-dashed animate-pulse"></div>
            <div className="w-16 h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded animate-pulse"></div>
          </div>

      
          {skeletonItems.map((_, index) => (
            <div
              key={index}
              className="flex flex-col flex-shrink-0 items-center space-y-2"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-full animate-pulse"></div>
              <div className="w-16 h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

SkeletonLoading.displayName = "SkeletonLoading";

export default SkeletonLoading;
