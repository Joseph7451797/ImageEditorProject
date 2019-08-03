import React, { useState } from 'react'
import styled from 'styled-components'
import { StyledWorkArea } from './components/WorkArea'
import { StyledDisplayArea } from './components/DisplayArea'
import { CropBoxContext } from './contexts/CropBoxContext/cropBox-context'

const App = (props) => {
    const { className } = props
    const [cropBoxes, setCropBoxes] = useState([])

    return (
        <CropBoxContext.Provider value={{
            cropBoxes,
            setCropBoxes
        }}>
            <div className={className}>
                <StyledWorkArea />
                <StyledDisplayArea />
            </div>
        </CropBoxContext.Provider>
    )
}

const StyledApp = styled(App)`
    padding-top: 20px;
    display: flex;
    justify-content: space-around;
`

export default App
export { StyledApp }
