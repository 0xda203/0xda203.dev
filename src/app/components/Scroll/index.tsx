'use client';
import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

const Scroll: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [thumbHeight, setThumbHeight] = useState(0);
    const [thumbTop, setThumbTop] = useState(0);
    const scrollTimeout = useRef<number | null>(null);
    const padding = 20; // Padding at top and bottom
  
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
  
      const thumbHeight = (clientHeight / scrollHeight) * (clientHeight - 2 * padding);
      const thumbTop = (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - 2 * padding - thumbHeight) + padding;
  
      setThumbHeight(thumbHeight);
      setThumbTop(thumbTop);
  
      if (!visible) {
        setVisible(true);
      }
  
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
  
      scrollTimeout.current = window.setTimeout(() => {
        setVisible(false);
      }, 1000); // Debounce delay (1 second)
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll); // Update on resize
      handleScroll(); // Initial call to set the correct size
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
      };
    }, []);
  
    return (
      <div className={`custom-scroll ${visible ? 'visible' : ''}`}>
        <div
          className="custom-scroll-thumb"
          style={{ height: `${thumbHeight}px`, top: `${thumbTop}px` }}
        />
      </div>
    );
  };
  
  export default Scroll;