// $(document).on('click','#testButton',function(e){
//       $.ajax({    
//         type: "GET",
//         url: "get-name.php",             
//         dataType: "html",                  
//         success: function(data){                    
//             $("#storedvalue").html(data); 
           
//         }
//     });
// });
$(function (e) {
      $.ajax({    
        type: "GET",
        url: "get-name.php",             
        dataType: "html",                  
        success: function(data){                    
            $("#storedvalue").html(data); 
           
        }
    });
});

