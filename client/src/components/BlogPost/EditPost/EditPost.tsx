// React hooks
import { useEffect, useRef, useState } from 'react';

// CSS
import classes from './EditPost.module.css';

type EditPostProps = {
    title: string;
    content: string;
    id: number;
};

function EditPost({ title, content, id }: EditPostProps) {
    // States
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [postTitle, setPostTitle] = useState(title);
    const [postContent, setPostContent] = useState(content);

    const showModal = () => {
        setIsModalVisible(true);
    };
    const hideModal = () => {
        setIsModalVisible(false);
        setPostTitle(title);
        setPostContent(content);
    };

    const updateBlogPost = async () => {
        try {
            const body = {
                title: postTitle,
                content: postContent,
            };
            const response = await fetch(`http://localhost:5000/posts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            setIsModalVisible(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <button onClick={showModal}>Edit post</button>
            <div
                className={classes['modal']}
                style={{ display: isModalVisible ? 'block' : 'none' }}
            >
                <div className={classes['modal-body']}>
                    <p>Select a new title</p>
                    <input
                        type="text"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                    />
                    <p>Edit content</p>
                    <textarea
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                    ></textarea>
                    <button onClick={hideModal}>Cancel</button>
                    <button onClick={updateBlogPost}>Edit post</button>
                </div>
            </div>
        </div>
    );
}

export default EditPost;