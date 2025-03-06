import React, { useState, useEffect, useRef, useCallback } from "react";
import StoryViewer from "./StoryViewer";
import SkeletonLoading from "./stories/SkeletonLoading";
import StoryItem from "./stories/StoryItem";
import AddStoryButton from "./stories/AddStoryButton";
import { useImageUpload } from "../hooks/useImageUpload";
import { loadStoriesFromLocalStorage, saveStoriesToLocalStorage, getTimeAgo } from "../utils/storyHelpers";
import { Story } from "../types";

const Stories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleImageUpload } = useImageUpload();

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const loadedStories = await loadStoriesFromLocalStorage();
      setStories(loadedStories);
      setIsLoading(false);
    };

    init();
    const intervalId = setInterval(cleanupExpiredStories, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const cleanupExpiredStories = useCallback(() => {
    setStories((prevStories) => {
      const filteredStories = prevStories.filter(
        (story) => Date.now() - story.timestamp < 24 * 60 * 60 * 1000
      );
      saveStoriesToLocalStorage(filteredStories);
      return filteredStories;
    });
  }, []);

  const handleStoryClick = useCallback((index: number) => {
    setStories((prevStories) =>
      prevStories.map((story, i) =>
        i === index && !story.viewed ? { ...story, viewed: true } : story
      )
    );
    setSelectedStoryIndex(index);
  }, []);

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const newStory = await handleImageUpload(file).catch((error) => {
        console.error("Error uploading image:", error);
        alert(error instanceof Error ? error.message : "Error uploading image");
      });

      if (newStory) {
        setStories((prevStories) => {
          const updatedStories = [...prevStories, newStory];
          saveStoriesToLocalStorage(updatedStories);
          return updatedStories;
        });
      }

      fileInputRef.current!.value = "";
    },
    [handleImageUpload]
  );

  const handleAddStoryClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  if (isLoading) {
    return <SkeletonLoading />;
  }

  return (
    <div
      className={`p-4 min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800"
      }`}
    >
      <div className="max-w-screen-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Stories</h1>
          <button
            className="p-2 rounded-full border border-gray-500 dark:border-gray-300"
            onClick={toggleDarkMode}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
        <div className="flex items-start space-x-3 py-3 overflow-x-auto pb-2 scrollbar-hide">
          <AddStoryButton onClick={handleAddStoryClick} />
          {stories.map((story, index) => (
            <StoryItem
              key={story.id}
              story={story}
              index={index}
              onStoryClick={handleStoryClick}
              getTimeAgo={getTimeAgo}
            />
          ))}
        </div>

        {stories.length === 0 && (
          <div className="text-center py-8">
            <p>No stories yet. Click the + button to add your first story!</p>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      {selectedStoryIndex !== null && (
        <StoryViewer
          stories={stories}
          initialIndex={selectedStoryIndex}
          onClose={() => setSelectedStoryIndex(null)}
        />
      )}
    </div>
  );
};

export default Stories;
