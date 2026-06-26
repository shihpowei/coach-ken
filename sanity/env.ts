export const apiVersion =
<<<<<<< HEAD
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-12-21'
=======
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-12-16'
>>>>>>> 93c6b6d (更新網站 SEO 與內容)

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
