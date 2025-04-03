import { Playlist } from "@library/index"
import { UpdateParams } from "./updateParams"
import { defaults } from "@library/index"
import { Hologram } from "./HologramForm"

export function PlaylistUI({
  playlist,
  hologram,
  setHologram,
}: {
  playlist: Playlist
  hologram: Hologram
  setHologram: (hologram: Hologram) => void
}) {
  return (
    <div>
      <h3>Controls</h3>
      <div className="flex-container-vertical">
        {hologram.type === "rgbd" && (
          <UpdateParams
            playlistName={playlist.name}
            parameter="depthiness"
            min={defaults.DEPTHINESS.min}
            max={defaults.DEPTHINESS.max}
            defaultValue={defaults.DEPTHINESS.defaultValue}
            numberType={defaults.DEPTHINESS.type}
            hologram={hologram}
            setHologram={setHologram}
          />
        )}
        {/* SHARED SETTINGS */}
        <UpdateParams
          playlistName={playlist.name}
          parameter="focus"
          min={defaults.FOCUS.min}
          max={defaults.FOCUS.max}
          defaultValue={hologram.settings?.focus ?? defaults.FOCUS.defaultValue}
          numberType={defaults.FOCUS.type}
          hologram={hologram}
          setHologram={setHologram}
        />
        <UpdateParams
          playlistName={playlist.name}
          parameter="aspect"
          min={defaults.ASPECT.min}
          max={defaults.ASPECT.max}
          defaultValue={hologram.settings?.aspect ?? defaults.ASPECT.defaultValue}
          numberType={defaults.ASPECT.type}
          hologram={hologram}
          setHologram={setHologram}
        />
        {/* <UpdateParams
          playlistName={playlist.name}
          parameter="cols"
          min={defaults.COLUMNS.min}
          max={defaults.COLUMNS.max}
          defaultValue={hologram.settings?.columns ?? defaults.COLUMNS.defaultValue}
          numberType={defaults.COLUMNS.type}
          hologram={hologram}
          setHologram={setHologram}
        />
        <UpdateParams
          playlistName={playlist.name}
          parameter="rows"
          min={defaults.ROWS.min}
          max={defaults.ROWS.max}
          defaultValue={hologram.settings?.rows ?? defaults.ROWS.defaultValue}
          numberType={defaults.ROWS.type}
          hologram={hologram}
          setHologram={setHologram}
        /> */}
        <UpdateParams
          playlistName={playlist.name}
          parameter="zoom"
          min={defaults.ZOOM.min}
          max={defaults.ZOOM.max}
          defaultValue={hologram.settings?.zoom ?? defaults.ZOOM.defaultValue}
          numberType={defaults.ZOOM.type}
          hologram={hologram}
          setHologram={setHologram}
        />
        <UpdateParams
          playlistName={playlist.name}
          parameter="crop_pos_x"
          min={defaults.CROP_POS_X.min}
          max={defaults.CROP_POS_X.max}
          defaultValue={hologram.settings?.crop_pos_x ?? defaults.CROP_POS_X.defaultValue}
          numberType={defaults.CROP_POS_X.type}
          hologram={hologram}
          setHologram={setHologram}
        />
        <UpdateParams
          playlistName={playlist.name}
          parameter="crop_pos_y"
          min={defaults.CROP_POS_Y.min}
          max={defaults.CROP_POS_Y.max}
          defaultValue={hologram.settings?.crop_pos_y ?? defaults.CROP_POS_Y.defaultValue}
          numberType={defaults.CROP_POS_Y.type}
          hologram={hologram}
          setHologram={setHologram}
        />
      </div>
    </div>
  )
}