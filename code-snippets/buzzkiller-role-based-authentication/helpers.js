module.exports = {
  _str: function(str, ...data) {
    return str.replace(/\%(.?)/, function(full, sub) {
      if (full === '%')
        return data[0]
      else if (data[sub - 1])
        return data[sub - 1]
      else
        return full
    })
  }
}