import { __ } from '@wordpress/i18n';

import { RangeControl } from '@wordpress/components';

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
			</InspectorControls>

			<div className="slide" style={ slideStyle }>
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