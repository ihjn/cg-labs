/**
 * Created by ihjn on 01.01.2016.
 */
//function calculateCurve(t, a, b, c, d, scale)
//{
//    var x = a*t*Math.cos(t);
//    var y = a*t*Math.sin(t);
//    var z = d-Math.sqrt(x*x+y*y);
//    return [x/scale, y/scale, z/scale];
//}

function calculateCurve2(t, a, b, c, d, scale)
{
    var x = a*Math.cos(t);
    var y = b * sin(t);
    var z = c * t;
    return [x/scale, y/scale, z/scale];
}
/*function calculateCurve(t, a, b, c, d, scale)
 {
 var x = a * cos(t) - b * cos(c * t);
 var y = a*sin(t) - b*sin(c*t);
 var z = d-Math.sqrt(x*x+y*y);
 return [x/scale, y/scale, z/scale];
 }*/
function calculateCurve(t, a, b, c, d, scale)
{
    var x = a * Math.cos(t) - b * Math.cos(c * t);
    var y = a*Math.sin(t) - b*Math.sin(c*t);
    var z = d-Math.sqrt(x*x+y*y);
    return [x/scale, y/scale, z/scale];
}