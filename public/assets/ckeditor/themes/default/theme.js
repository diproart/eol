/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
CKEDITOR.themes.add("default",function(){function e(e,t){var i,n;if(n=e.config.sharedSpaces,n=n&&n[t],n=n&&CKEDITOR.document.getById(n)){var a='<span class="cke_shared " dir="'+e.lang.dir+'"><span class="'+e.skinClass+" "+e.id+" cke_editor_"+e.name+'"><span class="'+CKEDITOR.env.cssClass+'"><span class="cke_wrapper cke_'+e.lang.dir+'"><span class="cke_editor"><div class="cke_'+t+'"></div></span></span></span></span></span>',o=n.append(CKEDITOR.dom.element.createFromHtml(a,n.getDocument()));n.getCustomData("cke_hasshared")?o.hide():n.setCustomData("cke_hasshared",1),i=o.getChild([0,0,0,0]),!e.sharedSpaces&&(e.sharedSpaces={}),e.sharedSpaces[t]=i,e.on("focus",function(){for(var e,t=0,i=n.getChildren();e=i.getItem(t);t++)e.type==CKEDITOR.NODE_ELEMENT&&!e.equals(o)&&e.hasClass("cke_shared")&&e.hide();o.show()}),e.on("destroy",function(){o.remove()})}return i}var t={};return{build:function(i){var n=i.name,a=i.element,o=i.elementMode;if(a&&o!=CKEDITOR.ELEMENT_MODE_NONE){o==CKEDITOR.ELEMENT_MODE_REPLACE&&a.hide();var r=i.fire("themeSpace",{space:"top",html:""}).html,s=i.fire("themeSpace",{space:"contents",html:""}).html,l=i.fireOnce("themeSpace",{space:"bottom",html:""}).html,c=s&&i.config.height,d=i.config.tabIndex||i.element.getAttribute("tabindex")||0;s?isNaN(c)||(c+="px"):c="auto";var u="",h=i.config.width;h&&(isNaN(h)||(h+="px"),u+="width: "+h+";");var p=r&&e(i,"top"),m=e(i,"bottom");p&&(p.setHtml(r),r=""),m&&(m.setHtml(l),l="");var g="<style>."+i.skinClass+"{visibility:hidden;}</style>";t[i.skinClass]?g="":t[i.skinClass]=1;var f=CKEDITOR.dom.element.createFromHtml(['<span id="cke_',n,'" class="',i.skinClass," ",i.id," cke_editor_",n,'" dir="',i.lang.dir,'" title="',CKEDITOR.env.gecko?" ":"",'" lang="',i.langCode,'"'+(CKEDITOR.env.webkit?' tabindex="'+d+'"':"")+' role="application" aria-labelledby="cke_',n,'_arialbl"'+(u?' style="'+u+'"':"")+'><span id="cke_',n,'_arialbl" class="cke_voice_label">'+i.lang.editor+'</span><span class="',CKEDITOR.env.cssClass,'" role="presentation"><span class="cke_wrapper cke_',i.lang.dir,'" role="presentation"><table class="cke_editor" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr',r?"":' style="display:none"',' role="presentation"><td id="cke_top_',n,'" class="cke_top" role="presentation">',r,"</td></tr><tr",s?"":' style="display:none"',' role="presentation"><td id="cke_contents_',n,'" class="cke_contents" style="height:',c,'" role="presentation">',s,"</td></tr><tr",l?"":' style="display:none"',' role="presentation"><td id="cke_bottom_',n,'" class="cke_bottom" role="presentation">',l,"</td></tr></tbody></table>"+g+"</span></span></span>"].join(""));f.getChild([1,0,0,0,0]).unselectable(),f.getChild([1,0,0,0,2]).unselectable(),o==CKEDITOR.ELEMENT_MODE_REPLACE?f.insertAfter(a):a.append(f),i.container=f,f.disableContextMenu(),i.on("contentDirChanged",function(e){var t=(i.lang.dir!=e.data?"add":"remove")+"Class";f.getChild(1)[t]("cke_mixed_dir_content");var n=this.sharedSpaces&&this.sharedSpaces[this.config.toolbarLocation];n&&n.getParent().getParent()[t]("cke_mixed_dir_content")}),i.fireOnce("themeLoaded"),i.fireOnce("uiReady")}},buildDialog:function(e){var t=CKEDITOR.tools.getNextNumber(),i=CKEDITOR.dom.element.createFromHtml(['<div class="',e.id,"_dialog cke_editor_",e.name.replace(".","\\."),"_dialog cke_skin_",e.skinName,'" dir="',e.lang.dir,'" lang="',e.langCode,'" role="dialog" aria-labelledby="%title#"><table class="cke_dialog'," "+CKEDITOR.env.cssClass," cke_",e.lang.dir,'" style="position:absolute" role="presentation"><tr><td role="presentation"><div class="%body" role="presentation"><div id="%title#" class="%title" role="presentation"></div><a id="%close_button#" class="%close_button" href="javascript:void(0)" title="'+e.lang.common.close+'" role="button"><span class="cke_label">X</span></a><div id="%tabs#" class="%tabs" role="tablist"></div><table class="%contents" role="presentation"><tr><td id="%contents#" class="%contents" role="presentation"></td></tr><tr><td id="%footer#" class="%footer" role="presentation"></td></tr></table></div><div id="%tl#" class="%tl"></div><div id="%tc#" class="%tc"></div><div id="%tr#" class="%tr"></div><div id="%ml#" class="%ml"></div><div id="%mr#" class="%mr"></div><div id="%bl#" class="%bl"></div><div id="%bc#" class="%bc"></div><div id="%br#" class="%br"></div></td></tr></table>',CKEDITOR.env.ie?"":"<style>.cke_dialog{visibility:hidden;}</style>","</div>"].join("").replace(/#/g,"_"+t).replace(/%/g,"cke_dialog_")),n=i.getChild([0,0,0,0,0]),a=n.getChild(0),o=n.getChild(1);if(CKEDITOR.env.ie&&!CKEDITOR.env.ie6Compat){var r=CKEDITOR.env.isCustomDomain(),s="javascript:void(function(){"+encodeURIComponent("document.open();"+(r?'document.domain="'+document.domain+'";':"")+"document.close();")+"}())",l=CKEDITOR.dom.element.createFromHtml('<iframe frameBorder="0" class="cke_iframe_shim" src="'+s+'" tabIndex="-1"></iframe>');l.appendTo(n.getParent())}return a.unselectable(),o.unselectable(),{element:i,parts:{dialog:i.getChild(0),title:a,close:o,tabs:n.getChild(2),contents:n.getChild([3,0,0,0]),footer:n.getChild([3,0,1,0])}}},destroy:function(e){var t=e.container,i=e.element;t&&(t.clearCustomData(),t.remove()),i&&(i.clearCustomData(),e.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE&&i.show(),delete e.element)}}}()),CKEDITOR.editor.prototype.getThemeSpace=function(e){var t="cke_"+e,i=this._[t]||(this._[t]=CKEDITOR.document.getById(t+"_"+this.name));return i},CKEDITOR.editor.prototype.resize=function(e,t,i,n){var a=this,o=a.container,r=CKEDITOR.document.getById("cke_contents_"+a.name),s=CKEDITOR.env.webkit&&a.document&&a.document.getWindow().$.frameElement,l=n?o.getChild(1):o;l.setSize("width",e,!0),s&&(s.style.width="1%");var c=i?0:(l.$.offsetHeight||0)-(r.$.clientHeight||0);r.setStyle("height",Math.max(t-c,0)+"px"),s&&(s.style.width="100%"),a.fire("resize")},CKEDITOR.editor.prototype.getResizable=function(e){return e?CKEDITOR.document.getById("cke_contents_"+this.name):this.container};