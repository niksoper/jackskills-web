import * as React from 'react';

export interface ExternalLinkProps {
  title?: string;
  href: string;
  className?: string;
}

export const ExternalLink: React.FunctionComponent<ExternalLinkProps> = ({ children, title, href, className }) => (
  <a className={className} target="_blank" rel="noopener noreferrer" href={href} title={title}>
    {children}
  </a>
);
