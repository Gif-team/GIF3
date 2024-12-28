import PostForm from "../components/postForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function PostEdit() {
  const Param = useParams();
  const [imgs, setImgs] = useState([]);
  const [post, setPost] = useState({});

  // 게시물 데이터를 서버에서 가져옴
  useEffect(() => {
    const getPost = () => {
      axios
        .get(`/api/post/${Param.id}`, { withCredentials: true })
        .then((res) => {
          setPost(res.data);
        })
        .catch((error) => console.error(error));
    };

    const getImgs = () => {
      axios
        .get(`/api/image/${Param.id}`, { withCredentials: true })
        .then((res) => {
          setImgs(res.data);
        })
        .catch((error) => console.error(error));
    };

    getPost();
    getImgs();
  }, [Param.id]);

  console.log(post);
  console.log(imgs);

  return <PostForm postData={post} postImgs={imgs} />;
}
