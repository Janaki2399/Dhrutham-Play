export function RemoveButton({ id, removeItem }) {
  return (
    <div>
      <button onClick={(e) => removeItem(e, id)} className="icon-btn btn-box">
        <span className=" material-icons-outlined icon-color-gray ">
          delete
        </span>
      </button>
    </div>
  );
}
