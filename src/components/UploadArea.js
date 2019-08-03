import React, { useCallback } from 'react'
import styled from 'styled-components'
import withImageFile from '../contexts/ImageFileContext/withImageFile'

const UploadArea = (props) => {
    const { className, imageFile } = props
    const { setImage } = imageFile
    const changeHandler = useCallback(
        ({ target }) => {
            setImage(target.files[0])
        },
        [setImage]
    )

    return (
        <div className={className}>
            <input id="uploadImg" type="file" accept="image/*" onChange={changeHandler} />
            <label htmlFor="uploadImg">Click here to upload image</label>
        </div>
    )
}

const StyledUploadArea = withImageFile(styled(UploadArea)`
    input {
        display: none;
    }
    label {
        display: block;
        margin: 60px auto 0;
        width: 355px;
        height: 156px;
        line-height: 156px;
        color: #ccc;
        text-align: center;
        border: 1px solid #D9DDE3;
        border-radius: 10px;
        cursor: pointer;
    }
`)

export default withImageFile(UploadArea)
export { StyledUploadArea }
