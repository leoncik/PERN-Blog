// CSS
import classes from './PageTitle.module.css';

type PageTitleProps = {
    title: string;
};

function PageTitle({ title }: PageTitleProps) {
    return (
        <div className={classes['page-title']}>
            <h1>{title}</h1>
        </div>
    );
}

export default PageTitle;
