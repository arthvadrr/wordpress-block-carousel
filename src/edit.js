import { __ } from '@wordpress/i18n';

import { 
	useBlockProps,
	InnerBlocks,
	BlockControls
} from '@wordpress/block-editor';

import { image } from '@wordpress/icons';

import {
	ToolbarButton
} from '@wordpress/components';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {

	const styles = "background:blue;";

	return (
		<div { ...useBlockProps() }>

			<div className="slide" style={{ styles }}>
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
			<button onClick={ ( e ) => {} }>Add a Slide</button>
			</div>
		</div>
	);
}