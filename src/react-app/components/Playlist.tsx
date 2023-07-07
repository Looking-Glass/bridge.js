import { Playlist } from "@library/index"
import { UpdateParams } from "./updateParams"
import { defaults } from "@library/index"

export function PlaylistUI({ playlist }: { playlist: Playlist }) {
	return (
		<div>
			{playlist.items.map((item, index) => (
				<div key={index}>
					<hr />
					<div>
						<h3>
							Playlist Item: {item.id} Type: {item.hologram.type} Index: {item.index}
						</h3>
						<div>
							<h3>Controls</h3>
							<div className="flex-container">
								{item.hologram.type == "quilt" && (
									<>
										<UpdateParams
											playlistName={playlist.name}
											parameter="rows"
											min={defaults.QUILT_ROWS.min}
											max={defaults.QUILT_ROWS.max}
											numberType={defaults.QUILT_ROWS.type}
										/>
										<UpdateParams
											playlistName={playlist.name}
											parameter="columns"
											min={defaults.QUILT_COLS.min}
											max={defaults.QUILT_ROWS.max}
											numberType="int"
										/>
										<UpdateParams
											playlistName={playlist.name}
											parameter="aspect"
											min={defaults.ASPECT.min}
											max={defaults.ASPECT.max}
											numberType="float"
										/>
										<UpdateParams
											playlistName={playlist.name}
											parameter="view_count"
											min={defaults.QUILT_VIEW_COUNT.min}
											max={defaults.QUILT_VIEW_COUNT.max}
											numberType="int"
										/>
									</>
								)}
								{item.hologram.type == "rgbd" && (
									<>
										<UpdateParams
											playlistName={playlist.name}
											parameter="depthiness"
											min={defaults.DEPTHINESS.min}
											max={defaults.DEPTHINESS.max}
											numberType="float"
										/>
										<UpdateParams
											playlistName={playlist.name}
											parameter="focus"
											min={defaults.FOCUS.min}
											max={defaults.FOCUS.max}
											numberType="float"
										/>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
