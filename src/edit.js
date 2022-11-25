import { __ } from '@wordpress/i18n';
import { image } from '@wordpress/icons'; 

import { 
	useBlockProps,
	InnerBlocks,
	BlockControls,
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck 
} from '@wordpress/block-editor';


import {
	Button,
	PanelBody,
	RangeControl,
	TextControl,
	SelectControl,
	ToolbarGroup,
	ToolbarItem
} from '@wordpress/components'

import './editor.scss';

const ALLOWED_MEDIA_TYPES = [ 'image' ];

export default function Edit() {
	return (
		<div { ...useBlockProps() }>
			<div class="slide">
				<div class="slide-content">
					<InnerBlocks />
				</div>
			</div>
		</div>
	);
}
