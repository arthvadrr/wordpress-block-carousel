import { __ } from '@wordpress/i18n';

import {
	Button, 
	RangeControl,
	Panel,
	PanelBody,
	PanelRow,
	TextareaControl,
	ExternalLink,
	FocalPointPicker,
	ToggleControl
} from '@wordpress/components';

import { 
	useBlockProps,
	InnerBlocks,
	BlockControls,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';
import { image } from '@wordpress/icons';
import { Fragment, useEffect, useState } from '@wordpress/element';
import {
	ToolbarButton
} from '@wordpress/components';
import './editor.scss';

const ALLOWED_MEDIA_TYPES = ['image'];

export default function Edit({ attributes, setAttributes }) {

	const { 
		slideData, 
		slideAmount, 
		currentSlide 
	} = attributes;

	const [selectedSlide, setSelectedSlide] = useState(currentSlide);
	const [slideDataArr, setSlideDataArr] 	= useState(slideData);

	useEffect(() => {
		setAttributes({slideData: slideDataArr})
		setAttributes({currentSlide: selectedSlide})
		console.table(slideDataArr);
	})

	const updateBackgroundImageUrl = (url) => {
		slideDataArr[currentSlide].backgroundImageUrl = url;
		setSlideDataArr(slideDataArr);
	}

	const setSlideBackgroundImageAltText = newAltText => {
		slideDataArr[currentSlide].backgroundImageAltText = newAltText;
		setSlideDataArr(slideDataArr);
	}

	const toggleParallax = () => {
		const shallowArr = Array.from(slideDataArr);
		slideDataArr[selectedSlide].hasParallax === "true" ? "false" : "true";
		setSlideDataArr(shallowArr);
	}

	const slideObjSchema = {
		"backgroundImageUrl": "",
		"backgroundImageAltText": "",
		"showFocalPointPicker": "",
		"imperativeFocalPointPreview": "",
		"focalPoint": "",
		"hasParallax": "",
		"toggleParallax": "false"
	}

	const updateSlideAmount = value => {
		const shallowArr = Array.from(slideDataArr);
		const diff = Math.abs(value - slideAmount);

		if (value < slideAmount) {
	
			if (selectedSlide > value - 1) {
				setSelectedSlide(value - 1)
			}

			for (let i = 0; i < diff; i++) shallowArr.pop();
		} else {
			for (let i = 0; i < diff; i++) shallowArr.push(slideObjSchema);
		}

		setSlideDataArr(shallowArr);
		setAttributes({slideAmount: value})
	}

	const getCurrentImageUrl = () => slideDataArr[currentSlide].backgroundImageUrl;

	const slideStyle = {
		backgroundImage: `url(${slideDataArr[selectedSlide].backgroundImageUrl})`
	}

	const createSlidePanels = () => {
		return (
			<PanelRow>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={( media ) => {
							slideDataArr[currentSlide].backgroundImageUrl = media.url;
							setSlideDataArr(slideDataArr);
							console.log('fired!')
							console.table(slideDataArr);
						}}
						value={	getCurrentImageUrl() }
						render={ ( { open } ) => (
							<button onClick={ open }>
								{!slideDataArr[selectedSlide].backgroundImageUrl && <span>Choose an Image</span>}
							</button>
						)}
					/>					
				</MediaUploadCheck>
				{ !! slideDataArr[selectedSlide].backgroundImageUrl && (
					<PanelBody title={ __( 'Media settings' ) }>
							<Fragment>
								<ToggleControl
									label={ __( 'Fixed background' ) }
									checked={ slideDataArr[selectedSlide].hasParallax }
									onChange={ toggleParallax }
								/>
							</Fragment>
						{ slideDataArr[selectedSlide].showFocalPointPicker && (
							<FocalPointPicker
								__nextHasNoMarginBottom
								label={ __( 'Focal point picker' ) }
								url={ slideDataArr[selectedSlide].backgroundImageUrl }
								onDragStart={ slideDataArr[selectedSlide].imperativeFocalPointPreview }
								value={ slideDataArr[selectedSlide].focalPoint }
								onDrag={ slideDataArr[selectedSlide].imperativeFocalPointPreview }
								onChange={ ( newFocalPoint ) =>
									setAttributes( {
										focalPoint: newFocalPoint,
									} )
								}
							/>
						) }
						{slideDataArr[selectedSlide].backgroundImageUrl &&
								<TextareaControl
									label={ __(
										'Alt text (alternative text)'
									) }
									value={ slideDataArr[currentSlide].backgroundImageAltText }
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
								onClick={ () => updateBackgroundImageUrl("")}
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

		const btnOnClick = i => setSelectedSlide(i)

		for (let i = 0; i < slideAmount; i++) {
			btnArr.push(
			<button key={`slide-${i}`} onClick={() => btnOnClick(i)}>Goto Slide {i}</button>
			);
		}

		return btnArr;
	}

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<RangeControl
					value={ slideAmount }
					onChange={value => updateSlideAmount(value)}
					min={1}
					max={10}
				/>
				<Panel>
					<PanelBody title={"Slides"} initialOpen={false}>
						{createSlidePanels()}
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div className="slide" style={ slideStyle }>
				<BlockControls group="other">
					<ToolbarButton
						title={ __('Background Image', 'wp-block-carousel') }
						icon= { image }
						onClick={()=>{}}
					/>
				</BlockControls>
				<div className="slide-content">
					<InnerBlocks />
				</div>
				<div>
					Slide amount: {slideAmount}<br/>
					Current slide: {selectedSlide}<br/>
				</div>
				<div className="slide-btn-container">
					{ createSlideBtns() }
				</div>
			</div>
		</div>
	);
}