
#### 快速开始

```
# clone 到本地
git clone http://git.jd.com/yuanlong10/error-report.git
cd error-report
npm run install
```

#### 注意事项：
- 需要启动mongodb和mysql
- mongodb 不需要设置密码
- mysql的root用户的密码修改为'root', 5.8版本的修改方法如下

  ```
  mysql.service start
  mysql -u root
  > update mysql.user set authentication_string=password('root') where user='root';
  > flush privileges;
  mysql.server restart
  # 如果报mysql的数据表错误，则手动执行下
  source badjs-web/db/create.sql
  ```

#### 本地启动

```
# 注意权限
sudo npm run start
```

> 上报地址: `http://localhost/badjs`

> 管理后台地址: `http://localhost:8081`

#### 体验上报

- 在管理后台 申请新业务，申请完成会生成该业务的上报id
- 项目里引入脚本 `bj-report.min.js`
- 初始化上报

  ```
  BJ_REPORT.init({
    id: 1 //业务id
  })
  ```
- 上报方法：
  - 自动上报：该脚本会自动监测js包错，然后上报完整的错误信息
  - 手动上报：
    ```
    BJ_REPORT.report({
      msg: '手动上报错误信息',
      target: 'index.js', // 报错的脚本名称
      rowNum: 33 // 报错代码行数
    })
    ```

#### 参考文档
- [https://github.com/BetterJS/doc#系统架构](https://github.com/BetterJS/doc#系统架构)
- [https://github.com/BetterJS/badjs-report#getting-started](https://github.com/BetterJS/badjs-report#getting-started)


#### 更多
> 待部署...

