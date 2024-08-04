import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {ForgetPassword,Subscribers, Home, LikedVideos, Login, MyDashboard, PlaylistPage, 
  PopupExample, ProfilePage, RegisteredUsers, Signup , Tweet, Settings, UploadVideo, 
  UserDashboard, Video, VideoPage, UpdateVideo, SearchVideo , AuthLayout,
  ComplaintForm,
  DescriptionPage} from './components/index.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
      path : "/",
      element : <AuthLayout authentication={false}><Home /></AuthLayout>
      },{
          path : "/login",
          element : <AuthLayout authentication={false}>
                      <Login />
                    </AuthLayout>
        },{
          path : "/signup",
          element : <AuthLayout authentication={false}>
                      <Signup/>
                    </AuthLayout>
        },{
          path : "/forget-password",
          element : <AuthLayout authentication={false}>
                      <ForgetPassword />
                    </AuthLayout>
        },{
          path : "/videos",
          element : <AuthLayout authentication>
                      <Video />
                    </AuthLayout>
        },{
          path : "/user-dashboard/:slug",
          element : <AuthLayout authentication>
                      <UserDashboard />
                    </AuthLayout>
        },{
          path : "/registered-users",
          element : <AuthLayout authentication>
                      <RegisteredUsers />
                    </AuthLayout>
        },{
          path : "/tweets",
          element : <AuthLayout authentication>
                      <Tweet />
                    </AuthLayout>
        },{
          path : "/video/:slug",
          element : <AuthLayout authentication>
                      <VideoPage />
                    </AuthLayout>
        },{
          path : "/profile-page",
          element : <AuthLayout authentication>
                      <ProfilePage />
                    </AuthLayout>
        },{
          path : "/playlist-page/:slug",
          element : <AuthLayout authentication>
                      <PlaylistPage/>
                    </AuthLayout>
        },{
          path:"/upload-video",
          element: <AuthLayout authentication>
                      <UploadVideo />
                    </AuthLayout>
        },{
          path : "/My-dashboard",
          element: <AuthLayout authentication>
                      <MyDashboard />
                    </AuthLayout>
        },{
          path : "/liked-videos",
          element : <AuthLayout authentication>
                      <LikedVideos/>
                    </AuthLayout>
        },{
          path : "/settings",
          element : <AuthLayout authentication>
                      <Settings/>
                    </AuthLayout>
        },{
          path : "/subscribers/:slug",
          element : <AuthLayout authentication>
                      <Subscribers/>
                    </AuthLayout>
        },{
          path : "/update-video/:slug",
          element : <AuthLayout authentication>
                      <UpdateVideo/>
                    </AuthLayout>
        },{
          path : "/search-video/:event/:search",
          element : <AuthLayout authentication>
                      <SearchVideo />
                      </AuthLayout>
        },{
          path : "/contact-us",
          element : <ComplaintForm />
        },{
          path : "/description",
          element : <DescriptionPage/>
        }
      ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
