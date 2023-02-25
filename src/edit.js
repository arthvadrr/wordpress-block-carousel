/*
TODO
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

import {
	Button,
	ButtonGroup, 
	RangeControl,
	Panel,
	PanelBody,
	PanelRow,
	TextareaControl,
	TextControl,
	ExternalLink,
	FocalPointPicker,
	ToggleControl,
	ColorPicker,
	SelectControl,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';

import { 
	useBlockProps,
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
		const shallowArr = [...slideData_$array];
		shallowArr[currentSlide_$number].backgroundImageAltText = newAltText;
		setSlideData_$array(shallowArr);
		setAttributes({slideData: slideData_$array})
	}
	
	const setSlideTitle = ( value ) => {
		const shallowArr = [...slideData_$array];
		shallowArr[currentSlide_$number].title.content = value;
		updateSlideArray( shallowArr )
	}

	const setTitleFontSize = ( value ) => {
		const shallowArr = [...slideData_$array];
		shallowArr[currentSlide_$number].title.fontSize = value;
		updateSlideArray( shallowArr )
	}

	const setTitlePadding = ( value ) => {
		const shallowArr = [...slideData_$array];
		console.log(value)
		shallowArr[currentSlide_$number].title.padding = value;
		updateSlideArray( shallowArr )
	}

	const updateSlideArray = ( shallow ) => {
		setSlideData_$array( shallow );
		setAttributes({slideData: slideData_$array});
	}

	const setTitleTextAlign = ( value ) => {
		const shallowArr = [...slideData_$array];
		shallowArr[currentSlide_$number].title.align = value;
		updateSlideArray( shallowArr )
	}

	const setSubtitleTextAlign = ( value ) => {
		const shallowArr = [...slideData_$array];
		shallowArr[currentSlide_$number].subtitle.align = value;
		updateSlideArray( shallowArr )
	}

	const setSubtitlePadding = ( value ) => {
		const shallowArr = [...slideData_$array];
		shallowArr[currentSlide_$number].subtitle.padding = value;
		updateSlideArray( shallowArr )
	}

	const setSubtitleFontSize = ( value ) => {
		const shallowArr = [...slideData_$array];
		shallowArr[currentSlide_$number].subtitle.fontSize = value;
		updateSlideArray( shallowArr )
	}

	const setSlideSubtitle = ( value ) => {
		const shallowArr = [...slideData_$array];
		shallowArr[currentSlide_$number].subtitle.content = value;
		updateSlideArray( shallowArr )
	}

	const setSubtitleTagname = ( value ) => {
		const shallowArr = [...slideData_$array];
		shallowArr[currentSlide_$number].subtitle.tagname = value;
		updateSlideArray( shallowArr )
	}

	const setTitleHeadingLevel = ( value ) => {
		const shallowArr = [...slideData_$array];
		shallowArr[currentSlide_$number].title.tagname = value;
		updateSlideArray( shallowArr )
	}

	const toggleTitle = () => {
		const shallowArr = [...slideData_$array];
		let enabled = shallowArr[currentSlide_$number].title.enabled;
		shallowArr[currentSlide_$number].title.enabled = !enabled;
		updateSlideArray( shallowArr )
	}

	const toggleSubtitle = () => {
		const shallowArr = [...slideData_$array];
		let enabled = shallowArr[currentSlide_$number].subtitle.enabled;
		shallowArr[currentSlide_$number].subtitle.enabled = !enabled;
		updateSlideArray( shallowArr )
	}

	const toggleOverlay = () => {
		const shallowArr = [...slideData_$array];
		let enabled = shallowArr[currentSlide_$number].overlay.enabled;
		shallowArr[currentSlide_$number].overlay.enabled = !enabled;
		updateSlideArray( shallowArr )
	}

	const toggleGradientPicker = () => {
		const shallowArr = [...slideData_$array];
		const isGradient = shallowArr[currentSlide_$number].overlay.isGradient;
		shallowArr[currentSlide_$number].overlay.isGradient = !isGradient;
		updateSlideArray( shallowArr )
	}

	const setOverlayColor = (color, pos) => {
		const shallowArr = [...slideData_$array];
		shallowArr[currentSlide_$number].overlay[pos] = color;
		updateSlideArray( shallowArr )
	}

	const toggleUseBackgroundColor = () => {
		const shallowArr = [...slideData_$array];
		const useBackgroundColor = shallowArr[currentSlide_$number].useBackgroundColor;
		shallowArr[currentSlide_$number].useBackgroundColor = !useBackgroundColor;
		setSlideData_$array(shallowArr);
		setAttributes({slideData: slideData_$array})
	}

	const toggleParallax = () => {
		const shallowArr = [...slideData_$array];
		const hasParallax = shallowArr[currentSlide_$number].hasParallax 
		shallowArr[currentSlide_$number].hasParallax = !hasParallax
		setSlideData_$array(shallowArr);
		setAttributes({slideData: slideData_$array})
	}

	const toggleBackgroundSizeContain = () => {
		const shallowArr = [...slideData_$array];
		const backgroundSize = shallowArr[currentSlide_$number].backgroundSizeContain;
		shallowArr[currentSlide_$number].backgroundSizeContain = !backgroundSize;
		updateSlideArray( shallowArr )
	}

	
	const toggleBackgroundRepeat = () => {
		const shallowArr = [...slideData_$array];
		const backgroundRepeat = shallowArr[currentSlide_$number].backgroundRepeat;
		shallowArr[currentSlide_$number].backgroundRepeat = !backgroundRepeat;
		updateSlideArray( shallowArr )
	}

	const updateSlideAmount = value => {
		const shallowArr = [...slideData_$array];
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
					"tagname": "h2",
					"padding": "2rem",
					"fontSize": "inherit",
					"content": "",
					"align": "start"
				},
				"subtitle" : {
					"enabled": false,
					"tagname": "p",
					"padding": "2rem",
					"fontSize": "inherit",
					"content": "",
					"align": "start"
				},
				"slideInnerBlock": {
					"margin": 0,
					"padding": 0,
					"reversed": false 
				},
				"useBackgroundColor": false,
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
					"enabled": false,
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
const shallowArr = [...slideData_$array];
		shallowArr[currentSlide_$number].overlay.direction = dir;
		setSlideData_$array(shallowArr);
		setAttributes( {slideData: slideData_$array} );
	}

	const updateSlideBackgroundImageUrl = ( url ) => {
		const shallowArr = [...slideData_$array];
		shallowArr[currentSlide_$number].backgroundImageUrl = url;
		setSlideData_$array(shallowArr);
		setAttributes( {slideData: slideData_$array} );
	}

	const updateSlideBackgroundColor = ( color ) => {
		const shallowArr = [...slideData_$array];
		shallowArr[currentSlide_$number].backgroundColor = color;
		setSlideData_$array(shallowArr);
		setAttributes( {slideData: slideData_$array} )
	}

	const wordpressBlockCarouselStyles = {
		height: `${slideHeight_$number}vh`,
		backgroundColor: slideData_$array[currentSlide_$number].useBackgroundColor ? slideData_$array[currentSlide_$number].backgroundColor : 'transparent'
	}

	const overlayStyles = {
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
		const shallowArr = [...slideData_$array];
		shallowArr[currentSlide_$number].focalPoint = newFocalPoint
		setSlideData_$array(shallowArr);
		setAttributes( {slideData: slideData_$array} )
	}

	const createGradientDirectionButtons = () => {
		const dirArr = [
			["top left", "↖"],
			["top", "↑"], 
			["top right", "↗"], 
			["left", "←"], 
			["", ""],
			["right", "→"], 
			["bottom left", "↙"], 
			["bottom", "↓"], 
			["bottom right", "↘"]
		];

		return dirArr.map((arr, index) => {
			return (
				<>
					{ arr[0] !== '' && (
					<button 
						key={index} 
						aria-label={`to ${arr[0]}`} 
						onClick={() => updateGradientDirection(arr[0])}
						className={slideData_$array[currentSlide_$number].overlay.direction === arr[0] ? 'set-gradient-dir active' : 'set-gradient-dir'}
						>{arr[1]}
					</button>
					)}
					{ arr[0] === '' && (
						<div></div>
					)}
				</>
			)
		})
	}

	const AlignButtonGroup = ( {align, setTextAlign} ) => {
		return (
			<ButtonGroup>
				<Button 
					varient="primary"
					isPressed={align === "start"}
					onClick={() => setTextAlign("start") }
				>None</Button>
				<Button 
					varient="primary"
					isPressed={align === "left"}
					onClick={() => setTextAlign("left") }
				>Left</Button>
				<Button 
					varient="primary"
					isPressed={align === "center"}
					onClick={() => setTextAlign("center") }
				>center</Button>
				<Button 
					varient="primary"
					isPressed={align === "right"}
					onClick={() => setTextAlign("right") }
				>Right</Button>
			</ButtonGroup>
		)
	}

	const createSlidePanels = () => {
		return (
			<Fragment>
				<PanelBody title={ __( 'Media settings' ) }>
				<ToggleControl
					label={ __( 'Title' ) }
					checked={ slideData_$array[currentSlide_$number].title.enabled }
					onChange={ () => toggleTitle() }
				/>
				{ slideData_$array[currentSlide_$number].title.enabled &&
					<>
						<TextControl
							label="Slide Title"
							value={ slideData_$array[currentSlide_$number].title.content }
							onChange={ ( value ) => setSlideTitle( value ) }
						>
						</TextControl>
						<SelectControl
							label="Heading Level"
							value={ slideData_$array[currentSlide_$number].title.tagname }
							options={ [
									{ label: 'H1', value: 'h1' },
									{ label: 'H2', value: 'h2' },
									{ label: 'H3', value: 'h3' },
									{ label: 'H4', value: 'h4' },
									{ label: 'H5', value: 'h5' },
									{ label: 'H6', value: 'h6' },
							] }
							onChange={ ( tagname ) => setTitleHeadingLevel( tagname ) }
							>
						</SelectControl>
						<UnitControl
							label={ __('Font Size') }
							value={ slideData_$array[currentSlide_$number].title.fontSize}
							onChange={ value => setTitleFontSize( value )}
						></UnitControl>
						<UnitControl
							label={ __('Title Padding') }
							value={ slideData_$array[currentSlide_$number].title.padding}
							onChange={ value => setTitlePadding( value )}
						></UnitControl>
						<AlignButtonGroup 
							align={ slideData_$array[currentSlide_$number].title.align } 
							setTextAlign={ setTitleTextAlign } 
						/>
					</>
				}
				<ToggleControl
					label={ __( 'Subtitle' ) }
					checked={ slideData_$array[currentSlide_$number].subtitle.enabled }
					onChange={ () => toggleSubtitle() }
				/>
				{ slideData_$array[currentSlide_$number].subtitle.enabled &&
					<>
						<TextControl
							label={__("Slide Subtitle")}
							value={ slideData_$array[currentSlide_$number].subtitle.content }
							onChange={ ( value ) => setSlideSubtitle( value ) }
						>
						</TextControl>
						<SelectControl
							label={__("HTML Element")}
							value={ slideData_$array[currentSlide_$number].subtitle.tagname }
							options={ [
									{ label: '<p>', value: 'p' },
									{ label: '<div>', value: 'div' },
									{ label: '<small>', value: 'small' },
									{ label: '<strong>', value: 'strong' },
									{ label: '<b>', value: 'b' },
							] }
							onChange={ ( value ) => setSubtitleTagname( value ) }
							>
						</SelectControl>
						<UnitControl
							label={ __("Font Size") }
							value={ slideData_$array[currentSlide_$number].subtitle.fontSize}
							onChange={ value => setSubtitleFontSize( value )}
						>
						<UnitControl
							label={ __('Subtitle Padding') }
							value={ slideData_$array[currentSlide_$number].subtitle.padding}
							onChange={ value => setSubtitlePadding( value )}
						></UnitControl>
						</UnitControl>
						<AlignButtonGroup 
							align={ slideData_$array[currentSlide_$number].subtitle.align } 
							setTextAlign={ setSubtitleTextAlign } 
						/>
					</>
				}
				</PanelBody>				
				<PanelBody title={ __( 'Media settings' ) }>
				{ !! slideData_$array[currentSlide_$number].backgroundImageUrl && (
					<Fragment>
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
										label={ __('Alt text (alternative text)') }
										value={ slideData_$array[currentSlide_$number].backgroundImageAltText }
										onChange={ ( newAlt ) => setSlideBackgroundImageAltText(newAlt)}
										help={
											<>
												<ExternalLink href="https://www.w3.org/WAI/tutorials/images/decision-tree">
													{ __('Describe the purpose of the image') }
												</ExternalLink>
												{ __('Leave empty if the image is purely decorative.') }
											</>
										}
									/>
								}
					</Fragment>
				) }
				<PanelRow>
							<MediaUploadCheck>
									<MediaUpload
										onSelect={( media ) => updateSlideBackgroundImageUrl( media.url )}
										render={ ( { open } ) => (
											<Button 
												onClick={ open }
												variant="secondary"
												isSmall
												className={`block-library-cover__reset-button wpbc-btn-no-left-margin ${slideData_$array[currentSlide_$number].backgroundImageUrl ? '' : 'wpbc-is-full-width'}`}
											>
												{`${slideData_$array[currentSlide_$number].backgroundImageUrl ? 'Replace Media' : 'Add Media'}`}
											</Button>
										)}
									/>					
								</MediaUploadCheck>
								{ slideData_$array[currentSlide_$number].backgroundImageUrl && (
								<Button
									variant="secondary"
									isSmall
									className="block-library-cover__reset-button"
									onClick={ () => updateSlideBackgroundImageUrl("")}
								>
									{ __( 'Clear Media' ) }
								</Button>
								) }
							</PanelRow>
			</PanelBody>
			<PanelBody title={ __( 'Background Color' ) }>
				<ToggleControl
					label={ __( 'Use Background Color' ) }
					checked={ slideData_$array[currentSlide_$number].useBackgroundColor }
					onChange={ () => toggleUseBackgroundColor() }
				/>
				{ slideData_$array[currentSlide_$number].useBackgroundColor &&
					<ColorPicker
						label={ __('Slide background color') }
						className={"slide-background-color-picker"}
						color={ slideData_$array[currentSlide_$number].backgroundColor }
						onChange={ color => updateSlideBackgroundColor( color )} 
						enableAlpha
						defaultValue={indexBtnColor}
					/>
				}
			</PanelBody>
			<PanelBody title={ __( 'Overlay Settings' ) }>
				<div className="slide-overlay-container">
				<ToggleControl
									label={ __( 'Use Overlay' ) }
									checked={ slideData_$array[currentSlide_$number].overlay.enabled }
									onChange={ () => toggleOverlay() }
								/>
				{ slideData_$array[currentSlide_$number].overlay.enabled &&
					<>
						<ToggleControl
									label={ __( 'Use Gradient' ) }
									checked={ slideData_$array[currentSlide_$number].overlay.isGradient }
									onChange={ () => toggleGradientPicker() }
						/>
						<div className="block-inspector-overlay-settings-inner">
							{ slideData_$array[currentSlide_$number].overlay.isGradient &&
							<>
								<h3 className="components-base-control__label">{__('Gradient Direction')}</h3>
								<div className="gradient-direction">
									{createGradientDirectionButtons()}
								</div>
								<label 
								className="wpbc-inspector-label components-base-control__label"
								for="wpbc-slide-overlay-start-color"
								>{__('Gradient Start Color')}</label>
							</>
							}
								<ColorPicker
									label={ __('Slide overlay color start') }
									className={"slide-background-color-picker"}
									color={ slideData_$array[currentSlide_$number].overlay["color1"]}
									onChange={ color => setOverlayColor(color, "color1")}
									defaultValue={slideData_$array[currentSlide_$number].overlay["color1"]}
									id="wpbc-slide-overlay-start-color"
									enableAlpha
								/>
							{slideData_$array[currentSlide_$number].overlay.isGradient && 
								<>
									<label 
										className="wpbc-inspector-label components-base-control__label"
										for="wpbc-slide-overlay-end-color"
									>Gradient End Color</label>
									<ColorPicker
										label={ __('Slide overlay color end') }
										className={"slide-background-color-picker"}
										color={ slideData_$array[currentSlide_$number].overlay["color2"]}
										onChange={ color => setOverlayColor(color, "color2")}
										defaultValue={slideData_$array[currentSlide_$number].overlay["color2"]}
										id="wpbc-slide-overlay-end-color"
										enableAlpha
									/>
								</>
							}
						</div>
					</>
				}
				</div>								
			</PanelBody>
		</Fragment>
		);
	}

	const createInnerBlocks = () => {
		const { 
			enabled:  TitleEnabled,
			content:  Title,
			tagname:  TitleTagName,
			fontSize: TitleFontSize,
			align:    TitleAlign,
			padding:  TitlePadding
		} = slideData_$array[currentSlide_$number].title

		const { 
			enabled:  SubtitleEnabled,
			content:  Subtitle,
			tagname:  SubtitleTagName,
			fontSize: SubtitleFontSize,
			align:    SubtitleAlign,
			padding:  SubtitlePadding
		} = slideData_$array[currentSlide_$number].subtitle

		const TitleStyles = {
			fontSize:  TitleFontSize,
			textAlign: TitleAlign,
			padding:   TitlePadding
		};

		const SubtitleStyles = {
			fontSize:  SubtitleFontSize,
			textAlign: SubtitleAlign,
			padding:   SubtitlePadding
		}

		return (
			<>
				{ TitleEnabled && (
						<TitleTagName style={TitleStyles}>{ __(Title) }</TitleTagName>
					) 
				}
				{ SubtitleEnabled && (
						<SubtitleTagName style={SubtitleStyles}>{ __(Subtitle) }</SubtitleTagName>
					) 
				}
			</>
		)
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
				<h2 className="block-carousel-section-title">{__('Block Carousel Settings')}</h2>
				<Panel className="block-carousel-inspector-panel">
					<div className="block-carousel-inspector-panel-inner">
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
					</div>
				</Panel>
				<PanelBody title={ __( 'Slide Buttons' ) }>
					<Panel className="block-carousel-inspector-panel">
						<div className="block-carousel-inspector-panel-inner">
							<h3 className="block-editor-block-card__title">{__('Slide index button color')}</h3>
							<ColorPicker
									color={ indexBtnColor_$string }
									onChange={ color => setIndexBtnColor_$string(color)}
									enableAlpha
									defaultValue={indexBtnColor}
							/>
						</div>
					</Panel>
				</PanelBody>
				<div className="block-carousel-inspector-panel">
					<h2 className="block-carousel-section-title">{__('Current Slide Settings')}</h2>
						{createSlidePanels()}
				</div>
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
										{`${slideData_$array[currentSlide_$number].backgroundImageUrl ? 'Replace Media' : 'Add Media'}`}
									</span>
								</button>
							)}
						/>					
					</MediaUploadCheck>
				</BlockControls>
				<div className="slide-overlay-container" style={ slideData_$array[currentSlide_$number].overlay.enabled ? overlayStyles: {} }>
					<div className="slide-content">
						<div 
							className="slide-content-inner"  
							style={ slideContentInnerStyles }
						>
							{ createInnerBlocks() }
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