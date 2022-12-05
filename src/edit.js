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
	
	const { slideUrl, slideAmount } = attributes;

	const slideStyle = {
		backgroundImage: `url(${attributes.slideUrl})`
	}

	const updateSlideAmount = e => {
		e.target.value
	}

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<RangeControl
					value={ slideAmount }
					onChange={value  => setAttributes({slideAmount: value})}
					min={1}
					max={10}
				/>
			</InspectorControls>

			<div className="slide" style={ slideStyle }>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={( media ) => setAttributes({ slideUrl: media.url})}
						value={	'foo' }
						render={ ( { open } ) => (
							<button onClick={ open }>
								{!slideUrl && <span>Choose an Image</span>}
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
				Slide amount: {slideAmount}
			</div>
			</div>
		</div>
	);
}