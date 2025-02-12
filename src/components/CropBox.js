import React, { useState } from 'react'
import styled from 'styled-components'
import { Rnd } from 'react-rnd'
import deleteIcon from '../images/delete.png'
import withCropBox from '../contexts/CropBoxContext/withCropBox'

const CropBox = (props) => {
    const { className, cropBox, ctx, rect, index, arr } = props
    const [rndMoving, setRndMoving] = useState(false)

    return (
        <>
            <Rnd
                className={className}
                size={{ width: rect.w, height: rect.h }}
                position={{ x: rect.x, y: rect.y }}
                onDragStart={(e, d) => {
                    setRndMoving(true)
                }}
                onDragStop={(e, d) => {
                    setRndMoving(false)
                    const after = [...arr]
                    after[index] = { ...rect, ...{
                        x: d.x,
                        y: d.y
                    }}
                    cropBox.setCropBoxes(after)
                }}
                onResizeStart={(e, dir, refToElement) => {
                    setRndMoving(true)
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    setRndMoving(false)
                    const after = [...arr]
                    after[index] = {
                        ...rect,
                        ...{
                            w: ref.offsetWidth,
                            h: ref.offsetHeight,
                            ...position
                        }
                    }
                    cropBox.setCropBoxes(after)
                }}
            />
            {
                !rndMoving
                ?   <div
                        className="delbtn"
                        onClick={() => {
                            ctx.clearRect(rect.x, rect.y, rect.w, rect.h)
                            const after = [...arr]
                            after[index] = {
                                ...rect,
                                ...{ deleted: true}
                            }
                            cropBox.setCropBoxes(after)
                        }}
                        style={{
                            top: rect.y,
                            left: rect.x + rect.w + 5,
                        }}
                    />
                :   null
            }
        </>
    )
}

const StyledCropBox = withCropBox(styled(CropBox)`
    border: 1px solid #138ee1;
    ~ .delbtn {
        position: absolute;
        width: 20px;
        height: 20px;
        background: #E0E2E4 url(${deleteIcon}) no-repeat center;
        background-size: contain;
        border-radius: 3px;
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, .3);
        cursor: pointer;
    }
`)

export default withCropBox(CropBox)
export { StyledCropBox }