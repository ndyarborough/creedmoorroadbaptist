// src/hooks/usePageHeader.ts
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { ref, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../lib/firebase'

interface PageHeaderData {
  header: string
  subheader: string
  imageUrl: string
}

interface CachedData {
  data: PageHeaderData
  timestamp: number
}

// Cache key prefixes
const CACHE_KEY_PREFIX = 'pageHeader_'
const STORAGE_URL_PREFIX = 'storageUrl_'

// Cache duration in milliseconds
const CACHE_DURATION = 30 * 60 * 1000
const STORAGE_URL_DURATION = 30 * 60 * 1000 // Reduced to 30 minutes to be safe

// Helper functions for cache management
const getCacheKey = (pageId: string) => `${CACHE_KEY_PREFIX}${pageId}`
const getStorageUrlKey = (imagePath: string) => `${STORAGE_URL_PREFIX}${imagePath}`

const getFromCache = (pageId: string): CachedData | null => {
  try {
    const cached = localStorage.getItem(getCacheKey(pageId))
    return cached ? JSON.parse(cached) : null
  } catch {
    return null
  }
}

const getStorageUrlFromCache = (imagePath: string): string | null => {
  try {
    const cached = localStorage.getItem(getStorageUrlKey(imagePath))
    if (!cached) {
      console.log('No cached URL found for', imagePath)
      return null
    }
    
    const { url, timestamp } = JSON.parse(cached)
    const age = Date.now() - timestamp
    
    if (age > STORAGE_URL_DURATION) {
      console.log(`Cached URL expired for ${imagePath} (age: ${Math.round(age / 60000)}min)`)
      localStorage.removeItem(getStorageUrlKey(imagePath))
      return null
    }
    
    console.log(`Using cached URL for ${imagePath} (age: ${Math.round(age / 60000)}min)`)
    return url
  } catch (error) {
    console.error('Error reading cached URL:', error)
    return null
  }
}

const saveToCache = (pageId: string, data: PageHeaderData) => {
  try {
    const cacheData: CachedData = {
      data,
      timestamp: Date.now()
    }
    localStorage.setItem(getCacheKey(pageId), JSON.stringify(cacheData))
    console.log('Saved page data to cache for', pageId)
  } catch (error) {
    console.warn('Failed to save to cache:', error)
  }
}

const saveStorageUrlToCache = (imagePath: string, url: string) => {
  try {
    const cacheData = {
      url,
      timestamp: Date.now()
    }
    localStorage.setItem(getStorageUrlKey(imagePath), JSON.stringify(cacheData))
    console.log('Saved storage URL to cache for', imagePath)
  } catch (error) {
    console.warn('Failed to save storage URL to cache:', error)
  }
}

const isCacheValid = (cached: CachedData): boolean => {
  const age = Date.now() - cached.timestamp
  const isValid = age < CACHE_DURATION
  console.log(`Cache age: ${Math.round(age / 60000)}min, valid: ${isValid}`)
  return isValid
}

// Clear expired cache entries
const clearExpiredCache = () => {
  try {
    const keys = Object.keys(localStorage)
    const now = Date.now()
    let cleared = 0
    
    keys.forEach(key => {
      if (key.startsWith(CACHE_KEY_PREFIX) || key.startsWith(STORAGE_URL_PREFIX)) {
        try {
          const cached = JSON.parse(localStorage.getItem(key) || '{}')
          if (cached.timestamp) {
            const duration = key.startsWith(STORAGE_URL_PREFIX) ? STORAGE_URL_DURATION : CACHE_DURATION
            if (now - cached.timestamp > duration) {
              localStorage.removeItem(key)
              cleared++
            }
          }
        } catch {
          localStorage.removeItem(key)
          cleared++
        }
      }
    })
    
    if (cleared > 0) {
      console.log(`Cleared ${cleared} expired cache entries`)
    }
  } catch (error) {
    console.warn('Failed to clear expired cache:', error)
  }
}

export function usePageHeader(pageId: string) {
  const [data, setData] = useState<PageHeaderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(null)

        console.log(`Loading page header for: ${pageId}`)

        // Check cache first
        const cached = getFromCache(pageId)
        
        if (cached && isCacheValid(cached)) {
          console.log('Using cached page data for', pageId)
          console.log('Cached image URL:', cached.data.imageUrl)
          
          // Test if the cached image URL is still valid
          const img = new Image()
          img.onload = () => console.log('✅ Cached image URL is valid')
          img.onerror = () => {
            console.log('❌ Cached image URL is invalid, clearing cache and refetching')
            pageHeaderCache.clear(pageId)
            // Trigger a re-fetch by calling load again
            load()
            return
          }
          img.src = cached.data.imageUrl
          
          setData(cached.data)
          setLoading(false)
          return
        }

        console.log('Fetching fresh data for', pageId)
        const snap = await getDoc(doc(db, 'pageHeaders', pageId))
        
        if (!snap.exists()) {
          console.log('No document found for', pageId)
          setData(null)
          setLoading(false)
          return
        }

        const docData = snap.data() as {
          header: string
          subheader: string
          imagePath: string
        }
        
        console.log('Document data:', docData)

        const { header, subheader, imagePath } = docData

        // Check if we have the URL cached separately
        const cachedUrl = getStorageUrlFromCache(imagePath)
        let url = cachedUrl

        if (!url) {
          console.log('Fetching fresh storage URL for', imagePath)
          try {
            url = await getDownloadURL(ref(storage, imagePath))
            console.log('Got storage URL:', url.substring(0, 100) + '...')
            saveStorageUrlToCache(imagePath, url)
          } catch (storageError) {
            console.error('Failed to get storage URL:', storageError)
            throw new Error(`Failed to load image: ${storageError}`)
          }
        }

        const pageData = { header, subheader, imageUrl: url }
        console.log('Final page data:', { ...pageData, imageUrl: pageData.imageUrl.substring(0, 100) + '...' })

        // Cache the result
        saveToCache(pageId, pageData)

        setData(pageData)
      } catch (err) {
        console.error('Error in usePageHeader:', err)
        setError(err instanceof Error ? err : new Error('Failed to load page header'))
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [pageId])

  // Clear expired cache on mount
  useEffect(() => {
    clearExpiredCache()
  }, [])

  return { data, loading, error }
}

// Export utility functions for manual cache management
export const pageHeaderCache = {
  clear: (pageId?: string) => {
    if (pageId) {
      localStorage.removeItem(getCacheKey(pageId))
      console.log('Cleared cache for', pageId)
    } else {
      // Clear all page header cache
      const keys = Object.keys(localStorage)
      let cleared = 0
      keys.forEach(key => {
        if (key.startsWith(CACHE_KEY_PREFIX)) {
          localStorage.removeItem(key)
          cleared++
        }
      })
      console.log(`Cleared ${cleared} page header cache entries`)
    }
  },
  
  clearStorageUrls: (imagePath?: string) => {
    if (imagePath) {
      localStorage.removeItem(getStorageUrlKey(imagePath))
      console.log('Cleared storage URL cache for', imagePath)
    } else {
      // Clear all storage URL cache
      const keys = Object.keys(localStorage)
      let cleared = 0
      keys.forEach(key => {
        if (key.startsWith(STORAGE_URL_PREFIX)) {
          localStorage.removeItem(key)
          cleared++
        }
      })
      console.log(`Cleared ${cleared} storage URL cache entries`)
    }
  },
  
  clearAll: () => {
    const keys = Object.keys(localStorage)
    let cleared = 0
    keys.forEach(key => {
      if (key.startsWith(CACHE_KEY_PREFIX) || key.startsWith(STORAGE_URL_PREFIX)) {
        localStorage.removeItem(key)
        cleared++
      }
    })
    console.log(`Cleared ${cleared} total cache entries`)
  },
  
  clearExpired: clearExpiredCache,
  
  preload: async (pageId: string) => {
    console.log('Preloading not implemented yet')
  }
}