      var $pageflip = $('#pageflip'),
      pageflip = $pageflip.pageflip();

      /* MEET PAGEFLIP CUSTOM FUNCTIONS */
      var animmode = 1,
        animbtns = [ "#animateontop", "#animateonvisible" ],
        loop = false,
        rot = 0,
        target,
        zooming = false,
        CustomPFEventHandler = {
          onFlip: function( PN )  {
            if( PN==18 ) $("#isflipping").addClass("selected");
          },
          onFlipEnd: function( PN ) {
            if( PN==18 ) $("#isflipping").removeClass("selected");
          },
          onTop: function( PN ) {
            if( PN==21 && animmode==0 ) startLoop();
            if( PN==18 ) $("#isontop").addClass("selected");
          },
          onTopEnd: function( PN ) {
            if( PN==21 && animmode==0 ) stopLoop();
            if( PN==18 ) $("#isontop").removeClass("selected");
          },
          onLoad: function( PN ) {
            if( PN==11 ) videoInit();
            if( PN==18 ) setZoomFlag();
          },
          onUnload: function( PN ) {
            if( PN==21 && animmode==1 ) stopLoop();
          },
          onHide: function( PN ) {
            if( PN==21 && animmode==1 ) stopLoop();
            if( PN==18 ) $("#isvisible").removeClass("selected");
          },
          onShow: function( PN ) {
            if( PN==21 ) {
              if( animmode==1 ) startLoop();
              else setRot();
              animation( animmode );
            }
            if( PN==18 ) $("#isvisible").addClass("selected");
          },
          onZoomIn: function( PN ) {
            zooming = true;
            setZoomFlag();
          },
          onZoomOut: function( PN ) {
            zooming = false;
            setZoomFlag();
          }
        };

      gotoPage = function( p ) {
        pageflip.gotoPage( p, true );
      }
      videoPlay = function() {
        var myVideo = document.getElementById("thevideo");
        if (myVideo.paused) myVideo.play();
        else myVideo.pause();
      }
      videoInit = function() {
        //var myVideo = document.getElementById("thevideo");
      }
      selectFeature = function( f ) {
        $(".features").addClass("off");
        $("#feature"+f).removeClass("off");
        $("#featurelist ul li").removeClass("selected");
        $("#option"+f).addClass("selected");
      }
      animation = function( t ) {
        animmode = t;
        $(".animationcontrol").removeClass("selected");
        $(animbtns[t]).addClass("selected");
      }
      theLoop = function() {
        if( loop ) raf2( theLoop );
        setRot();
      }
      setRot = function() {
        $("#spiral").css( { transform: "rotate("+rot+"deg)" } );
        rot = ( rot+4 )%360;
      }
      startLoop = function() {
        if( !loop ) {
          loop = true;
          theLoop();
        }
      }
      stopLoop = function() {
        loop = false;
      }
      setZoomFlag = function() {
        if( zooming ) $("#iszooming").addClass("selected");
        else $("#iszooming").removeClass("selected");
      }
      window.raf2 = (function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ) {
            window.setTimeout( callback, 100/6 );
        };
      })();
      pageflip.setPFEventCallBack( CustomPFEventHandler );
      /* END MEET PAGEFLIP CUSTOM FUNCTIONS */


      /* Initialize & Start Pageflip 5 */
      $pageflip.pageflipInit( {
        /* Configuration options */
          PageDataFile: "templates/history.html",
          PageWidth: 900,
          PageHeight: 600,
          FullScreenEnabled: true,
          Transparency: true,
          Margin: 32,
          MarginBottom: 64,
          AutoScale: true,
          FullScale: true,
          AlwaysOpened: false,
          AutoFlipLoop: -1,
          CenterSinglePage: true,
          DropShadowOpacity: 0.3,
          FlipTopShadowOpacity: 0.2,
          FlipShadowOpacity: 0.2,
          HardFlipOpacity: 0.3,
          EmbossOpacity: 0.2,
          SecondaryDragArea: 32,
          Transparency: true,
          ControlbarFile: "common/controlbar_svg.html",
          GoogleAnalytics: true,
          HashControl: true,
          ShowCopyright: false,
          Copyright: Key.Copyright,
          Key: Key.Key
        /* book ID - used as CSS class name */
      }, "meetpageflip" );
