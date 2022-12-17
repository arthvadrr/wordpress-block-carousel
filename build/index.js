/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");


/*
TODO
1. fix media settings accordion
1. Index btn types
X. width settings
1. block margin/padding
1. overlay
1. overlay linear gradients
X. background-image settings
X. When an image is selected, "Choose image" should say "replace"
1. innercontent positioning
1. innercontent max-width
1. figure out what's wrong with inspector padding (panel?)
1. icons for the block controls
1. slide transitions
1. slide button padding
1. add innerDiv for vertical alignment
1. focal point picker reset button
1. Create pre-defined blocks and inspector inputs to populate them
1. Add default options/settings when a user creates a new instance of the block
*/







const ALLOWED_MEDIA_TYPES = ['image'];
function Edit(_ref) {
  let {
    attributes,
    setAttributes,
    clientId
  } = _ref;
  const {
    slideData,
    slideAmount,
    currentSlide,
    indexBtnColor,
    slideHeight,
    verticalAlignment,
    innerContentMaxWidth
  } = attributes;

  // Block state
  const [slideData_$array, setSlideData_$array] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(slideData);
  const [slideAmount_$number, setSlideAmount_$number] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(slideAmount);
  const [currentSlide_$number, setCurrentSlide_$number] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(currentSlide);
  const [indexBtnColor_$string, setIndexBtnColor_$string] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(indexBtnColor);
  const [slideHeight_$number, setSlideHeight_$number] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(slideHeight);
  const [verticalAlignment_$string, setVerticalAlignment_$string] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(verticalAlignment);
  const [innerContentMaxWidth_$number, setInnerContentMaxWidth_$number] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(innerContentMaxWidth);
  const [showBackgroundOverlay_$boolean, setShowBackgroundOverlay_$boolean] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);

  // React state
  const [showSlideBackgroundColorPicker_$boolean, setShowSlideBackgroundColorPicker_$boolean] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setAttributes({
      slideData: slideData_$array
    });
    setAttributes({
      slideAmount: slideAmount_$number
    });
    setAttributes({
      currentSlide: currentSlide_$number
    });
    setAttributes({
      indexBtnColor: indexBtnColor_$string
    });
    setAttributes({
      slideHeight: slideHeight_$number
    });
  }, [slideData_$array, slideAmount_$number, currentSlide_$number]);
  const setSlideBackgroundImageAltText = newAltText => {
    const shallowArr = Array.from(slideData_$array);
    shallowArr[currentSlide_$number].backgroundImageAltText = newAltText;
    setSlideData_$array(shallowArr);
    setAttributes({
      slideData: slideData_$array
    });
  };
  const toggleGradientPicker = () => {
    const shallowArr = Array.from(slideData_$array);
    const isGradient = shallowArr[currentSlide_$number].overlay.isGradient;
    shallowArr[currentSlide_$number].overlay.isGradient = !isGradient;
    setSlideData_$array(shallowArr);
    setAttributes({
      slideData: slideData_$array
    });
  };
  const setOverlayColor = (color, pos) => {
    const shallowArr = Array.from(slideData_$array);
    shallowArr[currentSlide_$number].overlay[pos] = color;
    setSlideData_$array(shallowArr);
    setAttributes({
      slideData: slideData_$array
    });
  };
  const toggleParallax = () => {
    const shallowArr = Array.from(slideData_$array);
    const hasParallax = shallowArr[currentSlide_$number].hasParallax;
    shallowArr[currentSlide_$number].hasParallax = !hasParallax;
    setSlideData_$array(shallowArr);
    setAttributes({
      slideData: slideData_$array
    });
  };
  const toggleBackgroundSizeContain = () => {
    const shallowArr = Array.from(slideData_$array);
    const backgroundSize = shallowArr[currentSlide_$number].backgroundSizeContain;
    shallowArr[currentSlide_$number].backgroundSizeContain = !backgroundSize;
    setSlideData_$array(shallowArr);
    setAttributes({
      slideData: slideData_$array
    });
  };
  const toggleBackgroundRepeat = () => {
    const shallowArr = Array.from(slideData_$array);
    const backgroundRepeat = shallowArr[currentSlide_$number].backgroundRepeat;
    shallowArr[currentSlide_$number].backgroundRepeat = !backgroundRepeat;
    setSlideData_$array(shallowArr);
    setAttributes({
      slideData: slideData_$array
    });
  };
  const updateSlideAmount = value => {
    const shallowArr = Array.from(slideData_$array);
    const diff = Math.abs(value - slideAmount_$number);
    if (value < slideAmount_$number) {
      if (currentSlide_$number > value - 1) {
        setCurrentSlide_$number(value - 1);
        setAttributes({
          currentSlide: currentSlide_$number
        });
      }
      for (let i = 0; i < diff; i++) shallowArr.pop();
    } else {
      for (let i = 0; i < diff; i++) shallowArr.push({
        "backgroundImageUrl": "",
        "backgroundImageAltText": "",
        "showFocalPointPicker": "",
        "imperativeFocalPointPreview": "",
        "focalPoint": "",
        "hasParallax": false,
        "overlay": {
          "color1": "#fff",
          "color2": "#fff",
          "direction": "to bottom",
          "isGradient": false
        }
      });
    }
    setSlideAmount_$number(value);
    setSlideData_$array(shallowArr);
    setAttributes({
      slideData: slideData_$array
    });
  };
  const setVerticalAlignment = alignment => setVerticalAlignment_$string(alignment);
  const updateGradientDirection = dir => {
    const shallowArr = Array.from(slideData_$array);
    shallowArr[currentSlide_$number].overlay.direction = dir;
    setSlideData_$array(shallowArr);
    setAttributes({
      slideData: slideData_$array
    });
  };
  const updateSlideBackgroundImageUrl = url => {
    const shallowArr = Array.from(slideData_$array);
    shallowArr[currentSlide_$number].backgroundImageUrl = url;
    setSlideData_$array(shallowArr);
    setAttributes({
      slideData: slideData_$array
    });
  };
  const updateSlideBackgroundColor = color => {
    const shallowArr = Array.from(slideData_$array);
    shallowArr[currentSlide_$number].backgroundColor = color;
    setSlideData_$array(shallowArr);
    setAttributes({
      slideData: slideData_$array
    });
  };
  const wordpressBlockCarouselStyles = {
    height: `${slideHeight_$number}vh`,
    backgroundColor: slideData_$array[currentSlide_$number].backgroundColor
  };
  const overlayStyles = {
    backgroundColor: slideData_$array[currentSlide_$number].overlay["color1"],
    backgroundImage: slideData_$array[currentSlide_$number].overlay.isGradient ? `linear-gradient(to ${slideData_$array[currentSlide_$number].overlay.direction}, ${slideData_$array[currentSlide_$number].overlay["color1"]}, ${slideData_$array[currentSlide_$number].overlay["color2"]}` : ''
  };
  const slideStyles = {
    backgroundImage: `url(${slideData_$array[currentSlide_$number].backgroundImageUrl})`,
    backgroundAttachment: `${slideData_$array[currentSlide_$number].hasParallax ? 'fixed' : 'scroll'}`,
    backgroundSize: `${slideData_$array[currentSlide_$number].backgroundSizeContain ? 'contain' : 'cover'}`,
    backgroundRepeat: `${slideData_$array[currentSlide_$number].backgroundRepeat ? 'repeat' : 'no-repeat'}`,
    backgroundPosition: `${slideData_$array[currentSlide_$number].focalPoint["x"] * 100}% ${slideData_$array[currentSlide_$number].focalPoint["y"] * 100}%`,
    height: `${slideHeight_$number}vh`
  };
  const slideContentInnerStyles = {
    maxWidth: `${innerContentMaxWidth_$number ? innerContentMaxWidth_$number + "px" : 'none'}`
  };
  const indexBtnStyles = {
    backgroundColor: `${indexBtnColor_$string}`
  };
  const setFocalPoint = newFocalPoint => {
    const shallowArr = Array.from(slideData_$array);
    shallowArr[currentSlide_$number].focalPoint = newFocalPoint;
    setSlideData_$array(shallowArr);
    setAttributes({
      slideData: slideData_$array
    });
  };
  const createGradientDirectionButtons = () => {
    const dirArr = [["top", "↑"], ["top right", "↗"], ["right", "→"], ["bottom", "↓"], ["bottom right", "↘"], ["bottom left", "↙"], ["left", "←"], ["top left", "↖"]];
    return dirArr.map((arr, index) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
        key: index,
        "aria-label": `to ${arr[0]}`,
        onClick: () => updateGradientDirection(arr[0]),
        className: slideData_$array[currentSlide_$number].overlay.direction === arr[0] ? 'set-gradient-dir active' : 'set-gradient-dir'
      }, arr[1]);
    });
  };
  const createSlidePanels = () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, null, !!slideData_$array[currentSlide_$number].backgroundImageUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Media settings')
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Fixed background'),
      checked: slideData_$array[currentSlide_$number].hasParallax,
      onChange: () => toggleParallax()
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Contain background'),
      checked: slideData_$array[currentSlide_$number].backgroundSizeContain,
      onChange: () => toggleBackgroundSizeContain()
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Repeat background'),
      checked: slideData_$array[currentSlide_$number].backgroundRepeat,
      onChange: () => toggleBackgroundRepeat()
    })), slideData_$array[currentSlide_$number].backgroundImageUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.FocalPointPicker, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Focal point picker'),
      url: slideData_$array[currentSlide_$number].backgroundImageUrl,
      value: slideData_$array[currentSlide_$number].focalPoint,
      onDragStart: setFocalPoint,
      onDrag: setFocalPoint,
      onChange: setFocalPoint
    }), slideData_$array[currentSlide_$number].backgroundImageUrl && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextareaControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Alt text (alternative text)'),
      value: slideData_$array[currentSlide_$number].backgroundImageAltText,
      onChange: newAlt => setSlideBackgroundImageAltText(newAlt),
      help: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ExternalLink, {
        href: "https://www.w3.org/WAI/tutorials/images/decision-tree"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Describe the purpose of the image')), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Leave empty if the image is purely decorative.'))
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      variant: "secondary",
      isSmall: true,
      className: "block-library-cover__reset-button",
      onClick: () => updateSlideBackgroundImageUrl("")
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Clear Media')))));
  };
  const createSlideBtns = () => {
    const btnArr = [];
    for (let i = 0; i < slideAmount_$number; i++) {
      btnArr.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
        className: "wp-car-btn slide-index-btn",
        key: `slide-${i}`,
        onClick: () => setCurrentSlide_$number(i),
        "aria-label": `Go to slide ${i}`,
        style: indexBtnStyles
      }));
    }
    return btnArr;
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.useBlockProps)(), {
    style: wordpressBlockCarouselStyles
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Amount of slides for the carousel'),
    value: slideAmount_$number,
    onChange: value => updateSlideAmount(value),
    min: 1,
    max: 10
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Block min height'),
    value: slideHeight_$number,
    onChange: value => setSlideHeight_$number(value),
    min: 10,
    max: 100,
    step: 2
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Inner content max-width (0 is no max)'),
    value: innerContentMaxWidth_$number,
    onChange: value => setInnerContentMaxWidth_$number(value),
    min: 0,
    max: 1200,
    step: 1
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Panel, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("h3", {
    className: "block-editor-block-card__title"
  }, "Slide index button color"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPicker, {
    color: indexBtnColor_$string,
    onChange: color => setIndexBtnColor_$string(color),
    enableAlpha: true,
    defaultValue: indexBtnColor
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Panel, null, createSlidePanels())), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "slide",
    style: slideStyles
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.BlockControls, {
    group: "other"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.BlockVerticalAlignmentControl, {
    onChange: setVerticalAlignment,
    value: verticalAlignment_$string
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.MediaUploadCheck, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.MediaUpload, {
    onSelect: media => updateSlideBackgroundImageUrl(media.url),
    render: _ref2 => {
      let {
        open
      } = _ref2;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
        onClick: open,
        className: "wp-car-btn"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, `${slideData_$array[currentSlide_$number].backgroundImageUrl ? 'Replace Image' : 'Select Image'}`));
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "slide-background-color-picker-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: `wp-car-btn block-inspector-background-color-picker-toggle ${showSlideBackgroundColorPicker_$boolean && "toggled"}`,
    onClick: () => setShowSlideBackgroundColorPicker_$boolean(!showSlideBackgroundColorPicker_$boolean)
  }, "Background Color"), showSlideBackgroundColorPicker_$boolean && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPicker, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Slide background color'),
    className: "slide-background-color-picker",
    color: slideData_$array[currentSlide_$number].backgroundColor,
    onChange: color => updateSlideBackgroundColor(color),
    enableAlpha: true,
    defaultValue: indexBtnColor
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "slide-overlay-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: `wp-car-btn block-inspector-overlay-settings ${showBackgroundOverlay_$boolean && "toggled"}`,
    onClick: () => setShowBackgroundOverlay_$boolean(!showBackgroundOverlay_$boolean)
  }, "Overlay Settings"), showBackgroundOverlay_$boolean && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "block-inspector-overlay-settings-inner"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Gradient overlay?'),
    checked: slideData_$array[currentSlide_$number].overlay.isGradient,
    onChange: () => toggleGradientPicker()
  }), slideData_$array[currentSlide_$number].overlay.isGradient && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "gradient-direction"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("h3", {
    className: "components-base-control__label"
  }, "Gradient Direction"), createGradientDirectionButtons()), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPicker, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Slide overlay color start'),
    className: "slide-background-color-picker",
    color: slideData_$array[currentSlide_$number].overlay["color1"],
    onChange: color => setOverlayColor(color, "color1"),
    defaultValue: slideData_$array[currentSlide_$number].overlay["color1"],
    enableAlpha: true
  }), slideData_$array[currentSlide_$number].overlay.isGradient && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPicker, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Slide overlay color end'),
    className: "slide-background-color-picker",
    color: slideData_$array[currentSlide_$number].overlay["color2"],
    onChange: color => setOverlayColor(color, "color2"),
    defaultValue: slideData_$array[currentSlide_$number].overlay["color2"],
    enableAlpha: true
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "slide-overlay-container",
    style: overlayStyles
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "slide-content"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "slide-content-inner",
    style: slideContentInnerStyles
  }, "TODO insert pre-defined blocks")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "slide-btn-container"
  }, createSlideBtns()))));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ save; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);


function save(_ref) {
  let {
    attributes
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save(), attributes.url, attributes.slideData);
}

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _extends; }
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ (function(module) {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"create-block/wordpress-block-carousel","version":"0.1.0","title":"Wordpress Block Carousel","category":"widgets","icon":"cover-image","description":"Example block scaffolded with Create Block tool.","attributes":{"slideData":{"type":"array","default":[{"backgroundColor":"#ffffff","backgroundImageUrl":"","backgroundSizeContain":false,"backgroundRepeat":false,"backgroundImageAltText":"","showFocalPointPicker":"","imperativeFocalPointPreview":"","focalPoint":{"x":0.5,"y":0.5},"hasParallax":false,"verticalAlign":"center","overlay":{"color1":"#ffffff00","color2":"#ffffff00","direction":"bottom","isGradient":true}}]},"innerContentMaxWidth":{"type":"number"},"verticalAlignment":{"type":"string"},"slideHeight":{"type":"number","default":30},"indexBtnColor":{"type":"string","default":"#ffffff"},"slideAmount":{"type":"number","default":1},"currentSlide":{"type":"number","default":0}},"supports":{"html":false,"align":true},"textdomain":"wordpress-block-carousel","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwordpress_block_carousel"] = self["webpackChunkwordpress_block_carousel"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map