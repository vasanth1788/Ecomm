const CategoryCard = ({ name, onChangeHandler, value }) => {
  return (
    <div key={name} className="category-card">
      <input
        type="radio"
        value={name}
        id={name}
        onChange={onChangeHandler}
        checked={value === name}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
};

const Category = ({ data, onChangeHandler, value }) => {
  return (
    <>
      {data?.map((name) => (
        <CategoryCard
          key={name}
          name={name}
          onChangeHandler={onChangeHandler}
          value={value}
        />
      ))}
    </>
  );
};

export default Category;
