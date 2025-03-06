import { useCallback } from 'react';
import { Story } from '../types';

export const useImageUpload = () => {
  const handleImageUpload = useCallback(async (file: File): Promise<Story | null> => {
    if (!file.type.startsWith("image/")) {
      throw new Error("Please select an image file");
    }

 
    const imageUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error("Failed to load image"));
        }
      };
      reader.onerror = () => reject(new Error("Error reading the file"));
      reader.readAsDataURL(file);
    });

    const img = new Image();
    img.src = imageUrl;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = () => reject(new Error("Error loading image"));
    });

     
    let finalImageUrl = imageUrl;
    if (img.width > 1080 || img.height > 1920) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Failed to create canvas context");
      }

      const ratio = Math.min(1080 / img.width, 1920 / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
  
      canvas.style.transition = "opacity 0.5s ease-in-out";
      canvas.style.opacity = "0";

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      finalImageUrl = canvas.toDataURL("image/jpeg", 0.9);

  
      requestAnimationFrame(() => {
        canvas.style.opacity = "1";
      });
    }

    return {
      id: Date.now().toString(),
      imageUrl: finalImageUrl,
      timestamp: Date.now(),
      viewed: false,
    };
  }, []);

  return { handleImageUpload };
};
