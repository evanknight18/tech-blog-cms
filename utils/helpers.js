const moment = require('moment');

module.exports = {
  formatDate: function (date, format) {
    return moment(date).format(format);
  },
  truncateText: function (text, len) {
    if (text.length > len && text.length > 0) {
      let new_text = text + " ";
      new_text = text.substr(0, len);
      new_text = text.substr(0, new_text.lastIndexOf(" "));
      new_text = (new_text.length > 0) ? new_text : text.substr(0, len);
      return new_text + '...';
    }
    return text;
  },
};
