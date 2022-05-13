import React from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Addsong from '../components/addsong/Addsong'
import Albumlist from '../components/albumlist/Albumlist'
import Ground from '../components/containers/Ground'
import List from '../components/containers/List'
import MyList from '../components/containers/MyList'
import Mainpage from '../components/mainpage/Mainpage'
import Mvplayer from '../components/mvPlayer/Mvplayer'
import Myvideo from '../components/mvPlayer/Myvideo'
import Videoplayer from '../components/mvPlayer/Videoplayer'
import Allplaylist from '../components/playlist/Allplaylist'
import Playlist from '../components/playlist/Playlist'
import Playlistdetail from '../components/playlist/Playlistdetail'
import Search from '../components/search/Search'

export default function MyRoutes() {
  return (
    <>
      <Routes>
        <Route path='/main' element={<Mainpage />}>
          <Route path='/main/ground' element={<Ground />}></Route>
          <Route path='/main/list' element={<List />}></Route>
          <Route path='/main/myList' element={<MyList />}></Route>
          {/* <Route path='*' element={<Navigate to={'/main/ground'} />}></Route> */}
        </Route>
        <Route path='/playlist' element={<Playlist />}>
          <Route path='/playlist/all/:tag' element={<Allplaylist />}></Route>
          <Route path='/playlist/:id' element={<Playlistdetail />}></Route>
        </Route>
        <Route path='/albumlist/:id' element={<Albumlist />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/mv/:id' element={<Mvplayer />}></Route>
        {/* <Route path='/video/:id' element={<Videoplayer />}></Route> */}
        <Route path='/addsong/:id' element={<Addsong />}></Route>
        {/* <Route path='/mv/:id' element={<Myvideo />}></Route> */}

        {/* <Route path='/player'></Route> */}
        <Route path='*' element={<Navigate to={'/main/ground'} />}></Route>
        {/* <NavLink to={'goound'}>广场</NavLink> */}

      </Routes>
    </>
  )
}
