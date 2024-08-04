import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, SideBar, Footer , LoadingSpinner} from './components/index';
import { useDispatch, useSelector } from 'react-redux';
import { login as authLogin, logout } from "./store/authSlice";
import { video } from "./store/videoSlice";
import { setTweets } from "./store/tweetSlice";
import { setPlaylist } from "./store/playlistSlice";
import { login as connecting, getAllVideos, getTweets, getUserPlaylists, currentUser } from './connecting/connecting';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [status , setStatus] = useState(useSelector((state) => state.auth.status))

  useEffect(() => {
    const login = async () => {
      try {
        const res = await currentUser();
        
        const id = res?.message?._id;
        setUserId(id);
        dispatch(authLogin(res.message));
        
        const videosRes = await getAllVideos({ page: 1 });
        dispatch(video(videosRes.message.videos));
        
        const tweetsRes = await getTweets({ page: 1 });
        dispatch(setTweets(tweetsRes.message));
        
        const playlistsRes = await getUserPlaylists(id);
        dispatch(setPlaylist(playlistsRes.message));
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };
    
    login();
  }, [dispatch]);

  if (loading) return <div className='text-white'><LoadingSpinner /></div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
            <div className="hidden lg:block">
              <SideBar />
            </div>
            <div className="flex-1 flex flex-col lg:ml-64 bg-zinc-900">
              <div className="flex-1 lg:p-4 sm:p-2">
                <Outlet />
              </div>
            </div>
      </div>
        <div className="lg:hidden">
          <Footer />
        </div>
    </div>
  );
}

export default App;
