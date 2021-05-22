import { PlaylistDropDown } from "../PlaylistDropDown";

export function Modal({ videoId, setModal }) {
  return (
    <div className="modal-background">
      <div className="modal-content">
        <div
          className="flex-horizontal border-bottom gray-border center-align space-between"
          style={{ height: "2.5rem" }}
        >
          <div className="padding-left">Save to</div>
          <div>
            <button onClick={() => setModal(false)} className=" btn-box ">
              <span className=" material-icons-outlined icon-color-gray ">
                close
              </span>
            </button>
          </div>
        </div>
        <div>
          <PlaylistDropDown videoId={videoId} setModal={setModal} />
        </div>
      </div>
    </div>
  );
}
