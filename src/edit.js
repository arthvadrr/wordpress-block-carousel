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

import { 
	Fragment, 
	useEffect, 
	useState 
} from '@wordpress/element';

import './editor.scss';

const ALLOWED_MEDIA_TYPES = ['image'];

export default function Edit({ attributes, setAttributes }) {
	
	const { 
		slideData, 
		slideAmount, 
		currentSlide
	} = attributes;
 
	const setSlideBackgroundImageAltText = newAltText => {
		slideData[currentSlide].backgroundImageAltText = newAltText;
		setAttributes({slideData : slideData});
	}

	const toggleParallax = hasParallax => {
		console.log('fired!');
		slideData[currentSlide].hasParallax = !hasParallax;
		setAttributes({slideData: slideData});
	}

	const updateSlideAmount = value => {
		const diff = Math.abs(value - slideAmount);

		if (value < slideAmount) {

			if (currentSlide > value - 1) {
				setAttributes({currentSlide: value - 1})
			}
			for (let i = 0; i < diff; i++) slideData.pop();

		} else {

			for (let i = 0; i < diff; i++) slideData.push({
				"backgroundImageUrl": "",
				"backgroundImageAltText": "",
				"showFocalPointPicker": "",
				"imperativeFocalPointPreview": "",
				"focalPoint": "",
				"hasParallax": "",
			});

		}

		setAttributes({
			slideAmount: value,
			slideData: slideData
		})
	}

	const updateSlideBackgroundImageUrl = ( media ) => {
		slideData[currentSlide].backgroundImageUrl = media.url;
		setAttributes({slideData: slideData});
	}

	const slideStyles = {
		backgroundImage: `url(${slideData[currentSlide].backgroundImageUrl})`,
		backgroundAttachment: `${slideData[currentSlide].hasParallax === "true" ? 'fixed' : 'scroll'}`
	}

	const createSlidePanels = () => {
		return (
			<PanelRow>
				{ !! slideData[currentSlide].backgroundImageUrl && (
					<PanelBody title={ __( 'Media settings' ) }>
							<Fragment>
								<ToggleControl
									label={ __( 'Fixed background' ) }
									checked={ slideData[currentSlide].hasParallax }
									onChange={ () => toggleParallax(slideData[currentSlide].hasParallax) }
								/>
							</Fragment>
						{ slideData[currentSlide].showFocalPointPicker && (
							<FocalPointPicker
								__nextHasNoMarginBottom
								label={ __( 'Focal point picker' ) }
								url={ slideData[currentSlide].backgroundImageUrl }
								onDragStart={ slideData[currentSlide].imperativeFocalPointPreview }
								value={ slideData[currentSlide].focalPoint }
								onDrag={ slideData[currentSlide].imperativeFocalPointPreview }
								onChange={ ( newFocalPoint ) =>
									setAttributes( {
										focalPoint: newFocalPoint,
									} )
								}
							/>
						) }
						{slideData[currentSlide].backgroundImageUrl &&
								<TextareaControl
									label={ __(
										'Alt text (alternative text)'
									) }
									value={ slideData[currentSlide].backgroundImageAltText }
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
		
		for (let i = 0; i < slideAmount; i++) {
			btnArr.push(
				<button 
					key={`slide-${i}`} 
					onClick={() => setAttributes({currentSlide: i})}
				>
					Goto Slide {i}
				</button>
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
			<div className="slide" style={ slideStyles }>
				<BlockControls group="other">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={( media ) => updateSlideBackgroundImageUrl( media )}
							render={ ( { open } ) => (
								<button onClick={ open }>
									<span>Choose an Image</span>
								</button>
							)}
						/>					
					</MediaUploadCheck>
				</BlockControls>
				<div className="slide-content">
					<InnerBlocks />
				</div>
				<div>
					Slide amount: {slideAmount}<br/>
					Current slide: {currentSlide}<br/>
				</div>
				<div className="slide-btn-container">
					{ createSlideBtns() }
				</div>
			</div>
		</div>
	);
}