import { __ } from '@wordpress/i18n';

export const Avatar = () => (
	<img
		className="avatar"
		src="http://curso-gutenberg.local/wp-content/uploads/2021/03/avatar_fellyph.jpg"
		alt={ __( 'Fellyph Cintra', 'meu-primeiro-block' ) }
		loading="lazy"
		width="180"
	/>
);
