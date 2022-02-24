import React from 'react'
import Button from '@mui/material/Button';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';

function Upload() {
  return (
    <div className="upload-btn">
        <Button startIcon={<MovieIcon />} fullWidth component="label" style={{marginTop:'0.8rem'}} variant="outlined">
            <input type="file" accept="image/*" style={{display: 'none'}}/>
            Upload
        </Button>

        <LinearProgress className='progress-bar' variant="determinate" value={40} />

    </div>
  )
}

export default Upload