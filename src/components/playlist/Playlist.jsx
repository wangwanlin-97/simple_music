import React, { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { connect } from 'react-redux'

function Playlist(props) {
    // const playerRef = useRef()
    // useEffect(() => {
    //     console.log(playerRef.current.currentTime)
    // }, [])


    return (
        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', height: '91vh' }}>
            <div className='playlist_wrapper' style={{
                flex: 10,
                // overflow: 'auto', 
            }}>
                <Outlet />
            </div>
            {/* <div style={{ flex: 1, }}>
                <audio onMouseOver={() => { console.log(playerRef.current.currentTime) }} ref={playerRef} autoPlay style={{ width: '100vw' }} controls src={props.songurl}></audio>
            </div> */}

        </div>
    )
}



export default connect((state) => {

    return {
        songurl: state.nowPlayingSlicereducer.url
    }

})(Playlist)
