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

	const [slideData_$array, setSlideData_$array] = useState(slideData);
	const [slideAmount_$number, setSlideAmount_$number] = useState(slideAmount);
	const [currentSlide_$number, setCurrentSlide_$number] = useState(currentSlide);

	useEffect(() => {
		console.log('fired useEffect');
		setAttributes({slideData: slideData_$array})
		setAttributes({slideAmount: slideAmount_$number})
		setAttributes({currentSlide: currentSlide_$number})
	}, [
		slideData_$array,
		slideAmount_$number,
		currentSlide_$number
	])
 
	const setSlideBackgroundImageAltText = newAltText => {
		const shallowArr = Array.from(slideData_$array);
		shallowArr[currentSlide_$number].backgroundImageAltText = newAltText;
		setSlideData_$array(shallowArr);
		setAttributes({slideData: slideData_$array})
	}

	const toggleParallax = () => {
		const shallowArr = Array.from(slideData_$array);
		const hasParallax = shallowArr[currentSlide_$number].hasParallax 
		shallowArr[currentSlide_$number].hasParallax = !hasParallax
		setSlideData_$array(shallowArr);
		setAttributes({slideData: slideData_$array})
	}

	const updateSlideAmount = value => {
		const shallowArr = Array.from(slideData_$array);
		const diff = Math.abs(value - slideAmount_$number);

		if (value < slideAmount_$number) {

			if (currentSlide_$number > value - 1) {
				setCurrentSlide_$number(value - 1);
				setAttributes({currentSlide: currentSlide_$number})
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
			});

		}

		setSlideAmount_$number(value);
 		setSlideData_$array(shallowArr);
		setAttributes({ slideData: slideData_$array  })
	}

	const updateSlideBackgroundImageUrl = ( url ) => {
		const shallowArr = Array.from(slideData_$array)
		shallowArr[currentSlide_$number].backgroundImageUrl = url;
		setSlideData_$array(shallowArr);
		setAttributes( {slideData: slideData_$array} )
	}

	const slideStyles = {
		backgroundImage: `url(${slideData_$array[currentSlide_$number].backgroundImageUrl})`,
		backgroundAttachment: `${slideData_$array[currentSlide_$number].hasParallax ? 'fixed' : 'scroll'}`,
		backgroundPosition: `${ slideData_$array[currentSlide_$number].focalPoint["x"] * 100 }% ${slideData_$array[currentSlide_$number].focalPoint["y"] * 100 }%`,
	}

	const setFocalPoint = ( newFocalPoint ) => {
		const shallowArr = Array.from(slideData_$array);
		shallowArr[currentSlide_$number].focalPoint = newFocalPoint
		setSlideData_$array(shallowArr);
		setAttributes( {slideData: slideData_$array} )
	}

	const createSlidePanels = () => {
		return (
			<PanelRow>
				{ !! slideData_$array[currentSlide_$number].backgroundImageUrl && (
					<PanelBody title={ __( 'Media settings' ) }>
							<Fragment>
								<ToggleControl
									label={ __( 'Fixed background' ) }
									checked={ slideData_$array[currentSlide_$number].hasParallax }
									onChange={ () => toggleParallax() }
								/>
							</Fragment>
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
					key={`slide-${i}`} 
					onClick={() => setCurrentSlide_$number(i)}
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
					value={ slideAmount_$number }
					onChange={value => updateSlideAmount(value)}
					min={1}
					max={10}
				/>
				<Panel>
						{createSlidePanels()}
				</Panel>
			</InspectorControls>
			<div className="slide" style={ slideStyles }>
				<BlockControls group="other">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={( media ) => updateSlideBackgroundImageUrl( media.url )}
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
					Slide amount: {slideAmount_$number}<br/>
					Current slide: {currentSlide_$number}<br/>
				</div>
				<div className="slide-btn-container">
					{ createSlideBtns() }
				</div>
			</div>
		</div>
	);
}