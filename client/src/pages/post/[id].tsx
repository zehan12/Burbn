import { useParams } from "react-router-dom"

const Post = () => {
    const { id } = useParams();
    return (
        <div>
          <div>post {id}</div>
        </div>
    )
}

export default Post;