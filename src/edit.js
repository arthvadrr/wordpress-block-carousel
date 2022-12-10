import { __ } from '@wordpress/i18n';

import { addFilter } from '@wordpress/hooks';

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

const slideMediaUpload = () => MediaUpload;

addFilter(
	'editor.MediaUpload',
	'core/edit-post/components/media-upload/replace-media-upload',
	slideMediaUpload
);

export default function Edit({ attributes, setAttributes }) {

	const { 
		slideData, 
		slideAmount, 
		currentSlide 
	} = attributes;

	const updateBackgroundImageUrl = (media) => {
		const shallowArr = Array.from(slideData);
		shallowArr[currentSlide].backgroundImageUrl = media.url;
		setAttributes({slideData: shallowArr});
	}

	const setSlideBackgroundImageAltText = newAltText => {
		const shallowArr = Array.from(slideData);
		shallowArr[currentSlide].backgroundImageAltText = newAltText;
		setAttributes({slideData: shallowArr});
	}

	const toggleParallax = () => {
		const shallowArr = Array.from(slideData);
		shallowArr[currentSlide].hasParallax === "true" ? "false" : "true";
		setAttributes({slideData: shallowArr});
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
		const shallowArr = Array.from(slideData);
		const diff = Math.abs(value - slideAmount);
		let selectedSlide = currentSlide;

		if (value < slideAmount) {
	
			if (currentSlide > value - 1) {
				selectedSlide = value - 1;
			}

			for (let i = 0; i < diff; i++) shallowArr.pop();
		} else {
			for (let i = 0; i < diff; i++) shallowArr.push(slideObjSchema);
		}

		setAttributes({slideData: shallowArr})
		setAttributes({currentSlide: selectedSlide})
		setAttributes({slideAmount: value})
	}

	const getCurrentImageUrl = () => slideData[currentSlide].backgroundImageUrl;

	const slideStyle = {
		backgroundImage: `url(${slideData[currentSlide].backgroundImageUrl})`
	}

	const updateSlideMedia = ( url ) => {
		const shallowArr = Array.from(slideData);
		shallowArr[currentSlide].backgroundImageUrl = url;
		setAttributes({slideData: shallowArr})
	}

	const createSlidePanels = () => {
		return (
			<PanelRow>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={( media ) => updateSlideMedia( media.url ) }
						value={	getCurrentImageUrl() }
						render={ ( { open } ) => (
							<button onClick={ open }>
								{!slideData[currentSlide].backgroundImageUrl && <span>Choose an Image</span>}
							</button>
						)}
					/>					
				</MediaUploadCheck>
				{ !! slideData[currentSlide].backgroundImageUrl && (
					<PanelBody title={ __( 'Media settings' ) }>
							<Fragment>
								<ToggleControl
									label={ __( 'Fixed background' ) }
									checked={ slideData[currentSlide].hasParallax }
									onChange={ toggleParallax }
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
					<MediaUploadCheck>
						<MediaUpload
							onSelect={( media ) => updateSlideMedia( media.url )}
							value={	getCurrentImageUrl() }
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