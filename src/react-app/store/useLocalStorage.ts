import { create } from 'zustand'
import { Hologram } from '../components/HologramForm'
import { StoredHologram } from '../App'

type DBStatus = {
  db: IDBDatabase | null
  initialized: boolean
  available: boolean
  version: number
  defaultModels?: boolean
}

export enum Stores {
  Playlists = 'playlists'
}

export interface LocalStorageState {
  initializeDatabase: () => Promise<boolean>
  dbStatus: DBStatus
  setDBStatus: (dbStatus: DBStatus) => void
  addData: <T>(storeName: string, data: T) => Promise<T | string | null>
  getData: any
  updateData: <T>(storeName: string, key: number, data: T) => Promise<T | number | null>
  saveHologram: (hologram: Hologram) => Promise<StoredHologram>
  loadPlaylist: <T>(storeName: Stores, key: string) => Promise<T>
  loadLibrary: <T>(storeName: Stores) => Promise<T[]>
  deleteData: (storeName: string, key: any) => Promise<void>
  deleteModel: (id: number) => Promise<void>
  setDefaultModels: () => Promise<void>
}

export const useLocalStorage = create<LocalStorageState>((set: any, get: any) => ({
  initializeDatabase: async () => {
    let request: IDBOpenDBRequest
    let db: IDBDatabase
    let version = 1

    const { setDBStatus } = get()

    return new Promise((resolve) => {
      // open the connection
      request = indexedDB.open('myDB')

      request.onupgradeneeded = () => {
        db = request.result

        // if the data object store doesn't exist, create it
        if (!db.objectStoreNames.contains(Stores.Playlists)) {
          console.log('Creating playlist store')
          db.createObjectStore(Stores.Playlists, { keyPath: 'id' })
        }
        // no need to resolve here
      }

      request.onsuccess = () => {
        db = request.result
        version = db.version
        setDBStatus({ available: true, initialized: true, version, db })
        console.log('request.onsuccess - initDB', version)
        resolve(true)
      }

      request.onerror = () => {
        setDBStatus({ available: false, initialized: false, version: 1, db: null })
        resolve(false)
      }
    })
  },

  dbStatus: { initialized: false, available: false, version: 1, db: null },

  setDBStatus: (dbStatus: DBStatus) => {
    set((state: LocalStorageState) => ({
      ...state,
      dbStatus
    }))
  },

  updateData: <T>(storeName: string, key: number, data: T) => {
    return new Promise<T | number | null>((resolve, reject) => {
      const { dbStatus } = get()
      const request = indexedDB.open('myDB', dbStatus.version)

      request.onsuccess = () => {
        console.log('request.onsuccess - updateData', data)
        const db = request.result
        const tx = db.transaction(storeName, 'readwrite')
        const store = tx.objectStore(storeName)

        const updateRequest = store.put({ ...data, id: key })

        updateRequest.onsuccess = () => {
          resolve(data)
        }

        updateRequest.onerror = () => {
          reject('Error updating data in the store')
        }
      }

      request.onerror = () => {
        reject('Error opening the database')
      }
    })
  },

  addData: <T>(storeName: string, data: T) => {
    return new Promise<T | string | null>((resolve, reject) => {
      const { dbStatus } = get()
      const request = indexedDB.open('myDB', dbStatus.version)

      request.onsuccess = () => {
        console.log('request.onsuccess - addData', data)
        const db = request.result
        const tx = db.transaction(storeName, 'readwrite')
        const store = tx.objectStore(storeName)

        const addRequest = store.add(data)

        addRequest.onsuccess = () => {
          resolve(data)
        }

        addRequest.onerror = () => {
          reject('Error adding data to the store')
        }
      }

      request.onerror = () => {
        reject('Error opening the database')
      }
    })
  },

  getData: <T>(storeName: Stores): Promise<T[]> => {
    return new Promise((resolve) => {
      const request = indexedDB.open('myDB')

      request.onsuccess = () => {
        console.log('request.onsuccess - getAllData')
        const db = request.result
        const tx = db.transaction(storeName, 'readonly')
        const store = tx.objectStore(storeName)
        const res = store.getAll()
        res.onsuccess = () => {
          resolve(res.result)
        }
      }
    })
  },
  saveHologram: async (hologram: Hologram): Promise<StoredHologram> => {
    const { addData } = get()
    // we must pass an Id since it's our primary key declared in our createObjectStoreMethod  { keyPath: 'id' }
    const id = Date.now()
  
    try {
      await addData(Stores.Playlists, {
        id,
        hologram
      })
  
      return { id, hologram }
  
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
      } else {
        console.error('Something went wrong')
      }
      throw err // Re-throw the error to be handled by the caller
    }
  },

  loadLibrary: async (storeName: Stores) => {
    const { dbStatus, setDBStatus } = get()
    return new Promise((resolve) => {
      const request = indexedDB.open('myDB')

      request.onsuccess = () => {
        console.log('request.onsuccess - getAllData')
        const db = request.result
        const tx = db.transaction(storeName, 'readonly')
        const store = tx.objectStore(storeName)
        const res = store.getAll()
        res.onsuccess = () => {
          resolve(res.result)

          const data = [
            '/silent_ash.glb',
            '/mech_drone.glb',
            'https://lumalabs.ai/capture/0b2b3881-af79-44fc-9eb3-abb87aab8c8b',
            'https://lumalabs.ai/capture/35f9e19d-7824-4483-809c-479e7d27179c'
          ]

          //@ts-expect-error
          const libraryIds = res.result.map((model: unknown) => model.path)

      
          if (libraryIds.includes(data[0]) && libraryIds.includes(data[1]) && libraryIds.includes(data[2]) && libraryIds.includes(data[3])) {
            console.log('Library already exists')
            setDBStatus({ ...dbStatus, defaultModels: true })
          }
        }
      }
    })
  },

  setDefaultModels: async () => {
    const { addData, loadLibrary, setDBStatus, dbStatus } = get()
    const library = await loadLibrary(Stores.Playlists)
    //@ts-expect-error
    const libraryIds = library.map((model: unknown) => model.path)

    const data = [
      '/silent_ash.glb',
      '/mech_drone.glb',
      'https://lumalabs.ai/capture/0b2b3881-af79-44fc-9eb3-abb87aab8c8b',
      'https://lumalabs.ai/capture/35f9e19d-7824-4483-809c-479e7d27179c'
    ]

    if (libraryIds.includes(data[0]) && libraryIds.includes(data[1]) && libraryIds.includes(data[2]) && libraryIds.includes(data[3])) {
      console.log('Library already exists')
      setDBStatus({ ...dbStatus, defaultModels: true })
    }

    try {
      let id = Date.now() + Math.random()
      await addData(Stores.Playlists, {
        id,
        path: '/silent_ash.glb',
        file: null,
        name: 'Silent Ash',
        extension: '.glb',
        size: '6.19',
        author: 'maxpanysh',
        link: 'https://sketchfab.com/3d-models/silent-ash-bc44272e8c1047148b33c913e659fcfa'
      })
      id = Date.now() + Math.random()
      await addData(Stores.Playlists, {
        id,
        path: '/mech_drone.glb',
        file: null,
        name: 'Mech Drone',
        extension: '.glb',
        size: '4.56',
        author: 'Willy Decarpentrie',
        link: 'https://sketchfab.com/3d-models/mech-drone-8d06874aac5246c59edb4adbe3606e0e'
      })
      id = Date.now() + Math.random()
      await addData(Stores.Playlists, {
        id,
        path: 'https://lumalabs.ai/capture/0b2b3881-af79-44fc-9eb3-abb87aab8c8b',
        file: null,
        name: 'Burg Wernerseck',
        extension: '.luma',
        size: '0',
        author: '@tims_aerial_videos',
        link: 'https://lumalabs.ai/capture/0b2b3881-af79-44fc-9eb3-abb87aab8c8b'
      })
      id = Date.now() + Math.random()
      await addData(Stores.Playlists, {
        id,
        path: 'https://lumalabs.ai/capture/35f9e19d-7824-4483-809c-479e7d27179c',
        file: null,
        name: 'Dominar',
        extension: '.luma',
        size: 0,
        author: '@lohithveer',
        link: 'https://lumalabs.ai/capture/35f9e19d-7824-4483-809c-479e7d27179c'
      })
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
      } else {
        console.error('Something went wrong', err)
      }
    }

    setDBStatus({ ...dbStatus, defaultModels: true })
  },

  loadPlaylist: async (storeName: Stores, key: string) => {
    return new Promise((resolve) => {
      const request = indexedDB.open('myDB')

      request.onsuccess = () => {
        console.log('request.onsuccess - getAllData')
        const db = request.result
        const tx = db.transaction(storeName, 'readonly')
        const store = tx.objectStore(storeName)
        const res = store.get(key)
        res.onsuccess = () => {
          resolve(res.result)
        }
      }
    })
  },

  deleteData: async (storeName: string, key: any) => {
    return new Promise((resolve, reject) => {
      const { dbStatus } = get()
      const request = indexedDB.open('myDB', dbStatus.version)

      request.onsuccess = () => {
        console.log('request.onsuccess - deleteData', key)
        const db = request.result
        const tx = db.transaction(storeName, 'readwrite')
        const store = tx.objectStore(storeName)

        const deleteRequest = store.delete(key)

        deleteRequest.onsuccess = () => {
          resolve()
        }

        deleteRequest.onerror = () => {
          reject('Error deleting data from the store')
        }
      }

      request.onerror = () => {
        reject('Error opening the database')
      }
    })
  },

  deleteModel: async (id: number) => {
    const { deleteData } = get()
    try {
      await deleteData(Stores.Playlists, id)
      console.log(`Model with id ${id} deleted successfully.`)
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
      } else {
        console.error('Something went wrong')
      }
    }
  }
}))
