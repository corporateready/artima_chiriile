export type DownloadFile = {
  id: string
  title: string
  description: string
  fileName: string
  fileUrl: string
  size?: string
}

export const downloadFiles: DownloadFile[] = [
  {
    id: 'pdf-ro',
    title: 'Prezentare ARTIMA (RO)',
    description: 'Prezentare generală despre servicii și expertiză — versiunea în română.',
    fileName: 'pdf-ro.pdf',
    fileUrl: '/downloads/pdf-ro.pdf',
  },
  {
    id: 'pdf-ru',
    title: 'Презентация ARTIMA (RU)',
    description: 'Общая презентация об услугах и экспертизе — версия на русском языке.',
    fileName: 'pdf-ru.pdf',
    fileUrl: '/downloads/pdf-ru.pdf',
  },
]
