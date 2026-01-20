// 'use client'

// import { useEffect, useState } from 'react'
// import { usePathname } from 'next/navigation'

// interface ClientIdProviderProps {
//   children: React.ReactNode
//   randomId: string
// }

// // Клиентская функция для генерации ID
// function generateClientId(): string {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   let result = ''
  
//   for (let i = 0; i < 12; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length))
//   }
  
//   const timestamp = Date.now().toString(36)
//   return `${result}-${timestamp}`
// }

// export default function ClientIdProvider({ children, randomId }: ClientIdProviderProps) {
//   const pathname = usePathname()
//   const [currentPath, setCurrentPath] = useState<string>('')

//   useEffect(() => {
//     // При первой загрузке используем серверный ID
//     if (typeof window !== 'undefined' && !currentPath) {
//       window.randomId = randomId
//       setCurrentPath(pathname)
//       console.log('Initial random ID (server):', randomId)
//       console.log('Current path:', pathname)
//     }
//   }, [randomId, currentPath, pathname])

//   useEffect(() => {
//     // При изменении пути генерируем новый ID
//     if (currentPath && currentPath !== pathname) {
//       const newId = generateClientId()
//       if (typeof window !== 'undefined') {
//         window.randomId = newId
//         console.log('New random ID (client):', newId)
//         console.log('Path changed to:', pathname)
        
//         // Диспатчим кастомное событие для уведомления других компонентов
//         window.dispatchEvent(new CustomEvent('randomIdUpdated', { 
//           detail: { newId, pathname } 
//         }))
//       }
//       setCurrentPath(pathname)
//     }
//   }, [pathname, currentPath])

//   return <>{children}</>
// }