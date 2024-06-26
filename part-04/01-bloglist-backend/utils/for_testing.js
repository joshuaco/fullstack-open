const reverse = (string) => {
  return string.split('').reverse().join('');
};

const average = (array) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
};

module.exports = { reverse, average };
