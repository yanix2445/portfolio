import React from 'react';

interface MarkdownTextProps {
    content: string;
    className?: string;
}

export function MarkdownText({ content, className }: MarkdownTextProps) {
    if (!content) return null;

    // 1. Split by newlines to handle paragraphs/breaks
    // We use a regex to capture splitters if we wanted to keeps them, but here we just want parts.
    // However, if we want <br/> behavior for single \n and paragraphs for \n\n:
    // User said "utilises pas /n/n simpl texte".
    // If we just respect the existing newlines as line breaks:

    return (
        <div className={className}>
            {content.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                    {parseBold(line)}
                    {i < content.split('\n').length - 1 && <br />}
                </React.Fragment>
            ))}
        </div>
    );
}

function parseBold(text: string) {
    // Split by **...**
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <strong key={index} className="font-bold text-[#CC9400]">
                    {part.slice(2, -2)}
                </strong>
            );
        }
        // Handle italics if needed, or other simple parsers here
        return part;
    });
}
