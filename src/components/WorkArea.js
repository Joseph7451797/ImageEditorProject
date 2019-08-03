import React, { useState } from 'react'
import styled from 'styled-components'
import { StyledImageCanvas } from './ImageCanvas'
import { StyledUploadArea } from './UploadArea'
import { ImageFileContext } from '../contexts/ImageFileContext/image-file-context'


const WorkArea = (props) => {
    const { className } = props
    const [image, setImage] = useState(null)

    return (
        <div className={className}>
            <header></header>
            <ImageFileContext.Provider value={{
                image,
                setImage
            }}>
                {
                    image
                    ?   <StyledImageCanvas image={image} />
                    :   <StyledUploadArea />
                }
            </ImageFileContext.Provider>
        </div>
    )
}

const StyledWorkArea = styled(WorkArea)`
    width: 433px;
    height: 792px;
    background: #F7F8FA;
    border-radius: 5px;
    header {
        height: 56px;
        background: #EEEFF3;
    }
`

export default WorkArea
export { StyledWorkArea }