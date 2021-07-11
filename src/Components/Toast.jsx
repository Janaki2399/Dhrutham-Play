export const Toast = ({ message }) => {
  return (
    <div className="snackbar snackbar-bottom-left" style={{ width: "17rem" }}>
      {message}
    </div>
  );
};
