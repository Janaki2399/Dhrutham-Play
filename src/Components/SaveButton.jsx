export function SaveButton({ videoId, setModal }) {
  return (
    <div>
      <button
        onClick={() => {
          setModal(true);
        }}
        class="nav-item btn-box"
      >
        <span class=" material-icons-outlined icon-color-gray icon-size-30">
          playlist_add
        </span>

        <div>
          <span class="font-size-5 font-bold-1">SAVE</span>
        </div>
      </button>
    </div>
  );
}
