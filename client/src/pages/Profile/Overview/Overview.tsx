// Redux
import { useSelector } from 'react-redux';

// CSS
import classes from './Overview.module.css';

// Interfaces
import { IRootState } from '../../../app/store';

// Assets
import defaultAvatar from '../../../assets/images/default-avatar.svg';

function Overview() {
    // Redux
    const avatar = useSelector((state: IRootState) => state.user.avatar);
    const registredDate = useSelector(
        (state: IRootState) => state.user.registeredDate
    );
    const blogPosts = useSelector(
        (state: IRootState) => state.blogPosts?.blogPosts
    );

    // Assets
    const baseAvatarSrc = 'http://localhost:5000/images/avatar/';

    return (
        <>
            <h2>Overview</h2>
            <section className={classes['overview']}>
                <div className={classes['stats']}>
                    <p>
                        Member since : 
                        <span className={classes['stat-value']}>
                            {new Date(registredDate).getDate() +
                                '/' +
                                (new Date(registredDate).getMonth() + 1) +
                                '/' +
                                new Date(registredDate).getFullYear()}
                        </span>
                    </p>
                    <p>
                        Number of posts written : 
                        <span className={classes['stat-value']}>
                            {blogPosts !== null && blogPosts !== undefined
                                ? blogPosts.length
                                : 0}
                        </span>
                    </p>
                </div>
                <div className={classes['frame']}>
                    <img
                        className={classes['avatar-picture']}
                        src={avatar ? baseAvatarSrc + avatar : defaultAvatar}
                        alt="Your profile picture."
                    />
                </div>
            </section>
        </>
    );
}

export default Overview;
