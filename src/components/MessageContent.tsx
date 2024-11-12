import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import syntaxTheme from '../theme/syntax-theme';
import SequenceViewer from './SequenceViewer';

interface CodeBlockProps {
  code: string;
  language?: string;
  collapsed?: boolean;
}

interface MessageContentProps {
  content: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'plaintext', collapsed = false }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const previewLines = 5;
  const codeLines = code.split('\n');
  const hasMoreLines = codeLines.length > previewLines;
  const displayCode = isCollapsed ? codeLines.slice(0, previewLines).join('\n') : code;

  return (
    <div className="relative mt-2 mb-2 group">
      <div className="absolute right-2 top-2 flex items-center gap-2 z-10">
        {hasMoreLines && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded bg-slate-700/50 hover:bg-slate-700/70 text-slate-300
              transition-colors duration-200"
            title={isCollapsed ? "Show all" : "Show less"}
          >
            {isCollapsed ? (
              <ChevronDownIcon className="h-4 w-4" />
            ) : (
              <ChevronUpIcon className="h-4 w-4" />
            )}
          </button>
        )}
        <button
          onClick={handleCopy}
          className="p-1.5 rounded bg-slate-700/50 hover:bg-slate-700/70 text-slate-300
            transition-colors duration-200"
          title="Copy code"
        >
          {isCopied ? (
            <CheckIcon className="h-4 w-4 text-green-400" />
          ) : (
            <ClipboardIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={syntaxTheme}
          customStyle={{
            margin: 0,
            borderRadius: '0.5rem',
            padding: '1rem',
            background: '#1a1f2e',
          }}
          wrapLongLines={true}
          showLineNumbers={!isCollapsed && codeLines.length > 5}
        >
          {displayCode}
        </SyntaxHighlighter>
        {isCollapsed && hasMoreLines && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#1a1f2e] to-transparent" />
        )}
      </div>
      {language && (
        <div className="absolute top-0 left-4 px-2 py-1 -translate-y-1/2 
          text-xs font-medium text-slate-400 bg-[#1a1f2e] rounded-full
          border border-slate-700/50">
          {language}
        </div>
      )}
      {isCollapsed && hasMoreLines && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="mt-2 text-xs text-slate-400 hover:text-slate-300
            transition-colors duration-200"
        >
          Show {codeLines.length - previewLines} more lines...
        </button>
      )}
    </div>
  );
};

const MessageContent: React.FC<MessageContentProps> = ({ content }) => {
  const renderContent = () => {
    const parts = content.split(/(```[\s\S]*?```|\[DNA:[\s\S]*?\]|\[PROTEIN:[\s\S]*?\])/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const [, language, ...codeParts] = part.split('\n');
        const code = codeParts.slice(0, -1).join('\n');
        return (
          <CodeBlock 
            key={index} 
            code={code} 
            language={language?.toLowerCase() || 'plaintext'} 
            collapsed={code.split('\n').length > 10} 
          />
        );
      }
      
      if (part.startsWith('[DNA:') && part.endsWith(']')) {
        const sequence = part.slice(5, -1).trim();
        return <SequenceViewer key={index} sequence={sequence} type="dna" />;
      }

      if (part.startsWith('[PROTEIN:') && part.endsWith(']')) {
        const sequence = part.slice(9, -1).trim();
        return <SequenceViewer key={index} sequence={sequence} type="protein" />;
      }

      return part ? (
        <p key={index} className="whitespace-pre-wrap leading-relaxed">
          {part}
        </p>
      ) : null;
    });
  };

  return (
    <div className="space-y-2 text-sm">
      {renderContent()}
    </div>
  );
};

export default MessageContent;
