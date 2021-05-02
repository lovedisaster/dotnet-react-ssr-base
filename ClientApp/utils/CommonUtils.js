import {cloneDeep} from "lodash";

export const IsNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export const GetCurrentMilYearBase = () => {
  const year = new Date().getFullYear();
  return Math.floor((year-1)/100);
}

/*Currency Formater*/
export const NumberFormat = (n) => {
  //convert decimal to interger
  n = parseInt(n);
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/* As we are still responsive, we will read by width */
export const IsMobi = () => {
  return (window.innerWidth < Number(GS.media.sm_m.replace('px','')));
}
/* As we are still responsive, we will read by width */
export const IsPhone = () => {
  return (window.innerWidth < Number(GS.media.xs_m.replace('px','')));
}

export const IsEmptyObject = (obj) => {
    return (JSON.stringify(obj) === '{}' || JSON.stringify(obj) === '[]' || obj === '' || obj === null || obj === undefined);
} 

//check if the script is already added
export const IsScriptLoaded = (url) => {
  if (!url){
    return false;
  }
  var scripts = document.getElementsByTagName('script');
  for (var i = scripts.length; i--;) {
      if (scripts[i].src == url) {
        return true;
      }
  }
  return false;
}

export const TrimSlash = (str) => {
    return str.replace(/\\/g, '');
}

export const IsProd = () => {
    return (ENV === 'Production' && !IsStaging()) ;
}

export const IsIE = () => {
    var ua = window.navigator.userAgent;
    
    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
    
    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
    
    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
    
    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
    
    var msie = ua.indexOf('MSIE ');
    // var trident = ua.indexOf('Trident/');
    var trident = 0; //Temperarily allow IE11

    if (msie > 0 || trident > 0) {
        return true
    }
    
    return false;
}


const IsStaging = () => {
    if(CLIENT){
      return (window.location.hostname.indexOf('csstg') > -1);
    }
    return false;
}

//Remove existing script
export const RemoveCurrentScript = (url) => {
  if (!url){
    return;
  }
  var scripts = document.getElementsByTagName('script');
  for (var i = scripts.length; i--;) {
    if (scripts[i].src == url) {
      document.body.removeChild(scripts[i])
    }
  }
}

export const DeepClone = (o) => {
    const output = _.cloneDeep(o);
    return output;
    /* 
       The following piece of code have bugs when coloning 
       object with Regex, but please don't remove them for now 

          if(o == {}) {
              return '';
          }
          
          let output, v, key;
          output = Array.isArray(o) ? [] : {};
          for (key in o) {
              v = o[key];
              if(v === null || v === undefined) {
                  output[key] = v;
              }
              output[key] = (typeof v === "object") ? DeepClone(v) : v;
          }

          return output;
    */
}

// Main function
export const ScrollToY = (scrollTargetY, speed, easing) => {
      window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function( callback ){
                  window.setTimeout(callback, 1000 / 60);
                };
      })();

    // scrollTargetY: the target scrollY property of the window
    // speed: time in pixels per second
    // easing: easing equation to use

    var scrollY = window.scrollY || document.documentElement.scrollTop,
        scrollTargetY = scrollTargetY || 0,
        speed = speed || 2000,
        easing = easing || 'easeOutSine',
        currentTime = 0;

    // min time .1, max time .8 seconds
    var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    var easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };

    // add animation loop
    function tick() {
        currentTime += 1 / 60;

        var p = currentTime / time;
        var t = easingEquations[easing](p);

        if (p < 1) {
            requestAnimFrame(tick);
            window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
        } else {
            window.scrollTo(0, scrollTargetY);
        }
    }

    // call it once to get started
    tick();
};
