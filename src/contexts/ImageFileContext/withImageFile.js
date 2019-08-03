import React from 'react';
import { ImageFileContext } from './image-file-context';

const withImageFile = Component => props => (
    <ImageFileContext.Consumer>
        {imageFile => <Component {...props} imageFile={imageFile} />}
    </ImageFileContext.Consumer>
)

export default withImageFile