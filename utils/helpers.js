module.exports = {
  format_date: (dateString) => {
    const createdAt = new Date(dateString);
    return createdAt.toLocaleDateString();
  },
  format_metadata: (username, dateString) => {
    const updatedAt = new Date(dateString);
    return `Posted by ${username} on ${updatedAt.toLocaleDateString()}`;
  }
};
