import React, { useState } from 'react';
import { MascotCompanion } from './MascotCompanion';
import { MascotChatPanel } from './MascotChatPanel';
import { useMascotChat } from '../../hooks/useMascotChat';
import { CountryKey } from '../../config/mascotConfig';

interface MascotChatProps {
  countryCode: string;
  email: string;
  fanToken: string;
}

/**
 * MascotChat - Entry point for the Phase 1C Interactive Mascot Companion.
 * Orchestrates the MascotCompanion (floating mascot) and the MascotChatPanel.
 */
export const MascotChat: React.FC<MascotChatProps> = ({ countryCode, email, fanToken }) => {
  const [inputValue, setInputValue] = useState('');
  
  const {
    isOpen,
    setIsOpen,
    messages,
    isLoading,
    mascotState,
    sendMessage,
    clearHistory,
    mascot
  } = useMascotChat(countryCode, email, fanToken);

  if (!mascot || !email || !fanToken) return null;

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    sendMessage(text);
    setInputValue('');
  };

  const handleQuickReply = (text: string) => {
    setIsOpen(true);
    sendMessage(text);
  };

  return (
    <>
      {/* The Floating Mascot Companion */}
      <MascotCompanion 
        mascot={mascot}
        state={mascotState}
        isVisible={!isOpen}
        onClick={() => setIsOpen(true)}
        onQuickReply={handleQuickReply}
      />

      {/* The Interactive Chat Panel */}
      {isOpen && (
        <MascotChatPanel 
          mascot={mascot}
          messages={messages}
          isLoading={isLoading}
          onClose={() => setIsOpen(false)}
          onSendMessage={handleSendMessage}
          onClearHistory={clearHistory}
          inputValue={inputValue}
          setInputValue={setInputValue}
          mascotState={mascotState}
        />
      )}
    </>
  );
};
