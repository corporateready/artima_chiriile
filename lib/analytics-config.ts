// declare global {
//   interface Window {
//     roistat?: any
//     posthog?: any
//     analyticsReady?: boolean
//   }
// }

// export const initAnalyticsSequence = () => {
//   if (typeof window === 'undefined' || window.analyticsReady) return

//   const roistatScript = document.createElement('script')
//   roistatScript.src = 'https://cloud.roistat.com/api/site/1.0/YOUR_PROJECT_ID/init'
//   roistatScript.async = true

//   roistatScript.onload = () => {
//     console.log('Roistat loaded, now loading PostHog...')

//     // Проверяем, что Roistat действительно инициализирован
//     const checkRoistatReady = () => {
//       if (window.roistat && typeof window.roistat.setRoistatParams === 'function') {
//         // Roistat готов, запускаем PostHog
//         initPostHog()
//       } else {
//         // Повторяем проверку через 100ms
//         setTimeout(checkRoistatReady, 100)
//       }
//     }

//     checkRoistatReady()
//   }

//   roistatScript.onerror = () => {
//     console.warn('Roistat failed to load, initializing PostHog anyway')
//     initPostHog()
//   }

//   document.head.appendChild(roistatScript)
// }

// const initPostHog = () => {
//   import('posthog-js').then((posthog) => {
//     posthog.default.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
//       api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
//       loaded: () => {
//         window.analyticsReady = true
//         console.log('Analytics sequence completed')
//       }
//     })
//   })
// }