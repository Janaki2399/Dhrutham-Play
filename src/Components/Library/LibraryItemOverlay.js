export function LibraryItemOverlay({categoryItem}){
    return (
        <div
        className="card-icon-topRight full-height white-color"
        style={{
          width: "35%",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <div className="flex-column center-align-ver-hor center-page-align">
          <div>{categoryItem.list.length}</div>
          <div>
            <span class="material-icons-outlined icon-size-30">
              playlist_play
            </span>
          </div>
        </div>
      </div>
    )
}