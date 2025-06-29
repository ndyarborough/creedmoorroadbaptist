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

export function usePageHeader(pageId: string) {
  const [data, setData] = useState<PageHeaderData|null>(null)
  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, 'pageHeaders', pageId))
      console.log(snap)
      if (!snap.exists()) return

      const { header, subheader, imagePath } = snap.data() as {
        header: string
        subheader: string
        imagePath: string
      }

      // imagePath is now a string like "pageHeaders/home.png"
      const url = await getDownloadURL(ref(storage, imagePath))
      setData({ header, subheader, imageUrl: url })
    }
    // setData({header: 'Hey', subheader: 'hey', imageUrl: ''})
    load()
  }, [pageId])

  return data
}
