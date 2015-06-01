/*
 * jPlayer Plugin for jQuery JavaScript Library
 * http://www.happyworm.com/jquery/jplayer
 *
 * Copyright (c) 2009 - 2010 Happyworm Ltd
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * Author: Mark J Panaghiston
 * Version: 2.0.0
 * Date: 20th December 2010
 */
!function(e,t){e.fn.jPlayer=function(i){var n="string"==typeof i,s=Array.prototype.slice.call(arguments,1),o=this;return i=!n&&s.length?e.extend.apply(null,[!0,i].concat(s)):i,n&&"_"===i.charAt(0)?o:(n?this.each(function(){var n=e.data(this,"jPlayer"),a=n&&e.isFunction(n[i])?n[i].apply(n,s):n;return a!==n&&a!==t?(o=a,!1):void 0}):this.each(function(){var t=e.data(this,"jPlayer");t?(t.option(i||{})._init(),t.option(i||{})):e.data(this,"jPlayer",new e.jPlayer(i,this))}),o)},e.jPlayer=function(t,i){if(arguments.length){this.element=e(i),this.options=e.extend(!0,{},this.options,t);var n=this;this.element.bind("remove.jPlayer",function(){n.destroy()}),this._init()}},e.jPlayer.event={ready:"jPlayer_ready",resize:"jPlayer_resize",error:"jPlayer_error",warning:"jPlayer_warning",loadstart:"jPlayer_loadstart",progress:"jPlayer_progress",suspend:"jPlayer_suspend",abort:"jPlayer_abort",emptied:"jPlayer_emptied",stalled:"jPlayer_stalled",play:"jPlayer_play",pause:"jPlayer_pause",loadedmetadata:"jPlayer_loadedmetadata",loadeddata:"jPlayer_loadeddata",waiting:"jPlayer_waiting",playing:"jPlayer_playing",canplay:"jPlayer_canplay",canplaythrough:"jPlayer_canplaythrough",seeking:"jPlayer_seeking",seeked:"jPlayer_seeked",timeupdate:"jPlayer_timeupdate",ended:"jPlayer_ended",ratechange:"jPlayer_ratechange",durationchange:"jPlayer_durationchange",volumechange:"jPlayer_volumechange"},e.jPlayer.htmlEvent=["loadstart","abort","emptied","stalled","loadedmetadata","loadeddata","canplaythrough","ratechange"],e.jPlayer.pause=function(){e.each(e.jPlayer.prototype.instances,function(e,t){t.data("jPlayer").status.srcSet&&t.jPlayer("pause")})},e.jPlayer.timeFormat={showHour:!1,showMin:!0,showSec:!0,padHour:!1,padMin:!0,padSec:!0,sepHour:":",sepMin:":",sepSec:""},e.jPlayer.convertTime=function(t){t=new Date(1e3*t);var i=t.getUTCHours(),n=t.getUTCMinutes();return t=t.getUTCSeconds(),i=e.jPlayer.timeFormat.padHour&&10>i?"0"+i:i,n=e.jPlayer.timeFormat.padMin&&10>n?"0"+n:n,t=e.jPlayer.timeFormat.padSec&&10>t?"0"+t:t,(e.jPlayer.timeFormat.showHour?i+e.jPlayer.timeFormat.sepHour:"")+(e.jPlayer.timeFormat.showMin?n+e.jPlayer.timeFormat.sepMin:"")+(e.jPlayer.timeFormat.showSec?t+e.jPlayer.timeFormat.sepSec:"")},e.jPlayer.uaMatch=function(e){e=e.toLowerCase();var t=/(opera)(?:.*version)?[ \/]([\w.]+)/,i=/(msie) ([\w.]+)/,n=/(mozilla)(?:.*? rv:([\w.]+))?/;return e=/(webkit)[ \/]([\w.]+)/.exec(e)||t.exec(e)||i.exec(e)||e.indexOf("compatible")<0&&n.exec(e)||[],{browser:e[1]||"",version:e[2]||"0"}},e.jPlayer.browser={};var i=e.jPlayer.uaMatch(navigator.userAgent);i.browser&&(e.jPlayer.browser[i.browser]=!0,e.jPlayer.browser.version=i.version),e.jPlayer.prototype={count:0,version:{script:"2.0.0",needFlash:"2.0.0",flash:"unknown"},options:{swfPath:"js",solution:"html, flash",supplied:"mp3",preload:"metadata",volume:.8,muted:!1,backgroundColor:"#000000",cssSelectorAncestor:"#jp_interface_1",cssSelector:{videoPlay:".jp-video-play",play:".jp-play",pause:".jp-pause",stop:".jp-stop",seekBar:".jp-seek-bar",playBar:".jp-play-bar",mute:".jp-mute",unmute:".jp-unmute",volumeBar:".jp-volume-bar",volumeBarValue:".jp-volume-bar-value",currentTime:".jp-current-time",duration:".jp-duration"},idPrefix:"jp",errorAlerts:!1,warningAlerts:!1},instances:{},status:{src:"",media:{},paused:!0,format:{},formatType:"",waitForPlay:!0,waitForLoad:!0,srcSet:!1,video:!1,seekPercent:0,currentPercentRelative:0,currentPercentAbsolute:0,currentTime:0,duration:0},_status:{volume:t,muted:!1,width:0,height:0},internal:{ready:!1,instance:t,htmlDlyCmdId:t},solution:{html:!0,flash:!0},format:{mp3:{codec:'audio/mpeg; codecs="mp3"',flashCanPlay:!0,media:"audio"},m4a:{codec:'audio/mp4; codecs="mp4a.40.2"',flashCanPlay:!0,media:"audio"},oga:{codec:'audio/ogg; codecs="vorbis"',flashCanPlay:!1,media:"audio"},wav:{codec:'audio/wav; codecs="1"',flashCanPlay:!1,media:"audio"},webma:{codec:'audio/webm; codecs="vorbis"',flashCanPlay:!1,media:"audio"},m4v:{codec:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',flashCanPlay:!0,media:"video"},ogv:{codec:'video/ogg; codecs="theora, vorbis"',flashCanPlay:!1,media:"video"},webmv:{codec:'video/webm; codecs="vorbis, vp8"',flashCanPlay:!1,media:"video"}},_init:function(){var i=this;if(this.element.empty(),this.status=e.extend({},this.status,this._status),this.internal=e.extend({},this.internal),this.formats=[],this.solutions=[],this.require={},this.htmlElement={},this.html={},this.html.audio={},this.html.video={},this.flash={},this.css={},this.css.cs={},this.css.jq={},this.status.volume=this._limitValue(this.options.volume,0,1),this.status.muted=this.options.muted,this.status.width=this.element.css("width"),this.status.height=this.element.css("height"),this.element.css({"background-color":this.options.backgroundColor}),e.each(this.options.supplied.toLowerCase().split(","),function(t,n){var s=n.replace(/^\s+|\s+$/g,"");if(i.format[s]){var o=!1;e.each(i.formats,function(e,t){return s===t?(o=!0,!1):void 0}),o||i.formats.push(s)}}),e.each(this.options.solution.toLowerCase().split(","),function(t,n){var s=n.replace(/^\s+|\s+$/g,"");if(i.solution[s]){var o=!1;e.each(i.solutions,function(e,t){return s===t?(o=!0,!1):void 0}),o||i.solutions.push(s)}}),this.internal.instance="jp_"+this.count,this.instances[this.internal.instance]=this.element,""===this.element.attr("id")&&this.element.attr("id",this.options.idPrefix+"_jplayer_"+this.count),this.internal.self=e.extend({},{id:this.element.attr("id"),jq:this.element}),this.internal.audio=e.extend({},{id:this.options.idPrefix+"_audio_"+this.count,jq:t}),this.internal.video=e.extend({},{id:this.options.idPrefix+"_video_"+this.count,jq:t}),this.internal.flash=e.extend({},{id:this.options.idPrefix+"_flash_"+this.count,jq:t,swf:this.options.swfPath+(""!==this.options.swfPath&&"/"!==this.options.swfPath.slice(-1)?"/":"")+"Jplayer.swf"}),this.internal.poster=e.extend({},{id:this.options.idPrefix+"_poster_"+this.count,jq:t}),e.each(e.jPlayer.event,function(e,n){i.options[e]!==t&&(i.element.bind(n+".jPlayer",i.options[e]),i.options[e]=t)}),this.htmlElement.poster=document.createElement("img"),this.htmlElement.poster.id=this.internal.poster.id,this.htmlElement.poster.onload=function(){(!i.status.video||i.status.waitForPlay)&&i.internal.poster.jq.show()},this.element.append(this.htmlElement.poster),this.internal.poster.jq=e("#"+this.internal.poster.id),this.internal.poster.jq.css({width:this.status.width,height:this.status.height}),this.internal.poster.jq.hide(),this.require.audio=!1,this.require.video=!1,e.each(this.formats,function(e,t){i.require[i.format[t].media]=!0}),this.html.audio.available=!1,this.require.audio&&(this.htmlElement.audio=document.createElement("audio"),this.htmlElement.audio.id=this.internal.audio.id,this.html.audio.available=!!this.htmlElement.audio.canPlayType),this.html.video.available=!1,this.require.video&&(this.htmlElement.video=document.createElement("video"),this.htmlElement.video.id=this.internal.video.id,this.html.video.available=!!this.htmlElement.video.canPlayType),this.flash.available=this._checkForFlash(10),this.html.canPlay={},this.flash.canPlay={},e.each(this.formats,function(e,t){i.html.canPlay[t]=i.html[i.format[t].media].available&&""!==i.htmlElement[i.format[t].media].canPlayType(i.format[t].codec),i.flash.canPlay[t]=i.format[t].flashCanPlay&&i.flash.available}),this.html.desired=!1,this.flash.desired=!1,e.each(this.solutions,function(t,n){if(0===t)i[n].desired=!0;else{var s=!1,o=!1;e.each(i.formats,function(e,t){i[i.solutions[0]].canPlay[t]&&("video"===i.format[t].media?o=!0:s=!0)}),i[n].desired=i.require.audio&&!s||i.require.video&&!o}}),this.html.support={},this.flash.support={},e.each(this.formats,function(e,t){i.html.support[t]=i.html.canPlay[t]&&i.html.desired,i.flash.support[t]=i.flash.canPlay[t]&&i.flash.desired}),this.html.used=!1,this.flash.used=!1,e.each(this.solutions,function(t,n){e.each(i.formats,function(e,t){return i[n].support[t]?(i[n].used=!0,!1):void 0})}),this.html.used||this.flash.used||this._error({type:e.jPlayer.error.NO_SOLUTION,context:"{solution:'"+this.options.solution+"', supplied:'"+this.options.supplied+"'}",message:e.jPlayer.errorMsg.NO_SOLUTION,hint:e.jPlayer.errorHint.NO_SOLUTION}),this.html.active=!1,this.html.audio.gate=!1,this.html.video.gate=!1,this.flash.active=!1,this.flash.gate=!1,this.flash.used){var n="id="+escape(this.internal.self.id)+"&vol="+this.status.volume+"&muted="+this.status.muted;if(e.browser.msie&&Number(e.browser.version)<=8){var s='<object id="'+this.internal.flash.id+'"';s+=' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"',s+=' codebase="'+document.URL.substring(0,document.URL.indexOf(":"))+'://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"',s+=' type="application/x-shockwave-flash"',s+=' width="0" height="0">',s+="</object>";var o=[];for(o[0]='<param name="movie" value="'+this.internal.flash.swf+'" />',o[1]='<param name="quality" value="high" />',o[2]='<param name="FlashVars" value="'+n+'" />',o[3]='<param name="allowScriptAccess" value="always" />',o[4]='<param name="bgcolor" value="'+this.options.backgroundColor+'" />',n=document.createElement(s),s=0;s<o.length;s++)n.appendChild(document.createElement(o[s]));this.element.append(n)}else o='<embed name="'+this.internal.flash.id+'" id="'+this.internal.flash.id+'" src="'+this.internal.flash.swf+'"',o+=' width="0" height="0" bgcolor="'+this.options.backgroundColor+'"',o+=' quality="high" FlashVars="'+n+'"',o+=' allowScriptAccess="always"',o+=' type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />',this.element.append(o);this.internal.flash.jq=e("#"+this.internal.flash.id),this.internal.flash.jq.css({width:"0px",height:"0px"})}this.html.used&&(this.html.audio.available&&(this._addHtmlEventListeners(this.htmlElement.audio,this.html.audio),this.element.append(this.htmlElement.audio),this.internal.audio.jq=e("#"+this.internal.audio.id)),this.html.video.available&&(this._addHtmlEventListeners(this.htmlElement.video,this.html.video),this.element.append(this.htmlElement.video),this.internal.video.jq=e("#"+this.internal.video.id),this.internal.video.jq.css({width:"0px",height:"0px"}))),this.html.used&&!this.flash.used&&window.setTimeout(function(){i.internal.ready=!0,i.version.flash="n/a",i._trigger(e.jPlayer.event.ready)},100),e.each(this.options.cssSelector,function(e,t){i._cssSelector(e,t)}),this._updateInterface(),this._updateButtons(!1),this._updateVolume(this.status.volume),this._updateMute(this.status.muted),this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide(),e.jPlayer.prototype.count++},destroy:function(){this._resetStatus(),this._updateInterface(),this._seeked(),this.css.jq.currentTime.length&&this.css.jq.currentTime.text(""),this.css.jq.duration.length&&this.css.jq.duration.text(""),this.status.srcSet&&this.pause(),e.each(this.css.jq,function(e,t){t.unbind(".jPlayer")}),this.element.removeData("jPlayer"),this.element.unbind(".jPlayer"),this.element.empty(),this.instances[this.internal.instance]=t},enable:function(){},disable:function(){},_addHtmlEventListeners:function(t,i){var n=this;t.preload=this.options.preload,t.muted=this.options.muted,t.addEventListener("progress",function(){i.gate&&!n.status.waitForLoad&&(n._getHtmlStatus(t),n._updateInterface(),n._trigger(e.jPlayer.event.progress))},!1),t.addEventListener("timeupdate",function(){i.gate&&!n.status.waitForLoad&&(n._getHtmlStatus(t),n._updateInterface(),n._trigger(e.jPlayer.event.timeupdate))},!1),t.addEventListener("durationchange",function(){i.gate&&!n.status.waitForLoad&&(n.status.duration=this.duration,n._getHtmlStatus(t),n._updateInterface(),n._trigger(e.jPlayer.event.durationchange))},!1),t.addEventListener("play",function(){i.gate&&!n.status.waitForLoad&&(n._updateButtons(!0),n._trigger(e.jPlayer.event.play))},!1),t.addEventListener("playing",function(){i.gate&&!n.status.waitForLoad&&(n._updateButtons(!0),n._seeked(),n._trigger(e.jPlayer.event.playing))},!1),t.addEventListener("pause",function(){i.gate&&!n.status.waitForLoad&&(n._updateButtons(!1),n._trigger(e.jPlayer.event.pause))},!1),t.addEventListener("waiting",function(){i.gate&&!n.status.waitForLoad&&(n._seeking(),n._trigger(e.jPlayer.event.waiting))},!1),t.addEventListener("canplay",function(){i.gate&&!n.status.waitForLoad&&(t.volume=n._volumeFix(n.status.volume),n._trigger(e.jPlayer.event.canplay))},!1),t.addEventListener("seeking",function(){i.gate&&!n.status.waitForLoad&&(n._seeking(),n._trigger(e.jPlayer.event.seeking))},!1),t.addEventListener("seeked",function(){i.gate&&!n.status.waitForLoad&&(n._seeked(),n._trigger(e.jPlayer.event.seeked))},!1),t.addEventListener("suspend",function(){i.gate&&!n.status.waitForLoad&&(n._seeked(),n._trigger(e.jPlayer.event.suspend))},!1),t.addEventListener("ended",function(){i.gate&&!n.status.waitForLoad&&(e.jPlayer.browser.webkit||(n.htmlElement.media.currentTime=0),n.htmlElement.media.pause(),n._updateButtons(!1),n._getHtmlStatus(t,!0),n._updateInterface(),n._trigger(e.jPlayer.event.ended))},!1),t.addEventListener("error",function(){i.gate&&!n.status.waitForLoad&&(n._updateButtons(!1),n._seeked(),n.status.srcSet&&(n.status.waitForLoad=!0,n.status.waitForPlay=!0,n.status.video&&n.internal.video.jq.css({width:"0px",height:"0px"}),n._validString(n.status.media.poster)&&n.internal.poster.jq.show(),n.css.jq.videoPlay.length&&n.css.jq.videoPlay.show(),n._error({type:e.jPlayer.error.URL,context:n.status.src,message:e.jPlayer.errorMsg.URL,hint:e.jPlayer.errorHint.URL})))},!1),e.each(e.jPlayer.htmlEvent,function(s,o){t.addEventListener(this,function(){i.gate&&!n.status.waitForLoad&&n._trigger(e.jPlayer.event[o])},!1)})},_getHtmlStatus:function(e,t){var i=0,n=0,s=0,o=0;i=e.currentTime,n=this.status.duration>0?100*i/this.status.duration:0,"object"==typeof e.seekable&&e.seekable.length>0?(s=this.status.duration>0?100*e.seekable.end(e.seekable.length-1)/this.status.duration:100,o=100*e.currentTime/e.seekable.end(e.seekable.length-1)):(s=100,o=n),t&&(n=o=i=0),this.status.seekPercent=s,this.status.currentPercentRelative=o,this.status.currentPercentAbsolute=n,this.status.currentTime=i},_resetStatus:function(){this.status=e.extend({},this.status,e.jPlayer.prototype.status)},_trigger:function(t,i,n){t=e.Event(t),t.jPlayer={},t.jPlayer.version=e.extend({},this.version),t.jPlayer.status=e.extend(!0,{},this.status),t.jPlayer.html=e.extend(!0,{},this.html),t.jPlayer.flash=e.extend(!0,{},this.flash),i&&(t.jPlayer.error=e.extend({},i)),n&&(t.jPlayer.warning=e.extend({},n)),this.element.trigger(t)},jPlayerFlashEvent:function(t,i){if(t!==e.jPlayer.event.ready||this.internal.ready||(this.internal.ready=!0,this.version.flash=i.version,this.version.needFlash!==this.version.flash&&this._error({type:e.jPlayer.error.VERSION,context:this.version.flash,message:e.jPlayer.errorMsg.VERSION+this.version.flash,hint:e.jPlayer.errorHint.VERSION}),this._trigger(t)),this.flash.gate)switch(t){case e.jPlayer.event.progress:this._getFlashStatus(i),this._updateInterface(),this._trigger(t);break;case e.jPlayer.event.timeupdate:this._getFlashStatus(i),this._updateInterface(),this._trigger(t);break;case e.jPlayer.event.play:this._seeked(),this._updateButtons(!0),this._trigger(t);break;case e.jPlayer.event.pause:this._updateButtons(!1),this._trigger(t);break;case e.jPlayer.event.ended:this._updateButtons(!1),this._trigger(t);break;case e.jPlayer.event.error:this.status.waitForLoad=!0,this.status.waitForPlay=!0,this.status.video&&this.internal.flash.jq.css({width:"0px",height:"0px"}),this._validString(this.status.media.poster)&&this.internal.poster.jq.show(),this.css.jq.videoPlay.length&&this.css.jq.videoPlay.show(),this.status.video?this._flash_setVideo(this.status.media):this._flash_setAudio(this.status.media),this._error({type:e.jPlayer.error.URL,context:i.src,message:e.jPlayer.errorMsg.URL,hint:e.jPlayer.errorHint.URL});break;case e.jPlayer.event.seeking:this._seeking(),this._trigger(t);break;case e.jPlayer.event.seeked:this._seeked(),this._trigger(t);break;default:this._trigger(t)}return!1},_getFlashStatus:function(e){this.status.seekPercent=e.seekPercent,this.status.currentPercentRelative=e.currentPercentRelative,this.status.currentPercentAbsolute=e.currentPercentAbsolute,this.status.currentTime=e.currentTime,this.status.duration=e.duration},_updateButtons:function(e){this.status.paused=!e,this.css.jq.play.length&&this.css.jq.pause.length&&(e?(this.css.jq.play.hide(),this.css.jq.pause.show()):(this.css.jq.play.show(),this.css.jq.pause.hide()))},_updateInterface:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.width(this.status.seekPercent+"%"),this.css.jq.playBar.length&&this.css.jq.playBar.width(this.status.currentPercentRelative+"%"),this.css.jq.currentTime.length&&this.css.jq.currentTime.text(e.jPlayer.convertTime(this.status.currentTime)),this.css.jq.duration.length&&this.css.jq.duration.text(e.jPlayer.convertTime(this.status.duration))},_seeking:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.addClass("jp-seeking-bg")},_seeked:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.removeClass("jp-seeking-bg")},setMedia:function(t){var i=this;this._seeked(),clearTimeout(this.internal.htmlDlyCmdId);var n=this.html.audio.gate,s=this.html.video.gate,o=!1;e.each(this.formats,function(a,r){var l="video"===i.format[r].media;return e.each(i.solutions,function(e,a){if(i[a].support[r]&&i._validString(t[r])){var c="html"===a;return l?c?(i.html.audio.gate=!1,i.html.video.gate=!0,i.flash.gate=!1):(i.html.audio.gate=!1,i.html.video.gate=!1,i.flash.gate=!0):c?(i.html.audio.gate=!0,i.html.video.gate=!1,i.flash.gate=!1):(i.html.audio.gate=!1,i.html.video.gate=!1,i.flash.gate=!0),i.flash.active||i.html.active&&i.flash.gate||n===i.html.audio.gate&&s===i.html.video.gate?i.clearMedia():n!==i.html.audio.gate&&s!==i.html.video.gate&&(i._html_pause(),i.status.video&&i.internal.video.jq.css({width:"0px",height:"0px"}),i._resetStatus()),l?(c?(i._html_setVideo(t),i.html.active=!0,i.flash.active=!1):(i._flash_setVideo(t),i.html.active=!1,i.flash.active=!0),i.css.jq.videoPlay.length&&i.css.jq.videoPlay.show(),i.status.video=!0):(c?(i._html_setAudio(t),i.html.active=!0,i.flash.active=!1):(i._flash_setAudio(t),i.html.active=!1,i.flash.active=!0),i.css.jq.videoPlay.length&&i.css.jq.videoPlay.hide(),i.status.video=!1),o=!0,!1}}),o?!1:void 0}),o?(this._validString(t.poster)?this.htmlElement.poster.src!==t.poster?this.htmlElement.poster.src=t.poster:this.internal.poster.jq.show():this.internal.poster.jq.hide(),this.status.srcSet=!0,this.status.media=e.extend({},t),this._updateButtons(!1),this._updateInterface()):(this.status.srcSet&&!this.status.waitForPlay&&this.pause(),this.html.audio.gate=!1,this.html.video.gate=!1,this.flash.gate=!1,this.html.active=!1,this.flash.active=!1,this._resetStatus(),this._updateInterface(),this._updateButtons(!1),this.internal.poster.jq.hide(),this.html.used&&this.require.video&&this.internal.video.jq.css({width:"0px",height:"0px"}),this.flash.used&&this.internal.flash.jq.css({width:"0px",height:"0px"}),this._error({type:e.jPlayer.error.NO_SUPPORT,context:"{supplied:'"+this.options.supplied+"'}",message:e.jPlayer.errorMsg.NO_SUPPORT,hint:e.jPlayer.errorHint.NO_SUPPORT}))},clearMedia:function(){this._resetStatus(),this._updateButtons(!1),this.internal.poster.jq.hide(),clearTimeout(this.internal.htmlDlyCmdId),this.html.active?this._html_clearMedia():this.flash.active&&this._flash_clearMedia()},load:function(){this.status.srcSet?this.html.active?this._html_load():this.flash.active&&this._flash_load():this._urlNotSetError("load")},play:function(e){e="number"==typeof e?e:0/0,this.status.srcSet?this.html.active?this._html_play(e):this.flash.active&&this._flash_play(e):this._urlNotSetError("play")},videoPlay:function(){this.play()},pause:function(e){e="number"==typeof e?e:0/0,this.status.srcSet?this.html.active?this._html_pause(e):this.flash.active&&this._flash_pause(e):this._urlNotSetError("pause")},pauseOthers:function(){var t=this;e.each(this.instances,function(e,i){t.element!==i&&i.data("jPlayer").status.srcSet&&i.jPlayer("pause")})},stop:function(){this.status.srcSet?this.html.active?this._html_pause(0):this.flash.active&&this._flash_pause(0):this._urlNotSetError("stop")},playHead:function(e){e=this._limitValue(e,0,100),this.status.srcSet?this.html.active?this._html_playHead(e):this.flash.active&&this._flash_playHead(e):this._urlNotSetError("playHead")},mute:function(){this.status.muted=!0,this.html.used&&this._html_mute(!0),this.flash.used&&this._flash_mute(!0),this._updateMute(!0),this._updateVolume(0),this._trigger(e.jPlayer.event.volumechange)},unmute:function(){this.status.muted=!1,this.html.used&&this._html_mute(!1),this.flash.used&&this._flash_mute(!1),this._updateMute(!1),this._updateVolume(this.status.volume),this._trigger(e.jPlayer.event.volumechange)},_updateMute:function(e){this.css.jq.mute.length&&this.css.jq.unmute.length&&(e?(this.css.jq.mute.hide(),this.css.jq.unmute.show()):(this.css.jq.mute.show(),this.css.jq.unmute.hide()))},volume:function(t){t=this._limitValue(t,0,1),this.status.volume=t,this.html.used&&this._html_volume(t),this.flash.used&&this._flash_volume(t),this.status.muted||this._updateVolume(t),this._trigger(e.jPlayer.event.volumechange)},volumeBar:function(e){if(!this.status.muted&&this.css.jq.volumeBar){var t=this.css.jq.volumeBar.offset();e=e.pageX-t.left,t=this.css.jq.volumeBar.width(),this.volume(e/t)}},volumeBarValue:function(e){this.volumeBar(e)},_updateVolume:function(e){this.css.jq.volumeBarValue.length&&this.css.jq.volumeBarValue.width(100*e+"%")},_volumeFix:function(e){var t=.001*Math.random();return e+(.5>e?t:-t)},_cssSelectorAncestor:function(t,i){this.options.cssSelectorAncestor=t,i&&e.each(this.options.cssSelector,function(e,t){self._cssSelector(e,t)})},_cssSelector:function(t,i){var n=this;"string"==typeof i?e.jPlayer.prototype.options.cssSelector[t]?(this.css.jq[t]&&this.css.jq[t].length&&this.css.jq[t].unbind(".jPlayer"),this.options.cssSelector[t]=i,this.css.cs[t]=this.options.cssSelectorAncestor+" "+i,this.css.jq[t]=i?e(this.css.cs[t]):[],this.css.jq[t].length&&this.css.jq[t].bind("click.jPlayer",function(i){return n[t](i),e(this).blur(),!1}),i&&1!==this.css.jq[t].length&&this._warning({type:e.jPlayer.warning.CSS_SELECTOR_COUNT,context:this.css.cs[t],message:e.jPlayer.warningMsg.CSS_SELECTOR_COUNT+this.css.jq[t].length+" found for "+t+" method.",hint:e.jPlayer.warningHint.CSS_SELECTOR_COUNT})):this._warning({type:e.jPlayer.warning.CSS_SELECTOR_METHOD,context:t,message:e.jPlayer.warningMsg.CSS_SELECTOR_METHOD,hint:e.jPlayer.warningHint.CSS_SELECTOR_METHOD}):this._warning({type:e.jPlayer.warning.CSS_SELECTOR_STRING,context:i,message:e.jPlayer.warningMsg.CSS_SELECTOR_STRING,hint:e.jPlayer.warningHint.CSS_SELECTOR_STRING})},seekBar:function(e){if(this.css.jq.seekBar){var t=this.css.jq.seekBar.offset();e=e.pageX-t.left,t=this.css.jq.seekBar.width(),this.playHead(100*e/t)}},playBar:function(e){this.seekBar(e)},currentTime:function(){},duration:function(){},option:function(i,n){var s=i;if(0===arguments.length)return e.extend(!0,{},this.options);if("string"==typeof i){var o=i.split(".");if(n===t){for(var a=e.extend(!0,{},this.options),r=0;r<o.length;r++){if(a[o[r]]===t)return this._warning({type:e.jPlayer.warning.OPTION_KEY,context:i,message:e.jPlayer.warningMsg.OPTION_KEY,hint:e.jPlayer.warningHint.OPTION_KEY}),t;a=a[o[r]]}return a}for(a=s={},r=0;r<o.length;r++)r<o.length-1?(a[o[r]]={},a=a[o[r]]):a[o[r]]=n}return this._setOptions(s),this},_setOptions:function(t){var i=this;return e.each(t,function(e,t){i._setOption(e,t)}),this},_setOption:function(t,i){var n=this;switch(t){case"cssSelectorAncestor":this.options[t]=i,e.each(n.options.cssSelector,function(e,t){n._cssSelector(e,t)});break;case"cssSelector":e.each(i,function(e,t){n._cssSelector(e,t)})}return this},resize:function(t){this.html.active&&this._resizeHtml(t),this.flash.active&&this._resizeFlash(t),this._trigger(e.jPlayer.event.resize)},_resizePoster:function(){},_resizeHtml:function(){},_resizeFlash:function(e){this.internal.flash.jq.css({width:e.width,height:e.height})},_html_initMedia:function(){this.status.srcSet&&!this.status.waitForPlay&&this.htmlElement.media.pause(),"none"!==this.options.preload&&this._html_load(),this._trigger(e.jPlayer.event.timeupdate)},_html_setAudio:function(t){var i=this;e.each(this.formats,function(e,n){return i.html.support[n]&&t[n]?(i.status.src=t[n],i.status.format[n]=!0,i.status.formatType=n,!1):void 0}),this.htmlElement.media=this.htmlElement.audio,this._html_initMedia()},_html_setVideo:function(t){var i=this;e.each(this.formats,function(e,n){return i.html.support[n]&&t[n]?(i.status.src=t[n],i.status.format[n]=!0,i.status.formatType=n,!1):void 0}),this.htmlElement.media=this.htmlElement.video,this._html_initMedia()},_html_clearMedia:function(){this.htmlElement.media&&(this.htmlElement.media.id===this.internal.video.id&&this.internal.video.jq.css({width:"0px",height:"0px"}),this.htmlElement.media.pause(),this.htmlElement.media.src="",e.browser.msie&&Number(e.browser.version)>=9||this.htmlElement.media.load())},_html_load:function(){if(this.status.waitForLoad){this.status.waitForLoad=!1,this.htmlElement.media.src=this.status.src;try{this.htmlElement.media.load()}catch(e){}}clearTimeout(this.internal.htmlDlyCmdId)},_html_play:function(e){var t=this;if(this._html_load(),this.htmlElement.media.play(),!isNaN(e))try{this.htmlElement.media.currentTime=e}catch(i){return this.internal.htmlDlyCmdId=setTimeout(function(){t.play(e)},100),void 0}this._html_checkWaitForPlay()},_html_pause:function(e){var t=this;if(e>0?this._html_load():clearTimeout(this.internal.htmlDlyCmdId),this.htmlElement.media.pause(),!isNaN(e))try{this.htmlElement.media.currentTime=e}catch(i){return this.internal.htmlDlyCmdId=setTimeout(function(){t.pause(e)},100),void 0}e>0&&this._html_checkWaitForPlay()},_html_playHead:function(e){var t=this;this._html_load();try{if("object"==typeof this.htmlElement.media.seekable&&this.htmlElement.media.seekable.length>0)this.htmlElement.media.currentTime=e*this.htmlElement.media.seekable.end(this.htmlElement.media.seekable.length-1)/100;else{if(!(this.htmlElement.media.duration>0)||isNaN(this.htmlElement.media.duration))throw"e";this.htmlElement.media.currentTime=e*this.htmlElement.media.duration/100}}catch(i){return this.internal.htmlDlyCmdId=setTimeout(function(){t.playHead(e)},100),void 0}this.status.waitForLoad||this._html_checkWaitForPlay()},_html_checkWaitForPlay:function(){this.status.waitForPlay&&(this.status.waitForPlay=!1,this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide(),this.status.video&&(this.internal.poster.jq.hide(),this.internal.video.jq.css({width:this.status.width,height:this.status.height})))},_html_volume:function(e){this.html.audio.available&&(this.htmlElement.audio.volume=e),this.html.video.available&&(this.htmlElement.video.volume=e)},_html_mute:function(e){this.html.audio.available&&(this.htmlElement.audio.muted=e),this.html.video.available&&(this.htmlElement.video.muted=e)},_flash_setAudio:function(t){var i=this;try{e.each(this.formats,function(e,n){if(i.flash.support[n]&&t[n]){switch(n){case"m4a":i._getMovie().fl_setAudio_m4a(t[n]);break;case"mp3":i._getMovie().fl_setAudio_mp3(t[n])}return i.status.src=t[n],i.status.format[n]=!0,i.status.formatType=n,!1}}),"auto"===this.options.preload&&(this._flash_load(),this.status.waitForLoad=!1)}catch(n){this._flashError(n)}},_flash_setVideo:function(t){var i=this;try{e.each(this.formats,function(e,n){if(i.flash.support[n]&&t[n]){switch(n){case"m4v":i._getMovie().fl_setVideo_m4v(t[n])}return i.status.src=t[n],i.status.format[n]=!0,i.status.formatType=n,!1}}),"auto"===this.options.preload&&(this._flash_load(),this.status.waitForLoad=!1)}catch(n){this._flashError(n)}},_flash_clearMedia:function(){this.internal.flash.jq.css({width:"0px",height:"0px"});try{this._getMovie().fl_clearMedia()}catch(e){this._flashError(e)}},_flash_load:function(){try{this._getMovie().fl_load()}catch(e){this._flashError(e)}this.status.waitForLoad=!1},_flash_play:function(e){try{this._getMovie().fl_play(e)}catch(t){this._flashError(t)}this.status.waitForLoad=!1,this._flash_checkWaitForPlay()},_flash_pause:function(e){try{this._getMovie().fl_pause(e)}catch(t){this._flashError(t)}e>0&&(this.status.waitForLoad=!1,this._flash_checkWaitForPlay())},_flash_playHead:function(e){try{this._getMovie().fl_play_head(e)}catch(t){this._flashError(t)}this.status.waitForLoad||this._flash_checkWaitForPlay()},_flash_checkWaitForPlay:function(){this.status.waitForPlay&&(this.status.waitForPlay=!1,this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide(),this.status.video&&(this.internal.poster.jq.hide(),this.internal.flash.jq.css({width:this.status.width,height:this.status.height})))},_flash_volume:function(e){try{this._getMovie().fl_volume(e)}catch(t){this._flashError(t)}},_flash_mute:function(e){try{this._getMovie().fl_mute(e)}catch(t){this._flashError(t)}},_getMovie:function(){return document[this.internal.flash.id]},_checkForFlash:function(t){var i,n=!1;if(window.ActiveXObject)try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+t),n=!0}catch(s){}else navigator.plugins&&navigator.mimeTypes.length>0&&(i=navigator.plugins["Shockwave Flash"])&&navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/,"$1")>=t&&(n=!0);return e.browser.msie&&Number(e.browser.version)>=9?!1:n},_validString:function(e){return e&&"string"==typeof e},_limitValue:function(e,t,i){return t>e?t:e>i?i:e},_urlNotSetError:function(t){this._error({type:e.jPlayer.error.URL_NOT_SET,context:t,message:e.jPlayer.errorMsg.URL_NOT_SET,hint:e.jPlayer.errorHint.URL_NOT_SET})},_flashError:function(t){this._error({type:e.jPlayer.error.FLASH,context:this.internal.flash.swf,message:e.jPlayer.errorMsg.FLASH+t.message,hint:e.jPlayer.errorHint.FLASH})},_error:function(t){this._trigger(e.jPlayer.event.error,t),this.options.errorAlerts&&this._alert("Error!"+(t.message?"\n\n"+t.message:"")+(t.hint?"\n\n"+t.hint:"")+"\n\nContext: "+t.context)},_warning:function(i){this._trigger(e.jPlayer.event.warning,t,i),this.options.errorAlerts&&this._alert("Warning!"+(i.message?"\n\n"+i.message:"")+(i.hint?"\n\n"+i.hint:"")+"\n\nContext: "+i.context)},_alert:function(e){alert("jPlayer "+this.version.script+" : id='"+this.internal.self.id+"' : "+e)}},e.jPlayer.error={FLASH:"e_flash",NO_SOLUTION:"e_no_solution",NO_SUPPORT:"e_no_support",URL:"e_url",URL_NOT_SET:"e_url_not_set",VERSION:"e_version"},e.jPlayer.errorMsg={FLASH:"jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ",NO_SOLUTION:"No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",NO_SUPPORT:"It is not possible to play any media format provided in setMedia() on this browser using your current options.",URL:"Media URL could not be loaded.",URL_NOT_SET:"Attempt to issue media playback commands, while no media url is set.",VERSION:"jPlayer "+e.jPlayer.prototype.version.script+" needs Jplayer.swf version "+e.jPlayer.prototype.version.needFlash+" but found "},e.jPlayer.errorHint={FLASH:"Check your swfPath option and that Jplayer.swf is there.",NO_SOLUTION:"Review the jPlayer options: support and supplied.",NO_SUPPORT:"Video or audio formats defined in the supplied option are missing.",URL:"Check media URL is valid.",URL_NOT_SET:"Use setMedia() to set the media URL.",VERSION:"Update jPlayer files."},e.jPlayer.warning={CSS_SELECTOR_COUNT:"e_css_selector_count",CSS_SELECTOR_METHOD:"e_css_selector_method",CSS_SELECTOR_STRING:"e_css_selector_string",OPTION_KEY:"e_option_key"},e.jPlayer.warningMsg={CSS_SELECTOR_COUNT:"The number of methodCssSelectors found did not equal one: ",CSS_SELECTOR_METHOD:"The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",CSS_SELECTOR_STRING:"The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",OPTION_KEY:"The option requested in jPlayer('option') is undefined."},e.jPlayer.warningHint={CSS_SELECTOR_COUNT:"Check your css selector and the ancestor.",CSS_SELECTOR_METHOD:"Check your method name.",CSS_SELECTOR_STRING:"Check your css selector is a string.",OPTION_KEY:"Check your option name."}}(jQuery);