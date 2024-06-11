'use client';
import React, { useEffect, useState } from 'react';
import './styles.css';

interface TypingAnimationProps {
    texts: string[];
    typingDelay?: number;
    erasingDelay?: number;
    delayBeforeErasing?: number;
  }
  
  const TypingAnimation: React.FC<TypingAnimationProps> = ({
    texts,
    typingDelay = 100,
    erasingDelay = 100,
    delayBeforeErasing = 1000,
  }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
  
    useEffect(() => {
      let charIndex = 0;
      let isDeleting = false;
      let timeout: NodeJS.Timeout;
  
      const currentHTMLContent = texts[currentTextIndex];
      const currentTextContent = currentHTMLContent.replace(/<[^>]*>/g, '');
  
      const handleTyping = () => {
        if (isDeleting) {
          if (charIndex > 0) {
            charIndex--;
            const nextText = currentTextContent.slice(0, charIndex);
            const nextHTML = applyHTMLTags(currentHTMLContent, nextText);
            setDisplayText(nextHTML);
            timeout = setTimeout(handleTyping, erasingDelay);
          } else {
            isDeleting = false;
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
            timeout = setTimeout(() => {
              setIsTyping(true);
              handleTyping();
            }, typingDelay);
          }
        } else {
          if (charIndex < currentTextContent.length) {
            charIndex++;
            const nextText = currentTextContent.slice(0, charIndex);
            const nextHTML = applyHTMLTags(currentHTMLContent, nextText);
            setDisplayText(nextHTML);
            timeout = setTimeout(handleTyping, typingDelay);
          } else {
            setIsTyping(false);
            timeout = setTimeout(() => {
              isDeleting = true;
              setIsTyping(true);
              handleTyping();
            }, delayBeforeErasing);
          }
        }
      };
  
      const applyHTMLTags = (htmlString: string, plainText: string) => {
        let result = '';
        let tagStack: string[] = [];
        let plainIndex = 0;
        let isTag = false;
  
        for (let i = 0; i < htmlString.length; i++) {
          if (htmlString[i] === '<') {
            isTag = true;
            let tag = '';
            while (htmlString[i] !== '>' && i < htmlString.length) {
              tag += htmlString[i];
              i++;
            }
            tag += '>';
            result += tag;
            if (!tag.startsWith('</')) {
              tagStack.push(tag);
            } else {
              tagStack.pop();
            }
            isTag = false;
          } else if (!isTag && plainIndex < plainText.length && htmlString[i] === plainText[plainIndex]) {
            result += htmlString[i];
            plainIndex++;
          }
        }
        return result;
      };
  
      timeout = setTimeout(handleTyping, typingDelay);
  
      return () => clearTimeout(timeout);
    }, [currentTextIndex, texts, typingDelay, erasingDelay, delayBeforeErasing]);
  
    return (
      <span className="relative">
        <span dangerouslySetInnerHTML={{ __html: displayText }}></span>
        <div className="blinking-cursor select-none">|</div>
      </span>
    );
  };
  
  export default TypingAnimation;