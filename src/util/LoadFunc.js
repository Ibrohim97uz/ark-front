export function loadScript() {
    let urlListBody = ["./assets/js/mainb2d8.js", "./assets/js/slick.minc8f9.js",
        "./assets/js/services8a54.js", "./assets/js/jquery.fancyboxc8f9.js",
        "./assets/js/jquery.directional-hoverc8f9.js", "./assets/js/jquery.fancybox-thumbsc8f9.js",
        "./assets/js/gallery8a54.js"];
    let textScriptBody = [
        " var htmlDiv = document.getElementById(\"rs-plugin-settings-inline-css\");\n" +
        "  var htmlDivCss = \".tp-caption.black,.black{color:#000;text-shadow:none}\";\n" +
        "  if (htmlDiv) {\n" +
        "    htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;\n" +
        "  } else {\n" +
        "    var htmlDiv = document.createElement(\"div\");\n" +
        "    htmlDiv.innerHTML = \"<style>\" + htmlDivCss + \"</style>\";\n" +
        "    document.getElementsByTagName(\"head\")[0].appendChild(htmlDiv.childNodes[0]);\n" +
        "  }",
        "  setREVStartSize({\n" +
        "  c: jQuery('#rev_slider_11_1'),\n" +
        "  responsiveLevels: [1240, 1024, 778, 480],\n" +
        "  gridwidth: [1240, 1024, 778, 480],\n" +
        "  gridheight: [868, 768, 960, 720],\n" +
        "  sliderLayout: 'fullscreen',\n" +
        "  fullScreenAutoWidth: 'off',\n" +
        "  fullScreenAlignForce: 'off',\n" +
        "  fullScreenOffsetContainer: '',\n" +
        "  fullScreenOffset: ''\n" +
        "});\n" +
        "var revapi11, tpj = jQuery;\n" +
        "tpj(document).ready(function () {\n" +
        "  if (tpj(\"#rev_slider_11_1\").revolution == undefined) {\n" +
        "    revslider_showDoubleJqueryError(\"#rev_slider_11_1\");\n" +
        "  } else {\n" +
        "    revapi11 = tpj(\"#rev_slider_11_1\").show().revolution({\n" +
        "      sliderType: \"standard\",\n" +
        "      jsFileLocation: \"//www.oecl.sg/wp-content/plugins/revslider/public/assets/js/\",\n" +
        "      sliderLayout: \"fullscreen\",\n" +
        "      dottedOverlay: \"none\",\n" +
        "      delay: 90000,\n" +
        "      navigation: {\n" +
        "        keyboardNavigation: \"off\",\n" +
        "        keyboard_direction: \"horizontal\",\n" +
        "        mouseScrollNavigation: \"off\",\n" +
        "        mouseScrollReverse: \"default\",\n" +
        "        onHoverStop: \"off\",\n" +
        "        arrows: {\n" +
        "          style: \"zeus\",\n" +
        "          enable: true,\n" +
        "          hide_onmobile: false,\n" +
        "          hide_onleave: false,\n" +
        "          tmp: '<div class=\"tp-title-wrap\">   <div class=\"tp-arr-imgholder\"></div> </div>',\n" +
        "          left: {h_align: \"left\", v_align: \"center\", h_offset: 20, v_offset: 0},\n" +
        "          right: {h_align: \"right\", v_align: \"center\", h_offset: 20, v_offset: 0}\n" +
        "        }\n" +
        "      },\n" +
        "      responsiveLevels: [1240, 1024, 778, 480],\n" +
        "      visibilityLevels: [1240, 1024, 778, 480],\n" +
        "      gridwidth: [1240, 1024, 778, 480],\n" +
        "      gridheight: [868, 768, 960, 720],\n" +
        "      lazyType: \"none\",\n" +
        "      shadow: 0,\n" +
        "      spinner: \"spinner2\",\n" +
        "      stopLoop: \"off\",\n" +
        "      stopAfterLoops: -1,\n" +
        "      stopAtSlide: -1,\n" +
        "      shuffle: \"off\",\n" +
        "      autoHeight: \"off\",\n" +
        "      fullScreenAutoWidth: \"off\",\n" +
        "      fullScreenAlignForce: \"off\",\n" +
        "      fullScreenOffsetContainer: \"\",\n" +
        "      fullScreenOffset: \"\",\n" +
        "      disableProgressBar: \"on\",\n" +
        "      hideThumbsOnMobile: \"off\",\n" +
        "      hideSliderAtLimit: 0,\n" +
        "      hideCaptionAtLimit: 0,\n" +
        "      hideAllCaptionAtLilmit: 0,\n" +
        "      debugMode: false,\n" +
        "      fallbacks: {simplifyAll: \"off\", nextSlideOnWindowFocus: \"off\", disableFocusListener: false,}\n" +
        "    });\n" +
        "  }\n" +
        "});",

        "  var htmlDivCss = ' #rev_slider_11_1_wrapper .tp-loader.spinner2{ background-color: #FFFFFF !important; } ';\n" +
        "  var htmlDiv = document.getElementById('rs-plugin-settings-inline-css');\n" +
        "  if (htmlDiv) {\n" +
        "    htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;\n" +
        "  } else {\n" +
        "    var htmlDiv = document.createElement('div');\n" +
        "    htmlDiv.innerHTML = '<style>' + htmlDivCss + '</style>';\n" +
        "    document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[0]);\n" +
        "  }"
        ,
        "var htmlDivCss = unescape(\".wpb_revslider_element%20.text-red%20%7B%0A%20%20%20%20color%3A%20%23db0f31%20%21important%3B%0A%20%7D%0A%0A.hesperiden.tparrows%20%7B%0A%20%20%20%20opacity%3A%200.3%3B%20%0A%20%7D%0A%20%20%20%20%0A%20.hesperiden.tparrows%3Ahover%20%7B%0A%20%20%20%20opacity%3A%200.8%3B%20%0A%20%7D\");\n" +
        "var htmlDiv = document.getElementById('rs-plugin-settings-inline-css');\n" +
        "if (htmlDiv) {\n" +
        "  htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;\n" +
        "} else {\n" +
        "  var htmlDiv = document.createElement('div');\n" +
        "  htmlDiv.innerHTML = '<style>' + htmlDivCss + '</style>';\n" +
        "  document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[0]);\n" +
        "}",
        "var htmlDivCss = unescape(\"%23rev_slider_11_1%20.zeus.tparrows%20%7B%0A%20%20cursor%3Apointer%3B%0A%20%20min-width%3A70px%3B%0A%20%20min-height%3A70px%3B%0A%20%20position%3Aabsolute%3B%0A%20%20display%3Ablock%3B%0A%20%20z-index%3A100%3B%0A%20%20border-radius%3A50%25%3B%20%20%20%0A%20%20overflow%3Ahidden%3B%0A%20%20background%3Argba%280%2C0%2C0%2C0.1%29%3B%0A%7D%0A%0A%23rev_slider_11_1%20.zeus.tparrows%3Abefore%20%7B%0A%20%20font-family%3A%20%22revicons%22%3B%0A%20%20font-size%3A20px%3B%0A%20%20color%3Argb%28255%2C%20255%2C%20255%29%3B%0A%20%20display%3Ablock%3B%0A%20%20line-height%3A%2070px%3B%0A%20%20text-align%3A%20center%3B%20%20%20%20%0A%20%20z-index%3A2%3B%0A%20%20position%3Arelative%3B%0A%7D%0A%23rev_slider_11_1%20.zeus.tparrows.tp-leftarrow%3Abefore%20%7B%0A%20%20content%3A%20%22%5Ce824%22%3B%0A%7D%0A%23rev_slider_11_1%20.zeus.tparrows.tp-rightarrow%3Abefore%20%7B%0A%20%20content%3A%20%22%5Ce825%22%3B%0A%7D%0A%0A%23rev_slider_11_1%20.zeus%20.tp-title-wrap%20%7B%0A%20%20background%3Argba%280%2C0%2C0%2C0.5%29%3B%0A%20%20width%3A100%25%3B%0A%20%20height%3A100%25%3B%0A%20%20top%3A0px%3B%0A%20%20left%3A0px%3B%0A%20%20position%3Aabsolute%3B%0A%20%20opacity%3A0%3B%0A%20%20transform%3Ascale%280%29%3B%0A%20%20-webkit-transform%3Ascale%280%29%3B%0A%20%20%20transition%3A%20all%200.3s%3B%0A%20%20-webkit-transition%3Aall%200.3s%3B%0A%20%20-moz-transition%3Aall%200.3s%3B%0A%20%20%20border-radius%3A50%25%3B%0A%20%7D%0A%23rev_slider_11_1%20.zeus%20.tp-arr-imgholder%20%7B%0A%20%20width%3A100%25%3B%0A%20%20height%3A100%25%3B%0A%20%20position%3Aabsolute%3B%0A%20%20top%3A0px%3B%0A%20%20left%3A0px%3B%0A%20%20background-position%3Acenter%20center%3B%0A%20%20background-size%3Acover%3B%0A%20%20border-radius%3A50%25%3B%0A%20%20transform%3Atranslatex%28-100%25%29%3B%0A%20%20-webkit-transform%3Atranslatex%28-100%25%29%3B%0A%20%20%20transition%3A%20all%200.3s%3B%0A%20%20-webkit-transition%3Aall%200.3s%3B%0A%20%20-moz-transition%3Aall%200.3s%3B%0A%0A%20%7D%0A%23rev_slider_11_1%20.zeus.tp-rightarrow%20.tp-arr-imgholder%20%7B%0A%20%20%20%20transform%3Atranslatex%28100%25%29%3B%0A%20%20-webkit-transform%3Atranslatex%28100%25%29%3B%0A%20%20%20%20%20%20%7D%0A%23rev_slider_11_1%20.zeus.tparrows%3Ahover%20.tp-arr-imgholder%20%7B%0A%20%20transform%3Atranslatex%280%29%3B%0A%20%20-webkit-transform%3Atranslatex%280%29%3B%0A%20%20opacity%3A1%3B%0A%7D%0A%20%20%20%20%20%20%0A%23rev_slider_11_1%20.zeus.tparrows%3Ahover%20.tp-title-wrap%20%7B%0A%20%20transform%3Ascale%281%29%3B%0A%20%20-webkit-transform%3Ascale%281%29%3B%0A%20%20opacity%3A1%3B%0A%7D%0A%20%0A\");\n" +
        "var htmlDiv = document.getElementById('rs-plugin-settings-inline-css');\n" +
        "if (htmlDiv) {\n" +
        "  htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;\n" +
        "} else {\n" +
        "  var htmlDiv = document.createElement('div');\n" +
        "  htmlDiv.innerHTML = '<style>' + htmlDivCss + '</style>';\n" +
        "  document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[0]);\n" +
        "}"

    ];

    let loadScriptUrlBody = function (src) {
        for (let i = 0; i < src.length; i++) {
            let tag = document.createElement("script");
            tag.async = false;
            tag.src = src[i];
            document.body.prepend(tag);
        }
    };
    let loadScriptText = function (textScript) {

        for (let i = 0; i < textScript.length; i++) {
            let script = document.createElement("script");
            script.innerHTML = textScript[i];
            document.body.prepend(script);
        }


    };
    loadScriptText(textScriptBody);
    loadScriptUrlBody(urlListBody);

  document.body.className=""
}
