
import React, { ReactNode } from 'react';

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ title, children }) => {
  return (
    <section className="mb-6">
      <h3 className="text-lg font-semibold mb-3 pb-2 border-b">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
};

export default ResumeSection;
