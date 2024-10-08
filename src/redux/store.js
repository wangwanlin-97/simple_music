import {createSlice, configureStore} from "@reduxjs/toolkit"
//主页tab
const sightSlice = createSlice({
  name: "sight",
  initialState: {
    page: 0,
  },
  reducers: {
    ground: state => {
      state.page = 0
    },
    list: state => {
      state.page = 1
    },
    myList: state => {
      state.page = 2
    },
  },
})
//sideBar是否隐藏
const sideBarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isDisplay: false,
    isLoading: false,
  },
  reducers: {
    showBar: state => {
      state.isDisplay = true
    },
    hideBar: state => {
      state.isDisplay = false
    },
    settrue: state => {
      state.isLoading = true
    },
    setfalse: state => {
      state.isLoading = false
    },
  },
})
//当前播放歌曲
const nowPlayingSlice = createSlice({
  name: "nowplaying",
  initialState: {
    url: "",
    isplaying: false,
    isbig: false,
    songInfo: {
      name: "",
      author: "",
      picUrl: "",
      id: "",
    },
    playInfo: {
      duration: 0,
      currentTime: 0,
    },
    playlist: [],
    currentIndex: 0,
    isShow: false,
    manualyFlag: false,
    searchType: 1,
    searchlist: [],
    searchword: "",
    playmode: 0,
    ismvplaying: false,
    showlist: false,
    prestate: false,
  },
  reducers: {
    getsongurl: (state, action) => {
      state.url = action.payload
    },
    toggle: (state, action) => {
      state.isplaying = action.payload
    },
    changebig: (state, action) => {
      state.isbig = action.payload
    },
    saveSongInfo: (state, action) => {
      state.songInfo = action.payload
    },
    savePlayInfo: (state, action) => {
      state.playInfo = action.payload
    },
    savePlaylist: (state, action) => {
      state.playlist = action.payload
    },
    setIndex: (state, action) => {
      state.currentIndex = action.payload
    },
    toggleIsShow: (state, action) => {
      state.isShow = action.payload
    },
    toggleManualyFlag: (state, action) => {
      state.manualyFlag = action.payload
    },
    toggleSearchType: (state, action) => {
      state.searchType = action.payload
    },
    toggleSearchlist: (state, action) => {
      state.searchlist = action.payload
    },
    togglesearchword: (state, action) => {
      state.searchword = action.payload
    },
    toggleplaymode: (state, action) => {
      state.playmode = action.payload
    },
    togglemvplaying: (state, action) => {
      state.ismvplaying = action.payload
    },
    toggleshowlist: (state, action) => {
      state.showlist = action.payload
    },
    toggleprestate: (state, action) => {
      state.prestate = action.payload
    },
  },
})
//当前选中的tag
const selectedtagSlice = createSlice({
  name: "selectedTag",
  initialState: {
    selectedtag: "华语",
  },
  reducers: {
    saveTag: (state, action) => {
      state.selectedtag = action.payload
    },
  },
})

export const {ground, list, myList} = sightSlice.actions
export const {showBar, hideBar, settrue, setfalse} = sideBarSlice.actions
export const {
  getsongurl,
  toggle,
  changebig,
  savePlayInfo,
  saveSongInfo,
  savePlaylist,
  setIndex,
  toggleIsShow,
  toggleManualyFlag,
  toggleSearchType,
  toggleSearchlist,
  togglesearchword,
  toggleplaymode,
  togglemvplaying,
  toggleshowlist,
  toggleprestate,
} = nowPlayingSlice.actions
export const {saveTag} = selectedtagSlice.actions

export const store = configureStore({
  reducer: {
    sightSlicereducer: sightSlice.reducer,
    sideBarSlicereducer: sideBarSlice.reducer,
    nowPlayingSlicereducer: nowPlayingSlice.reducer,
    selectedtagSlicereducer: selectedtagSlice.reducer,
  },
})
