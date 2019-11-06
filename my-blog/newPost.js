const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const moment = require('moment');
const postSample = require('./postSample.json');

const questions = [
  {
    type: 'input',
    name: 'post_name',
    message: '请输入文件夹名称（仅限英文，单词间用短横杠‘-’连接）：',
    validate: value => {
      if (/(\.|\*|\?|\\|\/)/gi.test(value)) {
        return '文件夹名不得包含特殊符号（.*?\\/），请重新输入！';
      }

      if (/(([A-z]+-)+)?[A-z]+/gi.test(value)) {
        return true;
      }

      return '文件夹名不合法，请重新输入！';
    },
    filter: value => value.replace(/\s+/gi, '-')
  },
  {
    type: 'input',
    name: 'create_at',
    message: '请输入文章的发布时间（或者按回车键使用默认值）：',
    default: () => {
      return moment().format('YYYY-MM-DDThh:mm:ss');
    },
    validate: value => {
      if (/\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d/gi.test(value)) {
        return true;
      }

      return '时间格式不合法，请重新输入！';
    }
  }
];

inquirer
  .prompt(questions)
  .then(answers => {
    const { post_name, create_at } = answers;
    // const postDirName = `src/posts/${create_at}_${post_name}/`;
    const postDirName = `src/posts/20191104_${post_name}/`;
    console.log('create_at', create_at);

    if (fs.existsSync(path.resolve(postDirName))) {
      console.log('文件夹已存在~');
    } else {
      // 创建文章目录
      fs.mkdirSync(path.resolve(postDirName));
      // 写入md
      fs.writeFileSync(path.resolve(`${postDirName}article.md`), postSample.md, 'utf-8');
      // 写入缩略图（img.jpg）
      const base64Data = postSample.img.replace(/data:image\/\w+;base64,/i, '');
      const dataBuffer = new Buffer(base64Data, 'base64');
      fs.writeFileSync(path.resolve(`${postDirName}img.jpg`), dataBuffer);

      // console.log(`\n文章目录：\`${postDirName}\` 已创建，您可以愉快地编辑文章了！\n编辑完成后请使用 \`yarn compile\` 命令构建文章（自动构建功能正在努力开发中...）`);
      console.log(`\n文件夹：\`${postDirName}\` 已创建`);
    }
  })
  .catch(err => {
    console.log(err);
    console.log('文章目录创建失败');
  });
