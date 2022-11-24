import { __ } from '@wordpress/i18n';
import { 
	useBlockProps,
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
		<>
			<BlockControls>
			<ToolbarGroup>
						<ToolbarItem>
							{ () => (
								<MediaUploadCheck>
									<MediaUpload
											allowedTypes={ ALLOWED_MEDIA_TYPES }
											render={ ( { open } ) => (
												<Button
													onClick={ open }
													className=""
													label={ __( 'Edit Slider', '' ) }
													isSmall
													icon="image"
												/>
											) }
										/>
								</MediaUploadCheck>
							)}
						</ToolbarItem>
					</ToolbarGroup>
			</BlockControls>
			<p { ...useBlockProps() }>
				"These pretzels are making me thirsty."
			</p>
		</>
	);
}
