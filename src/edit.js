import { __ } from '@wordpress/i18n';

import { 
	RangeControl,
	Panel,
	PanelBody,
	PanelRow
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
import { useEffect } from '@wordpress/element';
import {
	ToolbarButton
} from '@wordpress/components';
import './editor.scss';

const ALLOWED_MEDIA_TYPES = ['image'];

export default function Edit({ attributes, setAttributes }) {

	const { slideData, slideAmount, currentSlide } = attributes;

	const slideDataArr = slideData.map(a => a);

	const updateSlideDataArr = () => {
		setAttributes({slideData: slideDataArr})
	}

	const updateBackgroundImageUrl = url => {
		slideDataArr[currentSlide].backgroundImageUrl = url;
		updateSlideDataArr();
	}

	const slideObjSchema = {
		"backgroundImageUrl": ""
	}

	const updateSlideAmount = val => {
		const diff = Math.abs(val - slideAmount);

		if (val < slideAmount) {
			for (let i = 0; i < diff; i++) slideDataArr.pop();
			setAttributes({currentSlide: val - 1})
		} else {
			for (let i = 0; i < diff; i++) slideDataArr.push(slideObjSchema);
			setAttributes({currentSlide: val - 1})
		}

		updateSlideDataArr();
		setAttributes({slideAmount: val})
	}

	const slideStyle = {
		backgroundImage: `url(${slideDataArr[currentSlide].backgroundImageUrl})`
	}

	const createSlidePanels = () => {
		const panels = Array.from({length: slideAmount})

		return panels.map(() => (
			<PanelRow>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={( media ) => updateBackgroundImageUrl(media.url)}
						value={	'foo' }
						render={ ( { open } ) => (
							<button onClick={ open }>
								{!slideDataArr[currentSlide].backgroundImageUrl && <span>Choose an Image</span>}
							</button>
						)}
					/>					
				</MediaUploadCheck>
				{ !! url && (
					<PanelBody title={ __( 'Media settings' ) }>
						{ isImageBackground && (
							<Fragment>
								<ToggleControl
									label={ __( 'Fixed background' ) }
									checked={ hasParallax }
									onChange={ toggleParallax }
								/>

								<ToggleControl
									label={ __( 'Repeated background' ) }
									checked={ isRepeated }
									onChange={ toggleIsRepeated }
								/>
							</Fragment>
						) }
						{ showFocalPointPicker && (
							<FocalPointPicker
								__nextHasNoMarginBottom
								label={ __( 'Focal point picker' ) }
								url={ url }
								onDragStart={ imperativeFocalPointPreview }
								value={ focalPoint }
								onDrag={ imperativeFocalPointPreview }
								onChange={ ( newFocalPoint ) =>
									setAttributes( {
										focalPoint: newFocalPoint,
									} )
								}
							/>
						) }
						{ ! slideDataArr[currentSlide].backgroundImageUrl (
								<TextareaControl
									label={ __(
										'Alt text (alternative text)'
									) }
									value={ slideDataArr[currentSlide].imageAlt }
									onChange={ ( newAlt ) =>
										setAttributes( { alt: newAlt } )
									}
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
							) }
						<PanelRow>
							<Button
								variant="secondary"
								isSmall
								className="block-library-cover__reset-button"
								onClick={ () =>
									setAttributes( {
										url: undefined,
										id: undefined,
										backgroundType: undefined,
										focalPoint: undefined,
										hasParallax: undefined,
										isRepeated: undefined,
										useFeaturedImage: false,
									} )
								}
							>
								{ __( 'Clear Media' ) }
							</Button>
						</PanelRow>
					</PanelBody>
				) }
			</PanelRow>
		))
	}

	const createSlideBtns = () => {
		const btnArr = [];

		const btnOnClick = i => setAttributes({currentSlide: i})

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
					Current slide: {currentSlide}<br/>
				</div>
				<div className="slide-btn-container">
					{ createSlideBtns() }
				</div>
			</div>
		</div>
	);
}