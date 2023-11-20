module.exports = {
  // put whatever helper functions you need here (format dates to MM/DD/YYYY, most likely)
  format_metadata: (metadata) => {
    return `Posted by ${metadata.user} on ${metadata.date.toLocaleDateString()}`;
  }
};
