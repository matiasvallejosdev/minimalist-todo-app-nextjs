'use client'
import { useState, useEffect} from "react";

export default function useLargeScreen() {

    const [isLargeScreen, setIsLargeScreen] = useState(false); 
  
    useEffect(() => {
      setIsLargeScreen(window.matchMedia("(min-width: 768px)").matches);
  
      // I write this into a function for better visibility
      const handleResize = (e) => {
        setIsLargeScreen(e.matches);
      };
  
      const mediaQuery = window.matchMedia("(min-width: 1024px)");
  
      mediaQuery.addEventListener('change', handleResize);
  
      // Clean up the event listener when the component unmounts
      return () => {
        mediaQuery.removeEventListener('change', handleResize);
      };
    }, []);
  
    return {
      isLargeScreen
    }
};