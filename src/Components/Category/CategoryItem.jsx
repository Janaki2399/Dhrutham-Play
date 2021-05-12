import { useNavigate } from "react-router-dom";

export function CategoryItem({ categoryItem, isUserPlayList }) {
  const navigate = useNavigate();
  console.log(categoryItem._id ,categoryItem.list[0]._id);
  return (
    <div
      className="card card-shadow card-vertical"
      onClick={() => {
        navigate(`/categories/${categoryItem._id}/${categoryItem.list[0]._id}`);
      }}
    >
      <div>
        <img
          className="card-img"
          src={categoryItem.thumbnail}
          alt="video-img"
        />
      </div>
      <div className="card-content-padding flex-horizontal space-between">
        <div className="card-title font-size-5 ">{categoryItem.name}</div>
        <div className="card-text font-size-5">
          {categoryItem.list.length} Videos{" "}
        </div>
      </div>
    </div>
  );
}
