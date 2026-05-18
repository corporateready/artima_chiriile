'use client'

import { DownloadFile } from '@/content/downloads'

type Props = {
  file: DownloadFile | null
}

export default function PdfViewer({ file }: Props) {
  if (!file) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-stone-400 border-2 border-dashed border-stone-200 rounded-xl bg-stone-50">
        <svg
          className="w-12 h-12 mb-3 opacity-40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
          <polyline points="14,2 14,8 20,8" />
        </svg>
        <p className="text-sm font-medium">Select a document to preview</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div>
          <h2 className="font-semibold text-stone-900">{file.title}</h2>
          {file.size && <p className="text-xs text-stone-400 mt-0.5">{file.size}</p>}
        </div>
        <a
          href={file.fileUrl}
          download={file.fileName}
          className="flex items-center gap-1.5 text-sm font-medium py-2 px-4 rounded-lg bg-stone-800 text-white hover:bg-stone-700 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 12l-4-4h2.5V3h3v5H12L8 12z" />
            <path d="M3 13h10v1.5H3z" />
          </svg>
          Download
        </a>
      </div>

      <div className="flex-1 min-h-[500px] rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
        <object
          data={file.fileUrl}
          type="application/pdf"
          className="w-full h-full"
          style={{ minHeight: '500px' }}
        >
          <iframe
            src={file.fileUrl}
            className="w-full h-full"
            style={{ minHeight: '500px', border: 'none' }}
            title={file.title}
          >
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-stone-500">
              <p className="mb-3">
                Your browser cannot display this PDF inline.
              </p>
              <a
                href={file.fileUrl}
                download={file.fileName}
                className="text-sm font-medium py-2 px-4 rounded-lg bg-stone-800 text-white hover:bg-stone-700 transition-colors"
              >
                Download PDF
              </a>
            </div>
          </iframe>
        </object>
      </div>
    </div>
  )
}
