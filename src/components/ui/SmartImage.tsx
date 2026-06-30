import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext.ts';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  disableRealistic?: boolean;
}

const getRealisticPngPath = (src: string): string => {
        if (!src.startsWith('/images/')) return src;

        const fileName = src.split('/').pop() || '';
        const fileStem = fileName.replace(/\.[^.]+$/, '');
        return `/realistic/${fileStem}.png`;
};

const getMirroredRealisticPath = (src: string): string => {
    if (!src.startsWith('/images/')) return src;
    return src.replace('/images/', '/realistic/');
};

const SmartImage: React.FC<SmartImageProps> = ({ src, disableRealistic, ...props }) => {
    const { settings } = useAppContext();
    const [imageError, setImageError] = useState(false);
    const [realisticVariant, setRealisticVariant] = useState<'png' | 'mirrored'>('png');

    const isRealisticEnabled = !disableRealistic && Boolean((settings as any).isRealisticImagesEnabled);

    // Reset error state when src changes
    useEffect(() => {
        setImageError(false);
        setRealisticVariant('png');
    }, [src, isRealisticEnabled]);

    let actualSrc = src || '';
    if (isRealisticEnabled && !imageError && src && typeof src === 'string' && src.startsWith('/images/')) {
        actualSrc = realisticVariant === 'png' ? getRealisticPngPath(src) : getMirroredRealisticPath(src);
    }

    // A fallback mechanism internally if someone provides src as object or other things
    return (
        <img
            src={actualSrc}
            onError={(e) => {
                if (isRealisticEnabled && !imageError && src && typeof src === 'string' && src.startsWith('/images/')) {
                    if (realisticVariant === 'png') {
                        setRealisticVariant('mirrored');
                        return;
                    }

                    // Fall back to original image
                    setImageError(true);
                } else if (props.onError) {
                    props.onError(e);
                }
            }}
            {...props}
        />
    );
};

export default SmartImage;
