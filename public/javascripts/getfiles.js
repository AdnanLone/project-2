
$( "#target" ).click(function() {


$.get('http://localhost:3000/getfiles',function(data){
	console.log('file');


$listSelector = $('#list');

var realArray =$.makeArray(data);
console.log(realArray);

// $.each(realArray,function(i,val){
// 	console.log(val);
	
// 	$listSelector.append('<li>'+ val + '</li>')

// })

$.each(data,function(key,value){
	console.log(key + value);
$listSelector.append('<li>'+ value + '</li>')
})



})

});