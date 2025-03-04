
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { ResumeData } from '@/types/resume';
import ResumeSection from './ResumeSection';

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, setResumeData }) => {
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value,
      },
    });
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData({
      ...resumeData,
      summary: e.target.value,
    });
  };

  const handleArrayItemChange = (
    section: 'experience' | 'education' | 'skills' | 'projects',
    id: string,
    field: string,
    value: string
  ) => {
    setResumeData({
      ...resumeData,
      [section]: resumeData[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const addArrayItem = (section: 'experience' | 'education' | 'skills' | 'projects') => {
    const newId = String(Date.now());
    let newItem;

    switch (section) {
      case 'experience':
        newItem = { id: newId, title: '', company: '', location: '', startDate: '', endDate: '', description: '' };
        break;
      case 'education':
        newItem = { id: newId, degree: '', school: '', location: '', startDate: '', endDate: '', description: '' };
        break;
      case 'skills':
        newItem = { id: newId, name: '' };
        break;
      case 'projects':
        newItem = { id: newId, title: '', link: '', description: '' };
        break;
      default:
        return;
    }

    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], newItem],
    });
  };

  const removeArrayItem = (section: 'experience' | 'education' | 'skills' | 'projects', id: string) => {
    if (resumeData[section].length <= 1) return;
    
    setResumeData({
      ...resumeData,
      [section]: resumeData[section].filter((item) => item.id !== id),
    });
  };

  return (
    <div className="space-y-8">
      <ResumeSection title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input 
              name="name"
              value={resumeData.personalInfo.name} 
              onChange={handlePersonalInfoChange}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Job Title</label>
            <Input 
              name="title"
              value={resumeData.personalInfo.title} 
              onChange={handlePersonalInfoChange}
              placeholder="Software Engineer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input 
              name="email"
              value={resumeData.personalInfo.email} 
              onChange={handlePersonalInfoChange}
              placeholder="johndoe@example.com"
              type="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input 
              name="phone"
              value={resumeData.personalInfo.phone} 
              onChange={handlePersonalInfoChange}
              placeholder="(123) 456-7890"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <Input 
              name="location"
              value={resumeData.personalInfo.location} 
              onChange={handlePersonalInfoChange}
              placeholder="New York, NY"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Website</label>
            <Input 
              name="website"
              value={resumeData.personalInfo.website} 
              onChange={handlePersonalInfoChange}
              placeholder="https://portfolio.com"
            />
          </div>
        </div>
      </ResumeSection>

      <ResumeSection title="Professional Summary">
        <Textarea 
          value={resumeData.summary} 
          onChange={handleSummaryChange}
          placeholder="Brief summary of your professional background and goals"
          className="min-h-[100px]"
        />
      </ResumeSection>

      <ResumeSection title="Experience">
        {resumeData.experience.map((exp, index) => (
          <div key={exp.id} className="border rounded-md p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Experience {index + 1}</h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeArrayItem('experience', exp.id)}
                disabled={resumeData.experience.length <= 1}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <Input 
                  value={exp.title} 
                  onChange={(e) => handleArrayItemChange('experience', exp.id, 'title', e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <Input 
                  value={exp.company} 
                  onChange={(e) => handleArrayItemChange('experience', exp.id, 'company', e.target.value)}
                  placeholder="Company Inc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input 
                  value={exp.location} 
                  onChange={(e) => handleArrayItemChange('experience', exp.id, 'location', e.target.value)}
                  placeholder="New York, NY"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <Input 
                    value={exp.startDate} 
                    onChange={(e) => handleArrayItemChange('experience', exp.id, 'startDate', e.target.value)}
                    placeholder="Jan 2020"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <Input 
                    value={exp.endDate} 
                    onChange={(e) => handleArrayItemChange('experience', exp.id, 'endDate', e.target.value)}
                    placeholder="Present"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea 
                value={exp.description} 
                onChange={(e) => handleArrayItemChange('experience', exp.id, 'description', e.target.value)}
                placeholder="Describe your responsibilities and achievements"
                className="min-h-[80px]"
              />
            </div>
          </div>
        ))}
        <Button 
          variant="outline" 
          className="w-full mt-2 gap-2"
          onClick={() => addArrayItem('experience')}
        >
          <Plus size={16} />
          Add Experience
        </Button>
      </ResumeSection>

      <ResumeSection title="Education">
        {resumeData.education.map((edu, index) => (
          <div key={edu.id} className="border rounded-md p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Education {index + 1}</h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeArrayItem('education', edu.id)}
                disabled={resumeData.education.length <= 1}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Degree</label>
                <Input 
                  value={edu.degree} 
                  onChange={(e) => handleArrayItemChange('education', edu.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">School</label>
                <Input 
                  value={edu.school} 
                  onChange={(e) => handleArrayItemChange('education', edu.id, 'school', e.target.value)}
                  placeholder="University of Technology"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input 
                  value={edu.location} 
                  onChange={(e) => handleArrayItemChange('education', edu.id, 'location', e.target.value)}
                  placeholder="Boston, MA"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <Input 
                    value={edu.startDate} 
                    onChange={(e) => handleArrayItemChange('education', edu.id, 'startDate', e.target.value)}
                    placeholder="Sep 2016"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <Input 
                    value={edu.endDate} 
                    onChange={(e) => handleArrayItemChange('education', edu.id, 'endDate', e.target.value)}
                    placeholder="May 2020"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea 
                value={edu.description} 
                onChange={(e) => handleArrayItemChange('education', edu.id, 'description', e.target.value)}
                placeholder="Relevant coursework, honors, activities"
                className="min-h-[80px]"
              />
            </div>
          </div>
        ))}
        <Button 
          variant="outline" 
          className="w-full mt-2 gap-2"
          onClick={() => addArrayItem('education')}
        >
          <Plus size={16} />
          Add Education
        </Button>
      </ResumeSection>

      <ResumeSection title="Skills">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resumeData.skills.map((skill, index) => (
            <div key={skill.id} className="flex items-center gap-2">
              <Input 
                value={skill.name} 
                onChange={(e) => handleArrayItemChange('skills', skill.id, 'name', e.target.value)}
                placeholder={`Skill ${index + 1}`}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeArrayItem('skills', skill.id)}
                disabled={resumeData.skills.length <= 1}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
        <Button 
          variant="outline" 
          className="w-full mt-4 gap-2"
          onClick={() => addArrayItem('skills')}
        >
          <Plus size={16} />
          Add Skill
        </Button>
      </ResumeSection>

      <ResumeSection title="Projects">
        {resumeData.projects.map((project, index) => (
          <div key={project.id} className="border rounded-md p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Project {index + 1}</h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeArrayItem('projects', project.id)}
                disabled={resumeData.projects.length <= 1}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Title</label>
                <Input 
                  value={project.title} 
                  onChange={(e) => handleArrayItemChange('projects', project.id, 'title', e.target.value)}
                  placeholder="E-commerce Website"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Link</label>
                <Input 
                  value={project.link} 
                  onChange={(e) => handleArrayItemChange('projects', project.id, 'link', e.target.value)}
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea 
                value={project.description} 
                onChange={(e) => handleArrayItemChange('projects', project.id, 'description', e.target.value)}
                placeholder="Describe the project, technologies used, and your role"
                className="min-h-[80px]"
              />
            </div>
          </div>
        ))}
        <Button 
          variant="outline" 
          className="w-full mt-2 gap-2"
          onClick={() => addArrayItem('projects')}
        >
          <Plus size={16} />
          Add Project
        </Button>
      </ResumeSection>
    </div>
  );
};

export default ResumeForm;
