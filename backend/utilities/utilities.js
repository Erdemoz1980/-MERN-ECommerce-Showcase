const sanitizeString = (input) => {
  //remove all characters that are not letters, numbers, spaces, or underscores
  return input.replace(/[^\w\s]/gi, '');
}

module.exports = { sanitizeString };