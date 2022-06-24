var countryType;
function myFunction(c)
{
    console.log("in index.js c: "+c);
    $.post("country.php",{
        country: c,
    },function(data, status){
        console.log("data: "+data);
    });
}