
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import { generatePDF } from '@/utils/resumeUtils';
import { ResumeData } from '@/types/resume';

const DEFAULT_RESUME_DATA: ResumeData = {
  personalInfo: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
  },
  summary: '',
  experience: [{ id: '1', title: '', company: '', location: '', startDate: '', endDate: '', description: '' }],
  education: [{ id: '1', degree: '', school: '', location: '', startDate: '', endDate: '', description: '' }],
  skills: [{ id: '1', name: '' }],
  projects: [{ id: '1', title: '', link: '', description: '' }],
};

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME_DATA);
  
  const handleDownloadPDF = () => {
    generatePDF('resume-preview');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Resume Generator</h1>
        <p className="text-muted-foreground mt-2">Create your professional resume in minutes</p>
      </header>

      <Tabs defaultValue="edit" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <Button onClick={handleDownloadPDF} className="gap-2">
            <Download size={16} />
            Download PDF
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <TabsContent value="edit" className="p-4 mt-0">
              <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
            </TabsContent>
            <TabsContent value="preview" className="mt-0">
              <div id="resume-preview">
                <ResumePreview resumeData={resumeData} />
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default Index;
