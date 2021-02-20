import * as React from 'react';

export interface ContentProps {
  content: string;
  className?: string;
}

export const HTMLContent: React.FunctionComponent<ContentProps> = ({ content, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
);

const Content: React.FunctionComponent<ContentProps> = ({ content, className }) => (
  <div className={className}>{content}</div>
);

export default Content;
