const AddButton = (props) => {
  return (
    <button
      style={{
        filter: "brightness(.8)",
      }}
      {...props}
    >
      +
    </button>
  );
};

export default AddButton;
