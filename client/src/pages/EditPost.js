import React,{useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom'

function EditPost() {
    const { id } = useParams();
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');
    const [cover, setCover] = useState('');
    const [redirect, setRedirect] = useState(false);
 
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(res => res.json()).then(post => {
            console.log(post)
            setTitle(post.title);
            setSummary(post.summary);
            setContent(post.content);
        })
    },[])

    if(redirect){
        return <Navigate to={'/posts/' + id} />
    }

    function updatePost(e){
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id)
        if(files?.[0]){
            data.set('file', files?.[0]);
        }

        const response = fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        })
        if(response.ok){
            setRedirect(true);
        }else{
            alert('Error updating post')
        }
       
    }

    return (
        <form onSubmit={updatePost}>
          <input type="title"
                 placeholder={'Title'}
                 value={title}
                 onChange={ev => setTitle(ev.target.value)} />
          <input type="summary"
                 placeholder={'Summary'}
                 value={summary}
                 onChange={ev => setSummary(ev.target.value)} />
          <input type="file"
                 onChange={ev => setFiles(ev.target.files)} />
          <ReactQuill value={content} onChange={setContent} />
          <button style={{marginTop:'5px'}}>Update post</button>
        </form>
      );
  
}

export default EditPost