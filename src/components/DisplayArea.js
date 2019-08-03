import React from 'react'
import styled from 'styled-components'
import withCropBox from '../contexts/CropBoxContext/withCropBox'

const DisplayArea = (props) => {
    const { className, cropBox } = props

    return (
        <div className={className}>
            {
                cropBox.cropBoxes.length
                ?   <pre>
                        {JSON.stringify(cropBox.cropBoxes
                            .filter(box => !box.deleted)
                            .map(box => ({
                                x: box.x,
                                y: box.y,
                                width: box.w,
                                height: box.h
                            })), null, 2)}
                    </pre>
                :   null
            }
        </div>
    )
}

const StyledDisplayArea = withCropBox(styled(DisplayArea)`
    padding: 15px;
    width: 548px;
    min-height: 703px;
    color: #E0E2E4;
    background: #2C3846;
    border-radius: 5px;
`)

export default withCropBox(DisplayArea)
export { StyledDisplayArea }
