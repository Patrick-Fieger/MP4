var i = 0;
var x = 0;


function arduino(req,res){
	i++;
}

function einkauf(req,res){
	if(i !== x){
		x = 0;
		i = 0;
		res.send({alert:true}).status(200).end();
	}else{
		res.send({alert:false}).status(200).end();
	}
}

module.exports = {
	arduino : arduino,
	einkauf : einkauf
}