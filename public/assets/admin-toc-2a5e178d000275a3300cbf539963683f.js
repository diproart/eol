function refresh_toc(){jquery_post(null,"/administrator/table_of_contents/show_tree",$("#edit_toc"))}function toc_move_up(t,e){jquery_post("id="+t+"&top="+e,"/administrator/table_of_contents/move_up",$("#edit_toc"))}function toc_move_down(t,e){jquery_post("id="+t+"&bottom="+e,"/administrator/table_of_contents/move_down",$("#edit_toc"))}function toc_add_sub_chapter(t,e){return input_value=$("#"+e).val(),""===input_value?(alert("You must enter a sub-chapter label"),!1):(jquery_post("label="+input_value+"&parent_id="+t,"/administrator/table_of_contents/create",$("#edit_toc")),void 0)}function toc_add_chapter(t){return input_value=$("#"+t).val(),""===input_value?(alert("You must enter a chapter label"),!1):(jquery_post("label="+input_value+"&parent_id=0","/administrator/table_of_contents/create",$("#edit_toc")),void 0)}function toc_edit_label(t,e){new_html='<input id="toc_edit_label_'+t+'" type="text" size="40" value="'+e+'">',new_html+='<a href="" onclick="submit_new_label('+t+", 'toc_edit_label_"+t+'\'); return false;"><img title="edit" style="float: right;" src="http://160.111.248.28/assets/checked-c6fb74c253537ee97b6b17e5b7d9bb73.png" alt="edit"></a>',$("#toc_label_"+t).html(new_html)}function submit_new_label(t,e){return input_value=$("#"+e).val(),""===input_value?(alert("You must enter a new label"),!1):(jquery_post("id="+t+"&label="+input_value,"/administrator/table_of_contents/update",$("#edit_toc")),void 0)}function jquery_post(t,e,i){$.ajax({url:e,data:t,success:function(t){i.html(t)}})}