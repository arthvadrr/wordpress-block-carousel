import { useBlockProps } from '@wordpress/block-editor';

export default function save( {attributes} ) {
	return (
		<p { ...useBlockProps.save() }>
			{ attributes.url }
			{ attributes.slideData }
		</p>
	);
}
