const Filter = ({ value, onChange }) => {
  return (
    <>
      <span>filter shown with</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </>
  );
};

export default Filter;
