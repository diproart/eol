function check_username(){name=$("#user_username").val(),name.length>0&&$.ajax({url:"/account/check_username/",data:{username:$("#user_username").val()}})}function check_email(){$.ajax({url:"/account/check_email/",data:{email:$("#user_email").val()}})}function check_passwords(){$("#password_warn").html(""),$("#user_entered_password").val()!=$("#user_entered_password_confirmation").val()&&$("#password_warn").html("passwords must match")}$(document).ready(function(){$("#user_entered_password").attr("value",""),$("#user_entered_password_confirmation").attr("value","");var e=$("input#curator_request");e.length>0&&($("input#curator_request").attr("checked")?$("#curator_request_options").slideDown():$("#curator_request_options").slideUp()),$("input#curator_request").on("click",function(){$(this).attr("checked")?$("#curator_request_options").slideDown():$("#curator_request_options").slideUp()})});