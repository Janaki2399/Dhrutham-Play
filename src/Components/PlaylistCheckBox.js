import { useDataContext } from "../contexts/data-context";
export function PlaylistCheckBox({ item, index, videoId, setCheckBox }) {
  const { dispatch, state } = useDataContext();

  const handleToggle = (i)=> {
    setCheckBox((prev) =>
      prev.map((item, index) =>
        index === i ? { ...item, checked: !item.checked } : item
      )
    );
  }

  const toggleCheckBox = (event) =>{
    handleToggle(index);
    if (event.target.checked) {
      dispatch({
        type: "APPEND_TO_PLAYLIST",
        payload: { videoId, playlistId: item.id },
      });
    } else {
      dispatch({
        type: "REMOVE_ITEM_FROM_PLAYLIST",
        payload: { videoId, playlistId: item.id },
      });
    }
  }
  return (
    <div className="flex-horizontal margin-top cursor-pointer">
      <input
        type="checkbox"
        id={item.id}
        className="margin-right checkbox-size"
        checked={item.checked}
        onChange={toggleCheckBox}
      />
      <label className="full-width font-size-5" for={item.id}>
        {item.name}
      </label>
    </div>
  );
}
