function dist (lat, lng, lat1, lng1, unit = 'km') {
  try {
    let distance = 0
    try {
      if (typeof lat !== 'number' || typeof lng !== 'number' || typeof lat1 !== 'number' || typeof lng1 !== 'number') {
        throw new Error('Parameter is not a number!')
      } else {
        try {
          distance = calculateDistance(lat, lng, lat1, lng1, unit)
          return (distance)
        } catch (err) {
          return new Error(err.message)
        }
      }
    } catch (err) {
      return ({ status: 'error', message: err.message })
    }
  } catch (err) {
    return err.message
  }
};

function insidePolygon (point, polygon) {
  try {
    if (Array.isArray(point) || Array.isArray(polygon) || point.length === 2) {
      var x = point[0]; var y = point[1]
      var inside = false
      for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        if (!Array.isArray(polygon[i]) || polygon[i].length !== 2) {
          throw new Error('Parameter is not a array!')
        }
        var xi = polygon[i][0]; var yi = polygon[i][1]
        var xj = polygon[j][0]; var yj = polygon[j][1]
        var intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
        if (intersect) inside = !inside
      }
      return inside
    } else {
      throw new Error('Parameter is not a array!')
    }
  } catch (err) {
    return err.message
  }
}

function toRad (degree) {
  return degree / 180 * Math.PI
}

function calculateDistance (lat1, long1, lat2, long2, unit) {
  try {
    let dist
    dist = Math.sin(toRad(lat1)) * Math.sin(toRad(lat2)) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(toRad(long1 - long2))
    dist = Math.acos(dist)
    if (unit === 'km') {
      dist = 6371 * dist
    } else if (unit === 'm') {
      dist = 6371000 * dist
    }
    return {
      string: dist + ' ' + unit,
      number: dist
    }
  } catch (err) {
    return err.message
  }
}
module.exports = { dist, insidePolygon }
