import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { StyledCropBox } from './CropBox'
import withCropBox from '../contexts/CropBoxContext/withCropBox'

const WIDTH = 355
const ImageCanvas = (props) => {
    const { className, image, cropBox } = props
    const canvasRef = useRef()
    const [rect, setRect] = useState({ x: 0, y: 0, w: 0, h: 0, deleted: false})
    const [ctx, setContext] = useState()
    const [drag, setDrag] = useState(false)

    useEffect(() => {
        if (image) {
            const canvasEl = canvasRef.current
            const ctx = canvasEl.getContext('2d')
            const reader = new FileReader()

            setContext(ctx)
            reader.onload = (e) => {
                var img = new Image()
                img.onload = () => {
                    canvasEl.height = img.height * WIDTH / img.width
                    ctx.drawImage(img, 0, 0, WIDTH, img.height * WIDTH / img.width)
                }
                img.src = e.target.result
            }
            reader.readAsDataURL(image)
        }
    }, [image])

    return (
        <div className={className}>
            <canvas
                ref={canvasRef}
                width={WIDTH}
                onMouseDown={e => {
                    setDrag(true)
                    const bounds = e.target.getBoundingClientRect()
                    const obj = {
                        x: e.pageX - bounds.left - window.scrollX,
                        y: e.pageY - bounds.top - window.scrollY
                    }
                    setRect({ ...rect, ...obj })
                }}
                onMouseUp={e => {
                    if (drag) {
                        cropBox.setCropBoxes([...cropBox.cropBoxes, rect])
                        setDrag(false)
                    }
                }}
                onMouseMove={e => {
                    if (drag) {
                        const bounds = e.target.getBoundingClientRect()
                        const w = e.pageX - bounds.left - rect.x
                        const h = e.pageY - bounds.top - rect.y - window.scrollY
                        const obj = {
                            x: w < 0 ? rect.x + w : rect.x,
                            y: h < 0 ? rect.y + h : rect.y,
                            w: w < 0 ? Math.abs(w) : w,
                            h: h < 0 ? Math.abs(h) : h
                        }
                        setRect({ ...rect, ...obj })
                    }
                }}
            />
            {
                cropBox.cropBoxes.filter(box => !box.deleted).map((rect, index, arr) => (
                    <StyledCropBox key={index} ctx={ctx} rect={rect} index={index} arr={arr} />
                ))
            }
        </div>
    )
}

const StyledImageCanvas = withCropBox(styled(ImageCanvas)`
    position: relative;
    margin: 60px auto 0;
    width: ${WIDTH}px;
    canvas {
        display: block;
        border: 1px solid #D9DDE3;
        border-radius: 10px;
        cursor: crosshair;
    }
`)

export default withCropBox(ImageCanvas)
export { StyledImageCanvas }
