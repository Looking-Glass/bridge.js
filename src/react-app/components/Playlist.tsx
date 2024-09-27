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
							<div className="flex-container-vertical">
								<UpdateParams
									playlistName={playlist.name}
									parameter="crop_pos_x"
									defaultValue={0}
									min={defaults.CROP_POS_X.min}
									max={defaults.CROP_POS_X.max}
									numberType={defaults.CROP_POS_X.type}
								/>
								<UpdateParams
									playlistName={playlist.name}
									parameter="crop_pos_y"
									defaultValue={0}
									min={defaults.CROP_POS_Y.min}
									max={defaults.CROP_POS_Y.max}
									numberType={defaults.CROP_POS_Y.type}
								/>
								{item.hologram.type == "quilt" && (
									<>
										<UpdateParams
											playlistName={playlist.name}
											parameter="focus"
											min={defaults.FOCUS.min}
											max={defaults.FOCUS.max}
											numberType={defaults.FOCUS.type}
										/>
										<UpdateParams
											playlistName={playlist.name}
											parameter="zoom"
											defaultValue={1}
											min={defaults.ZOOM.min}
											max={defaults.ZOOM.max}
											numberType={defaults.ZOOM.type}
										/>
									</>
								)}
								{item.hologram.type == "rgbd" && (
										<UpdateParams
											playlistName={playlist.name}
											parameter="depthiness"
											min={defaults.DEPTHINESS.min}
											max={defaults.DEPTHINESS.max}
											defaultValue={defaults.DEPTHINESS.defaultValue}
											numberType={defaults.DEPTHINESS.type}
										/>
								)}
								{/* SHARED SETTINGS */}
								<UpdateParams
									playlistName={playlist.name}
									parameter="focus"
									min={defaults.FOCUS.min}
									max={defaults.FOCUS.max}
									defaultValue={defaults.FOCUS.defaultValue}
									numberType={defaults.FOCUS.type}
								/>
								<UpdateParams
									playlistName={playlist.name}
									parameter="zoom"
									min={defaults.ZOOM.min}
									max={defaults.ZOOM.max}
									defaultValue={defaults.ZOOM.defaultValue}
									numberType={defaults.ZOOM.type}
								/>
								<UpdateParams 
									playlistName={playlist.name}
									parameter="crop_pos_x"
									min={defaults.CROP_POS_X.min}
									max={defaults.CROP_POS_X.max}
									defaultValue={defaults.CROP_POS_X.defaultValue}
									numberType={defaults.CROP_POS_X.type}
									/>
								<UpdateParams 
									playlistName={playlist.name}
									parameter="crop_pos_y"
									min={defaults.CROP_POS_Y.min}
									max={defaults.CROP_POS_Y.max}
									defaultValue={defaults.CROP_POS_Y.defaultValue}
									numberType={defaults.CROP_POS_Y.type}
								/>
								<UpdateParams 
									playlistName={playlist.name}
									parameter="gaussian_sigma"
									min={defaults.GAUSSIAN_SIGMA.min}
									max={defaults.GAUSSIAN_SIGMA.max}
									defaultValue={defaults.GAUSSIAN_SIGMA.defaultValue}
									numberType={defaults.GAUSSIAN_SIGMA.type}
								/>
								<UpdateParams 
									playlistName={playlist.name}
									parameter="filter_mode"
									min={defaults.FILTER_MODE.min}
									max={defaults.FILTER_MODE.max}
									defaultValue={defaults.FILTER_MODE.defaultValue}
									numberType={defaults.FILTER_MODE.type}
								/>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
