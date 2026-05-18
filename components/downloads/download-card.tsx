'use client'

import { DownloadFile } from '@/content/downloads'

type Props = {
  file: DownloadFile
  isActive: boolean
  onSelect: () => void
}

export default function DownloadCard({ file, isActive, onSelect }: Props) {
  return (
    <div
      className={`rounded-xl border p-4 transition-all cursor-pointer ${
        isActive
          ? 'border-stone-800 bg-stone-50 shadow-md'
          : 'border-stone-200 bg-white hover:border-stone-400 hover:shadow-sm'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-stone-900 text-sm leading-snug truncate">
            {file.title}
          </h3>
          <p className="mt-1 text-xs text-stone-500 leading-relaxed line-clamp-2">
            {file.description}
          </p>
        </div>

        <div className="flex-shrink-0">
          <svg
            className="w-8 h-8 text-red-500"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
            <path d="M14 2v6h6" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <text x="6" y="18" fontSize="5" fill="white" fontWeight="bold">PDF</text>
          </svg>
        </div>
      </div>

      {file.size && (
        <div className="mt-2">
          <span className="inline-block text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
            {file.size}
          </span>
        </div>
      )}

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onSelect()
          }}
          className={`flex-1 text-xs font-medium py-1.5 px-3 rounded-lg transition-colors ${
            isActive
              ? 'bg-stone-800 text-white'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          {isActive ? 'Previewing' : 'Preview'}
        </button>

        <a
          href={file.fileUrl}
          download={file.fileName}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-xs font-medium py-1.5 px-3 rounded-lg bg-stone-800 text-white hover:bg-stone-700 transition-colors"
        >
          <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 12l-4-4h2.5V3h3v5H12L8 12z" />
            <path d="M3 13h10v1.5H3z" />
          </svg>
          Download
        </a>
      </div>
    </div>
  )
}
