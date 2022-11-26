import { __ } from '@wordpress/i18n';
import { image } from '@wordpress/icons'; 
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

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
	Button
} from '@wordpress/components'

import './editor.scss';

const ALLOWED_MEDIA_TYPES = [ 'image' ];

export default function Edit() {
	return (
		<div { ...useBlockProps() }>
			<div className="slide">
				<div className="slide-content">
					<InnerBlocks />
				</div>
			</div>
			<Button>Add a Slide</Button>
		</div>
	);
}
