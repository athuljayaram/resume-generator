
import React from 'react';
import { ResumeData } from '@/types/resume';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  const { personalInfo, summary, experience, education, skills, projects } = resumeData;

  return (
    <div className="bg-white p-6 min-h-[1056px] shadow-sm w-full max-w-[800px] mx-auto">
      <header className="mb-6 pb-4 border-b">
        <h1 className="text-2xl font-bold mb-2">{personalInfo.name || 'Your Name'}</h1>
        {personalInfo.title && <p className="text-lg text-gray-700 mb-2">{personalInfo.title}</p>}
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          {personalInfo.email && (
            <span className="inline-flex items-center">
              <span className="font-medium mr-1">Email:</span> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="inline-flex items-center">
              <span className="font-medium mr-1">Phone:</span> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="inline-flex items-center">
              <span className="font-medium mr-1">Location:</span> {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="inline-flex items-center">
              <span className="font-medium mr-1">Website:</span> {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Professional Summary</h2>
          <p className="text-gray-700">{summary}</p>
        </section>
      )}

      {experience.some(exp => exp.title || exp.company) && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3 pb-1 border-b">Experience</h2>
          {experience.map((exp, index) => (
            (exp.title || exp.company) && (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{exp.title}</h3>
                    <div className="text-gray-700">{exp.company}{exp.location ? ` • ${exp.location}` : ''}</div>
                  </div>
                  {(exp.startDate || exp.endDate) && (
                    <div className="text-sm text-gray-600">
                      {exp.startDate} {exp.startDate && exp.endDate && '–'} {exp.endDate}
                    </div>
                  )}
                </div>
                {exp.description && <p className="mt-2 text-sm text-gray-700">{exp.description}</p>}
              </div>
            )
          ))}
        </section>
      )}

      {education.some(edu => edu.degree || edu.school) && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3 pb-1 border-b">Education</h2>
          {education.map((edu, index) => (
            (edu.degree || edu.school) && (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{edu.degree}</h3>
                    <div className="text-gray-700">{edu.school}{edu.location ? ` • ${edu.location}` : ''}</div>
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <div className="text-sm text-gray-600">
                      {edu.startDate} {edu.startDate && edu.endDate && '–'} {edu.endDate}
                    </div>
                  )}
                </div>
                {edu.description && <p className="mt-2 text-sm text-gray-700">{edu.description}</p>}
              </div>
            )
          ))}
        </section>
      )}

      {skills.some(skill => skill.name) && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              skill.name && (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {skill.name}
                </span>
              )
            ))}
          </div>
        </section>
      )}

      {projects.some(project => project.title || project.description) && (
        <section>
          <h2 className="text-lg font-semibold mb-3 pb-1 border-b">Projects</h2>
          {projects.map((project, index) => (
            (project.title || project.description) && (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">
                    {project.title}
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline ml-2 text-sm"
                      >
                        Link
                      </a>
                    )}
                  </h3>
                </div>
                {project.description && <p className="mt-1 text-sm text-gray-700">{project.description}</p>}
              </div>
            )
          ))}
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
