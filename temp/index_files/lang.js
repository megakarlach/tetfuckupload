var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

function selectLang(selector) {
	langSelection.collapseLandLangPulldown();
   changelang(selector);
}

function hiLight(langImg, idx, over) {
   langImg.src = (over) ? langOverImgs[idx].src : langImgs[idx].src;
}

function autoSenseLang() {
    try {
        var url = window.location.href;
        var locale = getLocale();
        if (undefined == locale) {
            return;
        }
        if ('en_US' != locale && url.indexOf('/' + locale + '/') == -1) {
            window.location.href = '/' + locale;
        }
    }
    catch (error) {
        ;
    }
}

function getLangFromURL() {
    var url = window.location.href;
    var lang = locales[0];
    for (var i=1; i < locales.length; i++) {
        if (url.indexOf('/' + locales[i] + '/') != -1) {
            lang = locales[i];
            break;
        }
    }
    return lang;
}



function getUnique(max) {
    var now = new Date();
    return (now.getMilliseconds() * Math.floor(Math.random()*max+1));
}

function isWin() {
    return (navigator.platform.indexOf('Win') != -1);
}

function isVista() {
    return (navigator.userAgent.indexOf("Windows NT 6.0") != -1);
}

function isMac() {
    return (navigator.platform.indexOf('Mac') != -1);
}

function isLinux() {
    return (navigator.platform.indexOf('Linux') != -1);
}


function changelang(selector)
{	
	arr = lang_explode("&setlang=",location.href);
	arr = lang_explode("?setlang=",arr[0]);
	url = arr[0];
	arr2 = lang_explode("?",url);	
	if (arr2.length == 1) sign = '?';	
	else sign = '&';
	location.href=url + sign + 'setlang=' + selector;
}



function addCacheBreakerToURL(url) {
    var ran_number= getUnique(8);
    var firstLetter = (url.indexOf('?')<0) ? '?' : '&';
    return url + firstLetter + 'bznetid=' + ran_number;
}

function langSwitcher(divID){
	
	this.startPointID	= divID;
	this.langDiv		= null;
	this.startPoint		= null;
	this.isOpened		= false;
	this.mouseIsIn		= false;

	$j(document).click(function(e){langSelection.documentClick(e);});
	this.turn = function(){
		if(this.startPoint == null) this.startPoint = document.getElementById(this.startPointID);

		if(this.startPoint == null) {
			alert('Cannot find start point');
			return;
		}

		if (this.isOpened) this.collapseLandLangPulldown();
		else this.expandLangPulldown();
	};
	this.documentClick = function(e) {
		if (e.target.id!=this.startPointID && this.isOpened && !this.mouseIsIn) {
			this.collapseLandLangPulldown();
			
		}
	};
	this.expandLangPulldown = function() {
		if (!this.isOpened ) {
			$j.popupIsOpen = true;
			this.isOpened = true;
			//this.mouseIsIn = true;
			if(!this.langDiv){
				this.langDiv = getLangPulldownMenu(this.startPoint);
				this.langDiv.appendChild(createPulldownDiv());
				$j(this.langDiv).hover(function(){langSelection.mouseIsIn = true;},function(){langSelection.mouseIsIn = false;});
			}
			this.langDiv.style.display='block';
			this.startPoint.className = this.startPoint.className.replace(/a$j/,'m');
		}
	};
	
	this.collapseLandLangPulldown = function() {
	    if (this.langDiv && this.isOpened ) {
	    	$j.popupIsOpen = false;
	    	this.isOpened = false;
	    	this.langDiv.style.display='none';
	    	this.startPoint.className = this.startPoint.className.replace(/m$j/,'a');
	    }
	};
	

	function getLangPulldownMenu(elm) {
	    var pdDiv = createTooltip('langselection');
	    var top = elm.clientY;
	    var pos = findPos(elm);
	    pdDiv.style.left = (pos[0]) + 'px';
	    pdDiv.style.top = (pos[1]+ 29) + 'px';
		
	    return pdDiv;
	}

	function createPulldownDiv() 
	{	
		var div= document.createElement('div');
		div.style.width = "127px";
		div.id = 'langselection';
		for(var selector in langImages){
			var child = document.createElement('a');
			var d = selector;
			child.className = "lng_"+selector;
			child.langSelector = selector;
			child.onclick = function(){selectLang(this.langSelector);};
			div.appendChild(child);
		} 
	    return div;
	}
	
	function createTooltip(id) {
		var tt = document.createElement("DIV");
		tt.id = id;
		tt.style.border='none';
		tt.style.position='absolute';
		document.body.appendChild(tt);
		return tt;
	}

	function findPos(obj) {
		var curleft = 0;
		var curtop = 0;
		if (obj.offsetParent) {
			curleft = obj.offsetLeft
			curtop = obj.offsetTop
			while (obj = obj.offsetParent) {
				curleft += obj.offsetLeft
				curtop += obj.offsetTop
			}
		}
		return [curleft,curtop];
	}
}



function lang_explode (delimiter, string, limit) {
     var emptyArray = { 0: '' };
    
    if ( arguments.length < 2 ||
        typeof arguments[0] == 'undefined' ||        typeof arguments[1] == 'undefined' ) {
        return null;
    }
 
    if ( delimiter === '' ||        delimiter === false ||
        delimiter === null ) {
        return false;
    }
     if ( typeof delimiter == 'function' ||
        typeof delimiter == 'object' ||
        typeof string == 'function' ||
        typeof string == 'object' ) {
        return emptyArray;    }
 
    if ( delimiter === true ) {
        delimiter = '1';
    }    
    if (!limit) {
        return string.toString().split(delimiter.toString());
    } else {
        var partA = splitted.splice(0, limit - 1);
        var partB = splitted.join(delimiter.toString());
        partA.push(partB);
        return partA;    }
}



var langSelection = new langSwitcher('langSelectionSP');





}
/*
     FILE ARCHIVED ON 21:14:10 Dec 31, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 07:11:38 Mar 15, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  exclusion.robots: 0.11
  exclusion.robots.policy: 0.1
  cdx.remote: 0.118
  esindex: 0.012
  LoadShardBlock: 197.54 (6)
  PetaboxLoader3.datanode: 332.267 (8)
  load_resource: 398.866 (2)
  PetaboxLoader3.resolve: 160.563 (2)
*/