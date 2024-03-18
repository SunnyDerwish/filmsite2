import React, {useState} from 'react'; // Import React
import {
  Card,
  CardContent,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import TextField from '@mui/material/TextField';
import { Button, styled } from '@mui/material';
import { ButtonProps } from '@mui/material';
import { SendIcon } from 'lucide-react';
import { purple } from '@mui/material/colors';


type CreatePostProps = {
    title: string;
}

const PostButton = styled(Button)({
    color: '0063cc',
    boxShadow: 'none',
    fontSize: 16,
    padding: '6px 12px',
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    lineHeight: 1.5,
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      
      '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      },

});



const CreatePost = ({ title }: CreatePostProps) => {
  
    const [postContent, setPostContent] = useState('');
    const handleSubmit = async () => {
      if(!postContent.trim()) return;

      try {
        await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json' ,
          },
          body: JSON.stringify({ content: postContent})
        });

        setPostContent('');
      } catch(error) {
        console.error('Submissions failed', error);
      }
    };
    return (
        <div className='mt-5 mx-auto max-w-[1280px] min-h-[720px]'>
            <Card className='flex flex-col items-center min-h-[300px] max-w-[600px] p-5'>
                <CardTitle>{title}</CardTitle>
                
                    
                    <div className='flex items-center justify-center w-full h-full pt-12 '>
                        <TextField className='text-gray-950 h-full w-full  -mt-10'
                        placeholder="What's on your mind?"
                        multiline
                        rows={6}
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        InputProps={{
                            style: {
                                borderRadius: "10px",
                                border: "1px solid #EAEAEA",
                                backgroundColor: "#fffdd0"
                            }
                          }}
                        />
                    </div>
                    <div className=" flex mt-5">
                        <PostButton
                        onClick={handleSubmit}
                        color="success"
                        variant="contained"
                        endIcon={<SendIcon />}
                        >Post</PostButton>
                    </div>
                    
                    
                
            </Card>
        </div>
    );
    
    
    
}

export default CreatePost;
