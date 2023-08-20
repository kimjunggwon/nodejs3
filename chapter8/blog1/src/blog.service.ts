//게시글의 타입 정보 임포트
import { filter } from 'rxjs';
import { PostDto } from './blog.model';

export class BlogService {
  //게시글 배열 선언
  posts = [];

  //모든 게시물 가져오기
  getAllPosts(){
    return this.posts;
  }

  //게시글 작성
  createPost(postDto: PostDto) {
    const id = this.posts.length + 1;
    this.posts.push({
      id: id.toString(),
      ...postDto,
      createdDt: new Date()
    });
  }

  //게시글 하나 가져오기
  getPost(id) {
    const post = this.posts.find((post) => {
      return post.id === id;
    });
    console.log(post);
    return post;
  }

  //게시글 삭제
  delete(id) {
    const filteredPosts = this.posts.filter((post) => post.id !== id);
    this.posts = [...filteredPosts];
  }

  //게시글 업데이트
  updatePost(id, postDto: PostDto){
    let updateIndex = this.posts.findIndex((post) => post.id === id);
    const updatePost = {
      id,
      ...postDto,
      updateDt: new Date()
    };
    this.posts[updateIndex] = updatePost;
    return updatePost;
  }
}