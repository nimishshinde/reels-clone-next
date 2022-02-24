import React from 'react'
import Navbar from './navbar';
import Upload from './upload';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
function Feed() {
  return (
    <div className='feed-container'>
      <Navbar />
      <Upload />

      <div className="video-container">
        <div className="post-container">
          <video />
          
          <div className="video-info">
            <div className="avatar-info">
              <Avatar sx={{margin:"0.5rem"}} />
              {/* alt="Remy Sharp" src="/static/images/avatar/2.jpg" */}
              <div>Name</div>
            </div>

            <div className="like-info">
              < FavoriteIcon/>
              <div> 10 </div>
            </div>  
            
          </div>    
          
        </div>
      </div>

    </div>
  )
}

export default Feed;