function getVal(currentPage, limit, totalData) {
  const dataLength = totalData;
  const skip = currentPage * limit;
  const startIndex = skip - limit;
  const arrays = Array.from({ length: dataLength }, (v, i) => i + 1);
  return arrays.slice(startIndex, skip);
}
