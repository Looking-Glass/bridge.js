// PlaylistImporter.tsx
import React, { useRef, useState, FormEvent } from "react"
import { useLocalStorage } from "../store/useLocalStorage"
import { Stores } from "../store/useLocalStorage"

interface PlaylistImporterProps {
	onImport: () => void
}

export const PlaylistImporter: React.FC<PlaylistImporterProps> = ({ onImport }) => {
	const importPlaylistData = useLocalStorage((state) => state.importPlaylistData)
	const loadLibrary = useLocalStorage((state) => state.loadLibrary)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [importStatus, setImportStatus] = useState<string>("")

	const handleImport = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!fileInputRef.current || !fileInputRef.current.files || fileInputRef.current.files.length === 0) {
			setImportStatus("Please select a file to import")
			return
		}

		const file = fileInputRef.current.files[0]
		const reader = new FileReader()

		reader.onload = async (event: ProgressEvent<FileReader>) => {
			try {
				if (!event.target || typeof event.target.result !== "string") {
					setImportStatus("Error reading file contents")
					return
				}

				const jsonData = event.target.result
				setImportStatus("Importing data...")

				const success = await importPlaylistData(jsonData)

				if (success) {
					setImportStatus("Import successful! Reloading library...")
					// Refresh the data
					await loadLibrary(Stores.Playlists)
					setTimeout(() => {
						onImport()
						setImportStatus("Import completed")
					}, 2000)
				} else {
					setImportStatus("Import failed. Please check the file format.")
				}
			} catch (error) {
				console.error("Error importing data:", error)
				setImportStatus("Error importing data. Please check the console for details.")
			}
		}

		reader.onerror = () => {
			setImportStatus("Error reading file")
		}

		reader.readAsText(file)
	}

	return (
        <div className="playlist-importer">
        <form onSubmit={handleImport}>
          <div className="flex flex-row items-center gap-2">
            <input type="file" ref={fileInputRef} accept=".json" />
            <button type="submit">Import Playlist</button>
          </div>
        </form>
        {importStatus && <p className="status-message">{importStatus}</p>}
      </div>
	)
}

