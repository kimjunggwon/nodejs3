//데코레이터 함수 임포트
import { Controller, Param, Body, Delete, Get, Post, Put } from '@nestjs/common';
//블로그 서비스 임포트
import { BlogService } from './blog.service';

//클래스에 붙이는 Controller 데코레이터
@Controller('blog')
export class BlogController {

  blogService: BlogService;

  constructor(){
    this.blogService = new BlogService();
  }
  
  //Get 요청 처리
  @Get()
  getAllPosts() {
    console.log("모든 게시물 가져오기");
    return this.blogService.getAllPosts();
  }

  //Post요청 처리
  @Post()
  //HTTP 요청의 body 내용을 post에 할당
  createPost(@Body() postDto) {
    console.log("게시글 작성");
    this.blogService.createPost(postDto);
    return 'success';
  }

  @Get('/:id')
  //GET에 URL 매개변수에 id가 있는 요청 처리
  getPost(@Param('id') id: string) {
    console.log(`[id: ${id}] 게시글 하나 가져오기`);
    return this.blogService.getPost(id);
  }

  @Delete('/:id')
  //DELETE 방식에 URL 매개변수로 id가 있는 요청 처리
  deletePost(@Param('id') id: string) {
    console.log("게시글 삭제");
    this.blogService.delete(id);
    return 'success';
  }

  @Put('/:id')
  //PUT 방식에 URL 매개변수로 전달된 id가 있는 요청 처리
  updatePost(@Param('id') id: string, @Body() postDto) {
    console.log(`[${id}] 게시글 업데이트`, id, postDto);
    return this.blogService.updatePost(id, postDto);
  }
}