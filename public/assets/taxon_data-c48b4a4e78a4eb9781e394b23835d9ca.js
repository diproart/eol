if(!EOL)var EOL={};var _TOOLTIP_OPEN=!1;EOL.max_meta_rows=10,EOL.switch_subtab=function(e){$(".about_subtab").hide(),$(".glossary_subtab").hide(),$(".ranges_subtab").hide(),$(".info").hide(),e.parent().hasClass("about")||e.parent().hasClass("glossary")||e.parent().hasClass("ranges")?(EOL.hide_data_tables($("table.data")),$("#taxon_data .empty").hide(),$(".glossary_subtab").hide(),$(".help_text").hide(),$(".filters").hide(),e.parent().hasClass("about")?$(".about_subtab").show():e.parent().hasClass("glossary")?($(".glossary_subtab").show(),$(".glossary_subtab .help_text").show()):e.parent().hasClass("ranges")&&($(".ranges_subtab").show(),$(".ranges_subtab .help_text").show())):e.parent().hasClass("all")?($(".filters").show(),$("#taxon_data .empty").show(),$("#taxon_data > .help_text").show(),EOL.show_data_tables($("table.data"))):($(".filters").show(),EOL.hide_data_tables($("table.data")),EOL.show_data_tables($('table.data[data-toc-id="'+e.data("toc-id")+'"]')),$("#taxon_data > .help_text").show()),e.parent().parent().find("li").removeClass("active"),e.parent().addClass("active"),$("table.data tr.open").removeClass("open"),$("table.data .fold img").attr("src","http://10.252.248.38:8081//assets/arrow_fold_right-3bc349c6c72c8ea43caad0b1c2be7185.png"),$("table.meta").hide(),EOL.limit_data_rows()},EOL.create_info_dialog=function(e){var t=$(e).closest("[id]"),i=t.attr("id");$(e).parent().children(".info_icon").remove(),$(e).attr("id","info_"+i).before('<a id="tip_'+i+'" class="info_icon def" data-info="'+i+'">&emsp;</a>').addClass("tip").prepend('<a href="#" class="close">&nbsp;</a>'),EOL.enable_info_dialogs($("#tip_"+i),$("table.data tr.data, table.meta tr")),EOL.enable_data_tab_glossary_links($(e)),$(e).appendTo(document.body)},EOL.create_info_dialog_for_data_search=function(e){var t=$(e).closest("[id]"),i=t.attr("id");$(e).parent().children(".info_icon").remove(),$(e).attr("id","info_"+i).before('<a id="tip_'+i+'" class="info_icon def" data-info="'+i+'">&emsp;</a>').addClass("tip").prepend('<a href="#" class="close">&nbsp;</a>'),EOL.enable_info_dialogs($("#tip_"+i)),EOL.enable_data_tab_glossary_links($(e)),$(e).appendTo(document.body)},EOL.create_info_ranges_dialog=function(e){var t=$(e).closest("[id]"),i=t.attr("id");$(e).attr("id","info_"+i).addClass("tip").prepend('<a href="#" class="close">&nbsp;</a>').append($(e).parent().parent().children("ul.glossary")),$(e).parent().parent().append('<a id="tip_'+i+'" class="info_icon def" data-info="'+i+'">&emsp;</a>'),EOL.enable_info_dialogs($("#tip_"+i),$("table.ranges tr")),EOL.enable_data_tab_glossary_links($(e)),$(e).parent().parent().children("ul.glossary").remove(),$(e).appendTo(document.body)},EOL.create_collection_taxon_info_dialog=function(e){var t=$(e).closest("[id]"),i=t.attr("id");$(e).attr("id","info_"+i).addClass("tip").prepend('<a href="#" class="close">&nbsp;</a>'),$(e).parent().parent().append('<a id="tip_'+i+'" class="info_icon def" data-info="'+i+'">&emsp;</a>'),EOL.enable_collection_taxa_info_dialogs($("#tip_"+i),$("table.taxon_collection tr")),$(e).parent().parent().children("ul.glossary").remove(),$(e).appendTo(document.body)},EOL.enable_collection_taxa_info_dialogs=function(e,t){e.unbind("click").on("click",function(){$(".site_column").unbind("click");var e=($(this),$("#info_"+$(this).data("info")));if(e.is(":visible"))e.hide("fast");else{$(".info_icon.tip").hide("fast");var t=$(this).offset();e.css({top:t.top+$(this).height()+26,left:t.left+$(this).width()}),$.ajax({url:"/collections/get_uri_name",type:"GET",data:{id:$(this).data("info").split(/[_]+/).pop()},complete:function(){},success:function(t){e.show("fast",function(){$(".site_column").on("click",function(){$(".info_icon").hide("fast"),$(".site_column").unbind("click")})}).find("a.close").on("click",function(){return $(".info_icon").hide("fast"),!1}),e.html('<div style="color:#616e7a; font-size:1.1em">'+t.name+'</div><div style="color:#93a4b0">'+t.uri+"</div>")},error:function(){}})}}),EOL.info_icon_mouse_hover(t)},EOL.enable_data_tab_glossary_links=function(e){e.closest("#taxon_data.main_container").length>0&&(e.find("a.glossary").each(function(){$(this).text($(this).data("tab_link_message"))}),e.find("a.glossary").on("click",function(e){e.preventDefault();var t=$(this);t.closest(".info").hide(),$("#tabs_sidebar li.glossary a").trigger("click"),setTimeout(function(){$("html,body").animate({scrollTop:$("#"+t.data("anchor")).offset().top},500)},100)}))},EOL.enable_info_dialogs=function(e,t){e.unbind("click").on("click",function(e){e.stopPropagation(),$(".site_column").unbind("click");var t=($(this),$("#info_"+$(this).data("info")));if(t.is(":visible"))t.hide("fast");else{$(".info.tip").hide("fast");var i=$(this).offset();t.css({top:i.top+$(this).height()+26,left:i.left+$(this).width()}),t.show("fast",function(){$(".site_column").on("click",function(){$(".info").hide("fast"),$(".site_column").unbind("click")})}).find("a.close").on("click",function(){return $(".info").hide("fast"),!1})}}),EOL.info_icon_mouse_hover(t)},EOL.info_icon_mouse_hover=function(e){$(e).hover(function(){$(this).find(".info_icon.def").addClass("active")},function(){$(this).find(".info_icon").removeClass("active")})},EOL.enable_button=function(e){e.is(":disabled")&&e.removeAttr("disabled").fadeTo(225,1)},EOL.disable_button=function(e){e.is(":disabled")||e.attr("disabled",!0).fadeTo(225,.3)},EOL.attribute_is_not_okay=function(){$("input.predicate_autocomplete").addClass("problems"),$("#new_uri_warning").show(),EOL.disable_measurement_input()},EOL.attribute_is_okay=function(){$("input.predicate_autocomplete").removeClass("problems"),$("#new_uri_warning").hide(),"measurement"==$("#predicate_uri_type").val()&&""!==$(".predicate_autocomplete").val()?$("fieldset.unit_of_measure").fadeIn(100):EOL.disable_measurement_input()},EOL.disable_measurement_input=function(){$("fieldset.unit_of_measure").fadeOut(100),$("fieldset.unit_of_measure input").val("")},EOL.hide_data_tables=function(e){e.hide(),e.prev("div.header_underlined").hide()},EOL.show_data_tables=function(e){e.show(),e.prev("div.header_underlined").show(),e.find("tr.data").show(),e.find("tr.actions").hide(),$("#curation_legend.help_text").show()},EOL.toggle_actions_row=function(e){var t=e.find(".fold img"),i=e.next(),n=(i.children("td"),e.next().find("table.meta"));if(t.parent().attr({title:"translation missing: en.data_row_additional_detail_assistive_js"}),i.is(":visible"))t.attr({src:"http://10.252.248.38:8081//assets/arrow_fold_right-3bc349c6c72c8ea43caad0b1c2be7185.png",alt:"translation missing: en.data_row_additional_detail_show_alt"}),i.hide(),n.hide();else{{e.attr("id")}t.attr({src:"http://10.252.248.38:8081//assets/arrow_fold_down-ce6a0365044544012bac4a6db35da012.png",alt:"translation missing: en.data_row_additional_detail_hide_alt"}),i.show(),n.show()}},EOL.sort_glossary=function(e,t){return $(t).find("dt").text()<$(e).find("dt").text()?1:-1},EOL.enable_suggestions_hover=function(){$("input.predicate_autocomplete").parent().hover(function(){$("ul.ui-autocomplete").is(":visible")||""!==$("input.predicate_autocomplete").val()?$("div#suggestions").hide():$("div#suggestions").show()},function(){$("div#suggestions").hide()})},EOL.disable_suggestions_hover=function(){$("input.predicate_autocomplete").parent().unbind("hover")},EOL.update_input_id_and_name=function(e,t){e.find("input").each(function(){$(this).attr("id",$(this).attr("id").replace(/\d+/,t)),$(this).attr("name",$(this).attr("name").replace(/\d+/,t)),$(this).data("id-element")&&$(this).data("id-element",$(this).data("id-element").replace(/\d+/,t)),$(this).data("include-predicate_known_uri_id")&&$(this).data("include-predicate_known_uri_id",$(this).data("include-predicate_known_uri_id").replace(/\d+/,t)),$(this).attr("data-update-elements")&&$(this).attr("data-update-elements",$(this).attr("data-update-elements").replace(/\d+/,t))})},EOL.limit_data_rows=function(){$("table.data tr.more").remove(),$("table.data tr.data.first_of_type:visible").each(function(){var e=$(this).data("type"),t=$(this).closest("table").find('tr[data-type="'+e+'"]:visible');if(t.length>EOL.max_meta_rows){var i=1;t.each(function(){i>EOL.max_meta_rows&&$(this).hide(),i++}),t.filter(":last").after('<tr data-type="'+e+'" class="data nested more"><th></th><td><a href="#" class="more">'+$("table.data").data("more").replace("NNN",t.length-EOL.max_meta_rows)+"</a></td><td></td><td></td></tr>"),$("tr.more a.more").unbind("click").on("click",function(){var e=$(this).closest("tr");return $('tr.data[data-type="'+e.data("type")+'"]').show(),e.remove(),!1})}})},EOL.yank_glossary_terms=function(){},EOL.enable_hover_list_items=function(){$("ul.glossary li").hover(function(){$(this).find("li.hover").show()},function(){$(this).find("li.hover").hide()})},EOL.update_unit_select_options=function(e){$.ajax({url:"/known_uris/autocomplete_known_uri_units?predicate_known_uri_id="+e,dataType:"json",success:function(e){$("select#unit").find("option:gt(0)").remove(),$.each(e,function(e,t){$("select#unit").append($("<option></option>").attr("value",t.uri).text(t.value))})}})},$(function(){if($("table.data tr.actions").hide().prev().find(".fold img").attr("src","http://10.252.248.38:8081//assets/arrow_fold_right-3bc349c6c72c8ea43caad0b1c2be7185.png"),$(".has_many").each(function(){var e=$(this).clone();e.find(".once").remove();var t=$(this).closest("form").find("input[id^=user_added_data_user_added_data_metadata_attributes]").filter(":last"),i=parseInt(t.attr("id").match(/(\d+)/)[1]);EOL.update_input_id_and_name(e,i+=1),e.appendTo($(this)).addClass("subform").hide(),$(this).append('<span class="add"><a href="#">'+$(this).data("another")+"</a></span>"),$(this).find(".add a").on("click",function(){e.clone().insertBefore($(this).parent()).show(),EOL.update_input_id_and_name(e,i+=1);var t=$(".has_many_expandable").height();return $(".has_many_expandable").height(t+e.height()),!1})}),$("div#suggestions").appendTo($("input.predicate_autocomplete").parent()),$("input.predicate_autocomplete").keyup(function(e){var t=e.keyCode||e.which;if(13!==t){var i=$(this);""!==i.val()&&$("div#suggestions").hide(),""!==$("input.predicate_known_uri_id").val()&&($("input.predicate_known_uri_id").val(""),EOL.attribute_is_not_okay()),""===i.val()||""!==$("input.predicate_known_uri_id").val()?EOL.attribute_is_okay():EOL.attribute_is_not_okay()}}).focus(function(){""===$(this).val()&&$("div#suggestions").show()}),EOL.enable_suggestions_hover(),$("fieldset.unit_of_measure").hide(),$("table.data .fold a").on("click",function(){return $(this).closest("tr").click(),!1}),$("table.data tr.data").on("click",function(e){var t;return e.target?t=$(e.target):e.srcElement&&(t=$(e.srcElement)),t.is("tr")||(t=t.closest("tr")),t.hasClass("hidden")&&t.closest("table.search").length>0?void 0:$(e.target).is("a")?(e.stopPropagation(),void 0):(EOL.toggle_actions_row(t),void 0)}),$("table.data tr.actions td .metadata").live("click",function(e){$(e.target).closest("a").length||EOL.toggle_actions_row($(this).closest("tr").prev())}),$("#recently_used_category a").on("click",function(){$("#suggestions").find(".child").hide();for(var e=$(this).parent().next();e.hasClass("child");)e.show(),e=e.next();return!1}),$("li.attribute").live("click",function(){var e=$(this).find(".name");$("input.predicate_autocomplete").val(e.text()),$("input.predicate_known_uri_id").val(e.data("id")),$("#predicate_uri_type").val(e.data("uri_type")),$("#user_added_data_has_values").val(e.data("has_values")),EOL.attribute_is_okay(),$("div#suggestions").hide()}),$("input.predicate_autocomplete").bind("railsAutocomplete.select",function(){EOL.attribute_is_okay()}),$("input[data-autocomplete]").live("focus",function(){if($(this).data("autocomplete").match(/known_uri_values/)){var e=$(this).closest("div").find('input[id*="has_values"]:first');e.length>0&&("1"===e.val()?$(this).autocomplete("enable"):$(this).autocomplete("disable"))}$(this).hasClass("predicate_autocomplete")?$(this).autocomplete("search",$(this).val()):$(this).autocomplete("search"," ")}),$("input[data-autocomplete]").keyup(function(e){var t=e.keyCode||e.which;37!==t&&38!==t&&39!==t&&40!==t&&""===$(this).val()&&($(this).hasClass("predicate_autocomplete")?$("div#suggestions").show():$(this).autocomplete("search"," "))}),$("#tabs_sidebar.data ul.subtabs a").on("click",function(){return EOL.switch_subtab($(this)),!1}),EOL.limit_data_rows(),""!==location.hash){var e=location.hash.replace(/\?.*$/,""),t=$(e);if(t.click(),void 0!==t.offset()){var i=t.offset().top-200;$("html, body").animate({scrollTop:i})}}$("#data_summary table").hover(function(){$("span.remove").show()},function(){$("span.remove").hide()}).find("span.remove").hide(),$("a.button.hidden").hide(),$("#sortable.standard.uris").sortable({placeholder:"placeholder",items:"tr:not(.headers)",helper:"clone",tolerance:"pointer",update:function(e,t){$.post("/known_uris/sort",{known_uris:$("#sortable").sortable("toArray"),moved_id:t.item.attr("id")})}}).disableSelection(),$("#sortable a.to_top").on("click",function(){return $.post("/known_uris/sort",{to:"top",moved_id:$(this).closest("tr").attr("id")}),!1}),$("#sortable a.to_bottom").on("click",function(){return $.post("/known_uris/sort",{to:"bottom",moved_id:$(this).closest("tr").attr("id")}),!1}),$("#sortable a.to_top_p_harvest").on("click",function(){return $.post("/pending_harvests/sort",{to:"top",moved_id:$(this).closest("tr").attr("id")}),!1}),$("#sortable a.to_bottom_p_harvest").on("click",function(){return $.post("/pending_harvests/sort",{to:"bottom",moved_id:$(this).closest("tr").attr("id")}),!1}),$("#sortable.standard.pending_harvests").sortable({placeholder:"placeholder",items:"tr:not(.headers)",helper:"clone",tolerance:"pointer",update:function(e,t){$.post("/pending_harvests/sort",{pending_harvests:$("#sortable").sortable("toArray"),moved_id:t.item.attr("id")})}}).disableSelection(),$("#pause_p_harvest").on("click",function(){return document.getElementById("pause_pending_harvests").style.display="none",document.getElementById("resume_pending_harvests").style.display="block",$.post("/pending_harvests/pause_harvesting"),!1}),$("#resume_p_harvest").on("click",function(){return document.getElementById("resume_pending_harvests").style.display="none",document.getElementById("pause_pending_harvests").style.display="block",$.post("/pending_harvests/resume_harvesting"),!1}),$("table.data tr .info, table.data.search tr .info").each(function(){EOL.create_info_dialog(this)}),$("form.copy .vital li .info, form.copy .vital.search li .info").each(function(){EOL.create_info_dialog_for_data_search(this)}),$("table.ranges tr .info, table.ranges.search tr .info").each(function(){EOL.create_info_ranges_dialog(this)}),$("table.taxon_collection tr .info_icon, table.taxon_collection.search tr .info_icon").each(function(){EOL.create_collection_taxon_info_dialog(this)}),$(".add_content .article").hide(),$(".add_content .add_data a").on("click",function(){var e=$(".add_content .article");return e.is(":visible")?($(this).removeClass("open"),$(".add_content .article").hide()):($(this).addClass("open"),$(".add_content .article").show()),!1}),EOL.enable_hover_list_items(),$(".page_actions .data_download a").on("click",function(){window.alert($(this).parent().data("alert").replace(/<\/?[^>]+>/g,""))}),$("#known_uris.glossary ul.chapters li").find("a, input").on("click",function(e){e.preventDefault();var t=$(this).closest("li"),i=t.find("input"),n=$("#known_uris.glossary ul.chapters");return t.hasClass("selected")?(t.removeClass("selected"),setTimeout(function(){i.prop("checked",!1)},5),0===n.find("li.selected").length?$("ul.glossary > li").show():$('ul.glossary li[data-toc-id~="'+t.data("toc-id")+'"]').hide()):(0===n.find("li.selected").length&&$("ul.glossary > li").hide(),t.addClass("selected"),setTimeout(function(){i.prop("checked",!0)},5),$('ul.glossary li[data-toc-id~="'+t.data("toc-id")+'"]').show()),!1}),$("#data_search select#attribute").on("change",function(){EOL.update_unit_select_options($(this).find(":selected").data("known_uri_id"))})});