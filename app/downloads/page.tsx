'use client'

import { useState } from 'react'
import { DownloadFile } from '@/content/downloads'
import PdfViewer from '@/components/downloads/pdf-viewer'

export default function DownloadsPage() {
  const [selectedFile, setSelectedFile] = useState<DownloadFile | null>(null)

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <main className="flex-1">
            <PdfViewer file={selectedFile} />
          </main>
        </div>
      </div>
    </div>
  )
}
