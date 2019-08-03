import React from 'react';
import { CropBoxContext } from './cropBox-context';

const withCropBox = Component => props => (
    <CropBoxContext.Consumer>
        {cropBox => <Component {...props} cropBox={cropBox} />}
    </CropBoxContext.Consumer>
)

export default withCropBox