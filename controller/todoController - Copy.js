var bodyParser = require('body-parser'); 
var mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@ds139942.mlab.com:39942/misheildb');


//Create a schema - this is like a blueprint
var todoSchema =  mongoose.Schema({
 item: String
} ) ;

 var Todo = new mongoose.model('Todo', todoSchema);
// var Todo = new mongoose.model('misheildb', 	ds139942/misheildb);
// var itemOne = Todo({item: 'buy flowers'}).save(function(err){ 
//  if (err) throw err;  
//  console.log('item saved');
// } ) ;



var urlencodedParser = bodyParser.urlencoded({ extended: false }); 

// var data = [{item: 'get milk'},{item: 'walk dog'},{item: 'kick some coding ass'},{item: 'Misho Boulus'}]; 



module.exports = function(app){

app.get ('/todo', function(req, res){
	Todo.find({}, function(err,data){
if(err) throw err;
res.render('todo', {todos: data});
	});

});

app.post('/todo', urlencodedParser , function(req, res){
	var newTodo=Todo(req.body).save(function(err,data){
		if(err) throw err;
	res.json(data);	
	});


});

app.delete('/todo/:item', function(req, res){
	 //delete the requested item from mongodb
 Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
    if (err) throw err;
 
  res.json(data);
 }); 
});

};

