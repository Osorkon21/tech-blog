module.exports = {
  format_date: (metadata) => {
    return `Posted by ${metadata.user} on ${metadata.date.toLocaleDateString()}`;
  }
};
