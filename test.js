var geo = require('./')
const lat1 = 47.91844; const lng1 = 106.88467; const lat2 = 47.90068; const lng2 = 106.87918
const unit = 'km'
let dist = 0
try {
    dist = geo.dist(lat1, lng1, lat2, lng2, unit)
} catch (err){
    console.log(err.message)
}
console.log(dist)

var polygon = [[1, 1], [1, 2], [2, 2], [2, 1]]
let insidePolygon = false
try {
    insidePolygon = geo.insidePolygon([3.5, 1.5], polygon)
} catch (err){
    console.log(err.message, 'sdf')
}
console.log(insidePolygon)
