// React hooks
import { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { blogPostsActions } from '../../../features/blogPostsSlice';

// CSS
import classes from './EditPost.module.css';

// Interfaces
import { IRootState } from '../../../app/store';

type EditPostProps = {
    title: string;
    content: string;
    id: number;
};

function EditPost({ title, content, id }: EditPostProps) {
    // Redux
    const token = useSelector((state: IRootState) => state.user.token);
    const dispatch = useDispatch();

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
            const editedPost = await fetch(
                `http://localhost:5000/posts/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                    body: JSON.stringify(body),
                }
            );
            dispatch(blogPostsActions.editPost([body, id]));
            setIsModalVisible(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <button className={classes['edit-button']} onClick={showModal}>
                Edit post
            </button>
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
                    <button
                        className={classes['confirm-edit-button']}
                        onClick={updateBlogPost}
                    >
                        Edit post
                    </button>
                    <button
                        className={classes['cancel-button']}
                        onClick={hideModal}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditPost;
