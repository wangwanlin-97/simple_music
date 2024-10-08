import axios from "axios"
import {getsongurl, toggle, saveSongInfo} from "../redux/store"
import {store} from "../redux/store"

const handleGetSongUrl = (id, obj) => {
  axios.get(`/song/url?id=${id}`).then(res => {
    // getsongurl(res.data.data[0].url)
    // store.dispatch(getsongurl)
    store.dispatch({type: "nowplaying/toggle", payload: true})
    store.dispatch({type: "nowplaying/saveSongInfo", payload: obj})

    // res.data.data[0].url ? (() => {
    // store.dispatch({ type: 'nowplaying/getsongurl', payload: res.data.data[0].url })

    // getsongurl(res.data.data[0].url); toggle(true); saveSongInfo(obj)
    // })() : (() => {
    // alert('获取资源失败');
    // store.dispatch({ type: 'nowplaying/getsongurl', payload: null })

    //  getsongurl(null)
    // })()
  })
}
export {handleGetSongUrl}
