import PostForm from "../components/postForm";
import { useEffect, useState, useParams } from "react";
import axios from "axios";

export function PostEdit() {
  const Param = useParams();
  const [postData, setPostData] = useState({});
  const [imgs, setImgs] = useState([]);
  const [post, setPost] = useState({});

  // 게시물 데이터를 서버에서 가져옴
  useEffect(() => {
    const getPost = () => {
      axios
        .get(`/api/post/${Param.id}`, { withCredentials: true })
        .then((res) => {
          setPost({
            title: res.data.title,
            content: res.data.content,
            LikeNumber: res.data.LikeNumber,
            price: res.data.price,
            realtime: res.data.realtime,
            category: res.data.category,
            building: res.data.building,
          });
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
    setPostData(post, imgs);
  }, [Param.id]);

  console.log(postData);

  return <PostForm postData={postData} />;
}
