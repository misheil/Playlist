$(document).ready(function(){

  $('#subButton').on('click', function(){
      var item = $('#myTodo');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
      return false;
  });



  $('li').on('click', function(){
    
      var item = $(this).text().trim().replace(/ /g, "-");
      
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,

         success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
