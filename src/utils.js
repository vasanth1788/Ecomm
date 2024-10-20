export const getArrayIntoObj = ({ dataList }) => {
  const values = {};
  for (const data of dataList) {
    values[data?.id] = {
      ...data,
    };
  }
  return values;
};
