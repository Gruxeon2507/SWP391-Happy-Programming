import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PostServices from '../../services/PostServices.js';
import { waitFor } from '@testing-library/react';

function CreatePost(props) {
    const editorRef = useRef(null);
    const { courseId } = props;
    const [content, setContent] = useState("");
    const string = `<p>&lt;script&gt;alert("asdqweqw")&lt;/script&gt;</p>
    <ol>
    <li>&lt;script&gt;alert("asdqweqw")&lt;/script&gt;</li>
    <li>easd</li>
    <li>qweqwe</li>
    </ol>`
    const log = async () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            setContent(editorRef.current.getContent())
            
        }
    };
    useEffect(() => {
        if(content!==""){
            PostServices.createNewPost(content,courseId);
            // window.location.reload();
        }
    }, [content])

    return (
        <>
            <script src="https://cdn.tiny.cloud/1/7gca6rd380t0u0ekt9tt29lep0rz455ogbjyu7j14tyu570b/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue= {string}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                        'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                        'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <button onClick={log}>Log editor content</button>
            <div>
                {content ? <div dangerouslySetInnerHTML={{ __html: content }} /> : null}
            </div>


        </>
    )
}

export default CreatePost;