export const Toast = ({ message }) => {
  return (
    <div className="snackbar" style={{ width: "17rem" }}>
      {message}
    </div>
  );
};
