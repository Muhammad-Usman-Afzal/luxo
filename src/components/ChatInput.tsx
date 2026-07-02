// ChatInput — Compact, responsive | BazaarHub
import { useState, useRef, useEffect } from 'react';
import { Send, Reply, X, Paperclip } from 'lucide-react';
import type { ChatMessage } from '../types';

interface Props {
  replyTo: ChatMessage | null;
  onSend: (text: string) => void;
  onCancelReply: () => void;
}

export default function ChatInput({ replyTo, onSend, onCancelReply }: Props) {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, [replyTo]);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Reply preview — compact single line */}
      {replyTo && (
        <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <Reply size={12} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
          <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate flex-1 min-w-0">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">Reply: </span>
            {replyTo.content.slice(0, 60)}{replyTo.content.length > 60 ? '...' : ''}
          </p>
          <button onClick={onCancelReply} className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded shrink-0"><X size={12} /></button>
        </div>
      )}

      {/* Input row */}
      <div className="flex items-center gap-1 xs:gap-1.5 px-1.5 xs:px-2 sm:px-3 py-1.5 sm:py-2">
        <button className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 shrink-0 hidden xs:block">
          <Paperclip size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          placeholder="Message..."
          className="flex-1 min-w-0 px-3 py-2 sm:py-2.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm outline-none text-gray-900 dark:text-white placeholder-gray-400 focus:ring-1 focus:ring-indigo-500"
        />
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-full disabled:bg-gray-300 dark:disabled:bg-gray-700 transition shrink-0 shadow-sm"
        >
          <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
      </div>
    </div>
  );
}
