module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  format_metadata: (metadata) => {
    return `Posted by ${metadata.user} on ${metadata.date.toLocaleDateString()}`;
  }
};
