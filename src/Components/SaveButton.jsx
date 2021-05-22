export function SaveButton({ videoId, setModal }) {
  return (
    <div>
      <button
        onClick={() => {
          setModal(true);
        }}
        className="nav-item btn-box"
      >
        <span className=" material-icons-outlined icon-color-gray icon-size-30">
          playlist_add
        </span>

        <div>
          <span className="font-size-5 font-bold-1">SAVE</span>
        </div>
      </button>
    </div>
  );
}
