/*
TODO
1. fix media settings accordion
1. Index btn types
X. width settings
1. block margin/padding
1. overlay
X. overlay linear gradients
X. background-image settings
X. When an image is selected, "Choose image" should say "replace"
1. innercontent positioning
1. innercontent max-width
1. icons for the block controls
1. slide transitions
1. slide button padding
1. add innerDiv for vertical alignment
1. focal point picker reset button
1. Create pre-defined blocks and inspector inputs to populate them
1. Add default options/settings when a user creates a new instance of the block
*/ 
import { __ } from '@wordpress/i18n';

import { select } from '@wordpress/data';

import {
	Button, 
	RangeControl,
	Panel,
	PanelBody,
	PanelRow,
	TextareaControl,
	ExternalLink,
	FocalPointPicker,
	ToggleControl,
	ColorPicker
} from '@wordpress/components';

import { 
	useBlockProps,
	InnerBlocks,
	BlockControls,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	BlockVerticalAlignmentControl,
} from '@wordpress/block-editor';

import { 
	Fragment as Fragment, 
	useEffect, 
	useState,
} from '@wordpress/element';

import './editor.scss';

const ALLOWED_MEDIA_TYPES = ['image'];

export default function Edit({ attributes, setAttributes }) {
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
	const [slideData_$array, setSlideData_$array] = useState(slideData);
	const [slideAmount_$number, setSlideAmount_$number] = useState(slideAmount);
	const [currentSlide_$number, setCurrentSlide_$number] = useState(currentSlide);
	const [indexBtnColor_$string, setIndexBtnColor_$string] = useState(indexBtnColor);
	const [slideHeight_$number, setSlideHeight_$number] = useState(slideHeight);
	const [verticalAlignment_$string, setVerticalAlignment_$string] = useState(verticalAlignment);
	const [innerContentMaxWidth_$number, setInnerContentMaxWidth_$number] = useState(innerContentMaxWidth);
	const [showBackgroundOverlay_$boolean, setShowBackgroundOverlay_$boolean] = useState(false);
	
	// React state
	const [showSlideBackgroundColorPicker_$boolean, setShowSlideBackgroundColorPicker_$boolean] = useState(false);

	useEffect(() => {
		setAttributes({slideData: slideData_$array});
		setAttributes({slideAmount: slideAmount_$number});
		setAttributes({currentSlide: currentSlide_$number});
		setAttributes({indexBtnColor: indexBtnColor_$string});
		setAttributes({slideHeight: slideHeight_$number});
	}, [
		slideData_$array,
		slideAmount_$number,
		currentSlide_$number,
	])
 
	const setSlideBackgroundImageAltText = newAltText => {
		const shallowArr = Array.from(slideData_$array);
		shallowArr[currentSlide_$number].backgroundImageAltText = newAltText;
		setSlideData_$array(shallowArr);
		setAttributes({slideData: slideData_$array})
	}

	const toggleGradientPicker = () => {
		const shallowArr = Array.from(slideData_$array);
		const isGradient = shallowArr[currentSlide_$number].overlay.isGradient;
		shallowArr[currentSlide_$number].overlay.isGradient = !isGradient;
		setSlideData_$array(shallowArr);
		setAttributes({slideData: slideData_$array});
	}

	const setOverlayColor = (color, pos) => {
		const shallowArr = Array.from(slideData_$array);
		shallowArr[currentSlide_$number].overlay[pos] = color;
		setSlideData_$array(shallowArr);
		setAttributes({slideData: slideData_$array});
	}

	const toggleParallax = () => {
		const shallowArr = Array.from(slideData_$array);
		const hasParallax = shallowArr[currentSlide_$number].hasParallax 
		shallowArr[currentSlide_$number].hasParallax = !hasParallax
		setSlideData_$array(shallowArr);
		setAttributes({slideData: slideData_$array})
	}

	const toggleBackgroundSizeContain = () => {
		const shallowArr = Array.from(slideData_$array);
		const backgroundSize = shallowArr[currentSlide_$number].backgroundSizeContain;
		shallowArr[currentSlide_$number].backgroundSizeContain = !backgroundSize;
		setSlideData_$array(shallowArr);
		setAttributes({slideData: slideData_$array});
	}

	
	const toggleBackgroundRepeat = () => {
		const shallowArr = Array.from(slideData_$array);
		const backgroundRepeat = shallowArr[currentSlide_$number].backgroundRepeat;
		shallowArr[currentSlide_$number].backgroundRepeat = !backgroundRepeat;
		setSlideData_$array(shallowArr);
		setAttributes({slideData: slideData_$array});
	}

	const updateSlideAmount = value => {
		const shallowArr = Array.from(slideData_$array);
		const diff = Math.abs(value - slideAmount_$number);

		if (value < slideAmount_$number) {

			if (currentSlide_$number > value - 1) {
				setCurrentSlide_$number(value - 1);
				setAttributes({currentSlide: currentSlide_$number});
			}
			for (let i = 0; i < diff; i++) shallowArr.pop();

		} else {

			for (let i = 0; i < diff; i++) shallowArr.push({
				"title" : {
					"enabled": true,
					"content": ""
				},
				"subtitle" : {
					"enabled": false,
					"content": ""
				},
				"slideInnerBlock": {
					"margin": 0,
					"padding": 0,
					"reversed": false 
				},
				"backgroundColor": "#ffffff",
				"backgroundImageUrl": "",
				"backgroundSizeContain": false,
				"backgroundRepeat": false, 
				"backgroundImageAltText": "",
				"showFocalPointPicker": "",
				"imperativeFocalPointPreview": "",
				"focalPoint": {
					"x": 0.5, 
					"y": 0.5
				},
				"hasParallax": false,
				"verticalAlign": "center",
				"overlay": {
					"color1": "#ffffff4D",
					"color2": "#ffffff4D",
					"direction": "bottom",
					"isGradient": true
				}
			});

		}

		setSlideAmount_$number(value);
 		setSlideData_$array(shallowArr);
		setAttributes({ slideData: slideData_$array  })
	}

	const setVerticalAlignment = alignment => setVerticalAlignment_$string(alignment);

	const updateGradientDirection = dir => {
		const shallowArr = Array.from(slideData_$array);
		shallowArr[currentSlide_$number].overlay.direction = dir;
		setSlideData_$array(shallowArr);
		setAttributes( {slideData: slideData_$array} );
	}

	const updateSlideBackgroundImageUrl = ( url ) => {
		const shallowArr = Array.from(slideData_$array);
		shallowArr[currentSlide_$number].backgroundImageUrl = url;
		setSlideData_$array(shallowArr);
		setAttributes( {slideData: slideData_$array} );
	}

	const updateSlideBackgroundColor = ( color ) => {
		const shallowArr = Array.from(slideData_$array);
		shallowArr[currentSlide_$number].backgroundColor = color;
		setSlideData_$array(shallowArr);
		setAttributes( {slideData: slideData_$array} )
	}

	const wordpressBlockCarouselStyles = {
		height: `${slideHeight_$number}vh`,
		backgroundColor: slideData_$array[currentSlide_$number].backgroundColor
	}

	const overlayStyles = {
		backgroundColor: slideData_$array[currentSlide_$number].overlay["color1"],
		backgroundImage: slideData_$array[currentSlide_$number].overlay.isGradient ? `linear-gradient(to ${slideData_$array[currentSlide_$number].overlay.direction}, ${slideData_$array[currentSlide_$number].overlay["color1"]}, ${slideData_$array[currentSlide_$number].overlay["color2"]}` : '',
	}
	
	const slideStyles = {
		backgroundImage: `url(${slideData_$array[currentSlide_$number].backgroundImageUrl})`,
		backgroundAttachment: `${slideData_$array[currentSlide_$number].hasParallax ? 'fixed' : 'scroll'}`,
		backgroundSize: `${slideData_$array[currentSlide_$number].backgroundSizeContain ? 'contain' : 'cover'}`,
		backgroundRepeat: `${slideData_$array[currentSlide_$number].backgroundRepeat ? 'repeat' : 'no-repeat'}`,
		backgroundPosition: `${ slideData_$array[currentSlide_$number].focalPoint["x"] * 100 }% ${slideData_$array[currentSlide_$number].focalPoint["y"] * 100 }%`,
		height: `${slideHeight_$number}vh`
	}

	const slideContentInnerStyles = {
		maxWidth: `${innerContentMaxWidth_$number ? innerContentMaxWidth_$number + "px" : 'none'}`,
		padding: `${slideData_$array[currentSlide_$number].slideInnerBlock.padding}`,
		margin: `${slideData_$array[currentSlide_$number].slideInnerBlock.margin}`,
	}

	const indexBtnStyles = {
		backgroundColor: `${indexBtnColor_$string}`
	}

	const setFocalPoint = ( newFocalPoint ) => {
		const shallowArr = Array.from(slideData_$array);
		shallowArr[currentSlide_$number].focalPoint = newFocalPoint
		setSlideData_$array(shallowArr);
		setAttributes( {slideData: slideData_$array} )
	}

	const createGradientDirectionButtons = () => {
		const dirArr = [
			["top", "↑"], 
			["top right", "↗"], 
			["right", "→"], 
			["bottom", "↓"], 
			["bottom right", "↘"], 
			["bottom left", "↙"], 
			["left", "←"], 
			["top left", "↖"]
		];

		return dirArr.map((arr, index) => {
			return (
				<button 
					key={index} 
					aria-label={`to ${arr[0]}`} 
					onClick={() => updateGradientDirection(arr[0])}
					className={slideData_$array[currentSlide_$number].overlay.direction === arr[0] ? 'set-gradient-dir active' : 'set-gradient-dir'}
					>{arr[1]}
				</button>
			)
		})
	}

	const createSlidePanels = () => {
		return (
			<PanelRow>
				{ !! slideData_$array[currentSlide_$number].backgroundImageUrl && (
					<PanelBody title={ __( 'Media settings' ) }>
							<Panel>
								<ToggleControl
									label={ __( 'Fixed background' ) }
									checked={ slideData_$array[currentSlide_$number].hasParallax }
									onChange={ () => toggleParallax() }
								/>
								<ToggleControl
									label={ __( 'Contain background' ) }
									checked={ slideData_$array[currentSlide_$number].backgroundSizeContain }
									onChange={ () => toggleBackgroundSizeContain() }
								/>
								<ToggleControl
									label={ __( 'Repeat background' ) }
									checked={ slideData_$array[currentSlide_$number].backgroundRepeat }
									onChange={ () => toggleBackgroundRepeat() }
								/>
							</Panel>
						{ slideData_$array[currentSlide_$number].backgroundImageUrl && (
							<FocalPointPicker
								label={ __( 'Focal point picker' ) }
								url={ slideData_$array[currentSlide_$number].backgroundImageUrl }
								value={ slideData_$array[currentSlide_$number].focalPoint }
								onDragStart={ setFocalPoint }
                onDrag={ setFocalPoint }
                onChange={ setFocalPoint }
							/>
						) }
						{slideData_$array[currentSlide_$number].backgroundImageUrl &&
								<TextareaControl
									label={ __(
										'Alt text (alternative text)'
									) }
									value={ slideData_$array[currentSlide_$number].backgroundImageAltText }
									onChange={ ( newAlt ) => setSlideBackgroundImageAltText(newAlt)}
									help={
										<>
											<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
												{ __(
													'Describe the purpose of the image'
												) }
											</ExternalLink>
											{ __(
												'Leave empty if the image is purely decorative.'
											) }
										</>
									}
								/>
							}
						<PanelRow>
							<Button
								variant="secondary"
								isSmall
								className="block-library-cover__reset-button"
								onClick={ () => updateSlideBackgroundImageUrl("")}
							>
								{ __( 'Clear Media' ) }
							</Button>
						</PanelRow>
					</PanelBody>
				) }
			</PanelRow>
		);
	}

	const createSlideBtns = () => {
		const btnArr = [];
		
		for (let i = 0; i < slideAmount_$number; i++) {
			btnArr.push(
				<button
					className="wp-car-btn slide-index-btn"
					key={`slide-${i}`} 
					onClick={() => setCurrentSlide_$number(i)}
					aria-label={`Go to slide ${i}`}
					style={ indexBtnStyles }
				>
				</button>
			);
		}

		return btnArr;
	}

	return (
		<div { ...useBlockProps() } style={ wordpressBlockCarouselStyles }>
			<InspectorControls>
				<Panel className="block-carousel-inspector-panel">
					<RangeControl
						label={ __('Amount of slides for the carousel') }
						value={ slideAmount_$number }
						onChange={value => updateSlideAmount(value)}
						min={1}
						max={10}
					/>
					<RangeControl
						label={ __('Block min height') }
						value={ slideHeight_$number }
						onChange={value => setSlideHeight_$number(value)}
						min={10}
						max={100}
						step={2}
					/>
					<RangeControl
						label={ __('Inner content max-width (0 is no max)') }
						value={ innerContentMaxWidth_$number }
						onChange={value => setInnerContentMaxWidth_$number(value)}
						min={0}
						max={1200}
						step={1}
					/>
				</Panel>
				<Panel className="block-carousel-inspector-panel">
				<h3 className="block-editor-block-card__title">Slide index button color</h3>
				<ColorPicker
            color={ indexBtnColor_$string }
            onChange={ color => setIndexBtnColor_$string(color)}
            enableAlpha
            defaultValue={indexBtnColor}
        />
				</Panel>
				<Panel className="block-carousel-inspector-panel">
						{createSlidePanels()}
				</Panel>
			</InspectorControls>
			<div className="slide" style={ slideStyles }>
				<BlockControls group="other">
				<BlockVerticalAlignmentControl
						onChange={ setVerticalAlignment }
						value={ verticalAlignment_$string }
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={( media ) => updateSlideBackgroundImageUrl( media.url )}
							render={ ( { open } ) => (
								<button 
									onClick={ open }
									className="wp-car-btn"
								>
									<span>
										{`${slideData_$array[currentSlide_$number].backgroundImageUrl ? 'Replace Image' : 'Select Image'}`}
									</span>
								</button>
							)}
						/>					
					</MediaUploadCheck>
					<div 
						className="slide-background-color-picker-container"
					>
						<button 
							className={`wp-car-btn block-inspector-background-color-picker-toggle ${showSlideBackgroundColorPicker_$boolean && "toggled"}`}
							onClick={ () => setShowSlideBackgroundColorPicker_$boolean(!showSlideBackgroundColorPicker_$boolean)}
						>Background Color</button>
						{ showSlideBackgroundColorPicker_$boolean &&
							<ColorPicker
								label={ __('Slide background color') }
								className={"slide-background-color-picker"}
								color={ slideData_$array[currentSlide_$number].backgroundColor }
								onChange={ color => updateSlideBackgroundColor( color )} 
								enableAlpha
								defaultValue={indexBtnColor}
							/>
						}
					</div>
					<div 
						className="slide-overlay-container"
					>
						<button 
							className={`wp-car-btn block-inspector-overlay-settings ${showBackgroundOverlay_$boolean && "toggled"}`}
							onClick={ () => setShowBackgroundOverlay_$boolean(!showBackgroundOverlay_$boolean)}
						>Overlay Settings</button>
						{ showBackgroundOverlay_$boolean &&

							<div className="block-inspector-overlay-settings-inner">
								<ToggleControl
									label={ __( 'Gradient overlay?' ) }
									checked={ slideData_$array[currentSlide_$number].overlay.isGradient }
									onChange={ () => toggleGradientPicker() }
								/>

								{ slideData_$array[currentSlide_$number].overlay.isGradient &&
									<div className="gradient-direction">
										<h3 className="components-base-control__label">Gradient Direction</h3>
										{createGradientDirectionButtons()}
									</div>
								}

								<ColorPicker
									label={ __('Slide overlay color start') }
									className={"slide-background-color-picker"}
									color={ slideData_$array[currentSlide_$number].overlay["color1"]}
									onChange={ color => setOverlayColor(color, "color1")}
									defaultValue={slideData_$array[currentSlide_$number].overlay["color1"]}
									enableAlpha
								/>

								{
									slideData_$array[currentSlide_$number].overlay.isGradient && 
									<ColorPicker
										label={ __('Slide overlay color end') }
										className={"slide-background-color-picker"}
										color={ slideData_$array[currentSlide_$number].overlay["color2"]}
										onChange={ color => setOverlayColor(color, "color2")}
										defaultValue={slideData_$array[currentSlide_$number].overlay["color2"]}
										enableAlpha
									/>
								}

							</div>
						}
					</div>
				</BlockControls>
				<div className="slide-overlay-container" style={ overlayStyles }>
					<div className="slide-content">
						<div 
							className="slide-content-inner"  
							style={ slideContentInnerStyles }
						>
							TODO insert pre-defined blocks
						</div>
					</div>
					<div className="slide-btn-container">
						{ createSlideBtns() }
					</div>
				</div>
			</div>
		</div>
	);
}