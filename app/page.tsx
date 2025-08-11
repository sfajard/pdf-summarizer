'use client'

import axios from "axios"
import React, { useState, useRef } from "react"
import { FaFilePdf } from 'react-icons/fa';
import Head from 'next/head'; // Import Head dari Next.js untuk SEO

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [summaryStatus, setSummaryStatus] = useState<string>("Select a PDF file to summarize");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      setSummaryStatus("Please select a file first.");
      return
    }

    setSummaryStatus("Summarizing document, please wait...");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:8000/summarize", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'summary.pdf');
      
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setSummaryStatus("Summary successfully created and downloaded! 🎉");

    } catch (error: unknown) {
      console.error("An error occurred:", error);
      let errorMessage = "An unknown error occurred.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setSummaryStatus(`An error occurred while summarizing the file: ${errorMessage}`);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSummaryStatus(`File selected: ${file.name}`);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Head>
        <title>PDF Document Summarizer - Fast AI Summary</title>
        <meta name="description" content="Quickly upload and summarize your PDF documents with our AI-powered tool. Get key points in a downloadable PDF." />
        <meta name="keywords" content="pdf summarizer, document summary, ai summary, pdf tool, online summarizer, fast summary" />
        <meta property="og:title" content="PDF Document Summarizer" />
        <meta property="og:description" content="Quickly upload and summarize your PDF documents with our AI-powered tool." />
        <meta property="og:image" content="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fdocument&psig=AOvVaw2CWiIxa-20q-581PabHR1B&ust=1754885379097000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLivitmv_44DFQAAAAAdAAAAABAE" />
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
        <main className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 space-y-6">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center">
            PDF Document Summarizer
          </h1>
          <p className="text-gray-600 text-center">
            Upload your PDF file to get an automatic summary.
          </p>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg transition-colors duration-200">
              <FaFilePdf className="text-5xl text-red-500 mb-2" aria-label="PDF file icon"/>
              <p className="text-gray-500 font-medium">{selectedFile ? selectedFile.name : "Drag & drop your file here"}</p>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="application/pdf"
                className="hidden"
              />
              
              <button
                type="button"
                onClick={handleButtonClick}
                className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 cursor-pointer"
              >
                Choose File
              </button>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={!selectedFile}
            >
              {summaryStatus.includes("Summarizing") ? "Processing..." : "Summarize Document"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className={`font-medium ${summaryStatus.includes("successfully") ? 'text-green-600' : summaryStatus.includes("error occurred") ? 'text-red-600' : 'text-gray-600'}`}>
              {summaryStatus}
            </p>
          </div>
        </main>
      </div>
    </>
  )
}
