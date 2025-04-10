import { Playlist } from "@library/index"
import { UpdateParams } from "./updateParams"
import { defaults } from "@library/index"
import { Hologram } from "./HologramForm"
import { StoredHologram } from "../App"

export function PlaylistUI({
	playlist,
	index,
	holograms,
	updateHologram,
}: {
	playlist: Playlist
	index: number
	holograms: StoredHologram[]
	updateHologram: (index: number, hologram: Hologram) => void
}) {
	return (
		<div>
			{holograms[index] && (
				<>
					<h3>Controls</h3>
					<div className="flex-container-vertical">
						{holograms[index].hologram.type === "rgbd" && (
							<UpdateParams
								playlistName={playlist.name}
								parameter="depthiness"
								min={defaults.DEPTHINESS.min}
								max={defaults.DEPTHINESS.max}
								defaultValue={defaults.DEPTHINESS.defaultValue}
								numberType={defaults.DEPTHINESS.type}
								holograms={holograms}
								index={index}
								updateHologram={updateHologram}
							/>
						)}
						{/* SHARED SETTINGS */}
						<UpdateParams
							playlistName={playlist.name}
							parameter="focus"
							min={defaults.FOCUS.min}
							max={defaults.FOCUS.max}
							defaultValue={holograms[index].hologram.settings?.focus ?? defaults.FOCUS.defaultValue}
							numberType={defaults.FOCUS.type}
							holograms={holograms}
							index={index}
							updateHologram={updateHologram}
						/>
						<UpdateParams
							playlistName={playlist.name}
							parameter="aspect"
							min={defaults.ASPECT.min}
							max={defaults.ASPECT.max}
							defaultValue={holograms[index].hologram.settings?.aspect ?? defaults.ASPECT.defaultValue}
							numberType={defaults.ASPECT.type}
							holograms={holograms}
							index={index}
							updateHologram={updateHologram}
						/>
						{/* <UpdateParams
          playlistName={playlist.name}
          parameter="cols"
          min={defaults.COLUMNS.min}
          max={defaults.COLUMNS.max}
          defaultValue={holograms[index].hologram.settings?.columns ?? defaults.COLUMNS.defaultValue}
          numberType={defaults.COLUMNS.type}
         holograms={holograms}
         index={index}
         updateHologram={updateHologram}
        />
        <UpdateParams
          playlistName={playlist.name}
          parameter="rows"
          min={defaults.ROWS.min}
          max={defaults.ROWS.max}
          defaultValue={holograms[index].hologram.settings?.rows ?? defaults.ROWS.defaultValue}
          numberType={defaults.ROWS.type}
         holograms={holograms}
         index={index}
         updateHologram={updateHologram}
        /> */}
						<UpdateParams
							playlistName={playlist.name}
							parameter="zoom"
							min={defaults.ZOOM.min}
							max={defaults.ZOOM.max}
							defaultValue={holograms[index].hologram.settings?.zoom ?? defaults.ZOOM.defaultValue}
							numberType={defaults.ZOOM.type}
							holograms={holograms}
							index={index}
							updateHologram={updateHologram}
						/>
						<UpdateParams
							playlistName={playlist.name}
							parameter="crop_pos_x"
							min={defaults.CROP_POS_X.min}
							max={defaults.CROP_POS_X.max}
							defaultValue={
								holograms[index].hologram.settings?.crop_pos_x ?? defaults.CROP_POS_X.defaultValue
							}
							numberType={defaults.CROP_POS_X.type}
							holograms={holograms}
							index={index}
							updateHologram={updateHologram}
						/>
						<UpdateParams
							playlistName={playlist.name}
							parameter="crop_pos_y"
							min={defaults.CROP_POS_Y.min}
							max={defaults.CROP_POS_Y.max}
							defaultValue={
								holograms[index].hologram.settings?.crop_pos_y ?? defaults.CROP_POS_Y.defaultValue
							}
							numberType={defaults.CROP_POS_Y.type}
							holograms={holograms}
							index={index}
							updateHologram={updateHologram}
						/>
					</div>
				</>
			)}
		</div>
	)
}
