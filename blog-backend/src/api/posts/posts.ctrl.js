let postId = 1;

//초기 데이터
const posts = [
  {
    id: 1,
    title: '제목',
    body: '내용',
  },
];

//포스트 작성 POST
exports.write = ctx => {
  //REST API Body 조회 = ctx.request.body
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = {
    id: postId,
    title,
    body,
  };
  posts.push(post);
  ctx.body = post;
};

//포스트 목록조회 GET
exports.list = ctx => {
  ctx.body = posts;
};

//특정 포스트 조회 GET
exports.read = ctx => {
  const { id } = ctx.params;
  const post = posts.find(p => p.id.toString() === id);
  //포스트가 없을경우
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다',
    };
    return;
  }
  ctx.body = post;
};

//특정 포스트 제거 DELETE
exports.remove = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  //포스트가 없을경우
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  posts.splice(index, 1);
  ctx.status = 204;
};

//포스트 수정 PUT
exports.replace = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  //전체 객체에 덮어씌우기
  posts[index] = {
    id,
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};

//포스트 수정 PATCH
exports.update = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  //기본값에 정보를 덮어씌우기
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};
