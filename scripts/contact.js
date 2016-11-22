

//Contact Form

(function(){
  "use strict";


$(document).ready(function(){
   
   $("#submit-form").on('click',function() { 
        //get input field values
        var user_name       = $('input[name=name]').val(); 
        var user_email      = $('input[name=email]').val();
        var user_phone      = $('input[name=phone]').val();
        var user_message    = $('textarea[name=message]').val();
        
        //simple validation at client's end
         
        var proceed = true;
        if(user_name==""){ 
            $('input[name=name]').css('border-bottom','3px solid #ff7f7f'); 
            proceed = false;
        }
        if(user_email==""){ 
            $('input[name=email]').css('border-bottom','3px solid #ff7f7f'); 
            proceed = false;
        }
        
        if(user_message=="") {  
            $('textarea[name=message]').css('border-bottom','3px solid #ff7f7f'); 
            proceed = false;
        }

        //Proceed if everything is valid.
        if(proceed) 
        {
            //data to be sent to server
            var post_data = {'userName':user_name, 'userEmail':user_email, 'userMessage':user_message};
            
            //Ajax post data to server
            $.post('contact.php', post_data, function(response){  
                
                //load json data from server and output message     
                if(response.type == 'error')
                {
                    var output = '<div class="form-error">'+response.text+'</div>';
                }else{
                
                    var output = '<div class="form-success">'+response.text+'</div>';
                    
                    //reset values in all input fields
                    $('#contact-form input').val(''); 
                    $('#contact-form textarea').val(''); 
                }
                
                $("#notification").hide().html(output).slideDown();
            }, 'json');
            
        }
    });
    
    //reset previously set border colors and hide all message on .keyup()

    $("#contact-form input, #contact-form textarea").keyup(function() { 
        $("#contact-form input, #contact-form textarea").css('border-color',''); 
        $("#notification").slideUp();
    });


});

})();

//Contact Form Ends
