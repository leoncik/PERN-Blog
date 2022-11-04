// React hooks
import { useEffect, useRef, useState } from 'react';

// CSS
import classes from './EditPost.module.css';

type EditPostProps = {
    title: string;
    content: string;
};

function EditPost({ title, content }: EditPostProps) {
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
                </div>
            </div>
        </div>
    );
}

export default EditPost;
