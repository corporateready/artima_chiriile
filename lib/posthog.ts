// import { usePostHog } from 'posthog-js/react'

// export function useAnalytics() {
//   const posthog = usePostHog()

//   const track = (event: string, properties?: Record<string, any>) => {
//     posthog?.capture(event, properties)
//   }

//   const alias = (pageId: string) => {
//     posthog?.alias(pageId)
//   }

//   const identify = (userId: string, properties?: Record<string, any>) => {
//     posthog?.identify(userId, properties)
//   }

  

//   return { track, identify, alias }
// }