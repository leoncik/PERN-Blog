// CSS
import classes from './Layout.module.css';

type LayoutProps = {
    children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
    return (
        <div className={classes.layout}>
            <main className={classes['page-content']}>{children}</main>
        </div>
    );
}

export default Layout;
