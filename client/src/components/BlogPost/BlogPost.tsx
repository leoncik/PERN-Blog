type BlogPostProps = {
    title: string;
    content: string;
};

function BlogPost({ title, content }: BlogPostProps) {
    return (
        <article>
            <h2>{title}</h2>
            <p>{content}</p>
        </article>
    );
}

export default BlogPost;
