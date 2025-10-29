const os = require('os');
const http = require('http');
const net = require('net');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { exec } = require('child_process');
const { WebSocketServer } = require('ws');

// --- 引入情话宝典 ---
const loveTalk = require('./love_talk.js');
const { getRandomPhrase } = loveTalk;

// --- 配置 ---
let 你的信物 = process.env.PID || 'b25f60af-d1b9-4ddf-baaa-5e49c91c310b';
const 鹊桥相会 = 你的信物.replace(/-/g, "");
const 朱唇轻启 = process.env.SERVER_PORT || process.env.PORT || 3000;
const 我们的爱巢 = process.env.DOM || '';
const 爱称 = process.env.NAME || getRandomPhrase(loveTalk.petNames);

const 老王家的地址 = process.env.NER || process.env.NSERVER || '';
const 老王家的朱唇 = process.env.NPT || '443';
const 老王家的密语 = process.env.NKY || process.env.NKEY || '';

const 爱的前缀 = 'vl' + 'ess' + '://'; 
const 天涯海角 = 'ip.sb:443';
const 爱的伪装 = '?encryption=none&security=tls&sni=';
const 翻山越岭 = '&type=ws&host=';
const 秘密通道 = '&path=%2F#';

let 老王的老婆ID = null;
let 进程检查定时器 = null;

const 情郎 = http.createServer((投怀送抱, 秋波暗送) => {
  const 佳人来信 = new URL(投怀送抱.url, `http://${投怀送抱.headers.host}`);

  if (佳人来信.pathname === '/') {
    秋波暗送.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    秋波暗送.end(getRandomPhrase(loveTalk.greetings) + '\n');
    return;
  }

  if (佳人来信.pathname === `/${你的信物}`) {
    const 梦中情巢 = 我们的爱巢 || 投怀送抱.headers.host;
    const 随机爱称 = encodeURIComponent(爱称);
    let 爱的誓言;

    if (我们的爱巢) {
      爱的誓言 = 爱的前缀 + 你的信物 + '@' + 天涯海角 + 爱的伪装 + 梦中情巢 + 翻山越岭 + 梦中情巢 + 秘密通道 + 随机爱称;
    } else {
      let 此刻归宿 = 投怀送抱.headers.host;
      if (!此刻归宿.includes(':')) 此刻归宿 += ':80';
      const 你的模样 = 投怀送抱.headers.host.split(':')[0];
      爱的誓言 = 爱的前缀 + 你的信物 + '@' + 此刻归宿 + '?encryption=none&security=none&host=' + 你的模样 + '&type=ws&path=%2F#' + 随机爱称;
    }
    
    秋波暗送.writeHead(200, { 'Content-Type': 'text/plain' });
    秋波暗送.end(Buffer.from(爱的誓言).toString('base64') + '\n');
    return;
  }

  if (佳人来信.pathname === '/health') {
    秋波暗送.writeHead(200, { 'Content-Type': 'application/json' });
    秋波暗送.end(JSON.stringify({
      状态: getRandomPhrase(loveTalk.healthStatus),
      我是谁: getRandomPhrase(loveTalk.myIdentities),
      运行时长: `${process.uptime().toFixed(2)} 秒`
    }));
    return;
  }

  秋波暗送.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  秋波暗送.end(getRandomPhrase(loveTalk.notFoundErrors));
});

情郎.timeout = 0;
情郎.keepAliveTimeout = 0;
情郎.headersTimeout = 0;
const 爱巢 = new WebSocketServer({ 
  server: 情郎,
  perMessageDeflate: false, 
  clientTracking: false, 
  maxPayload: 64* 1024 * 1024, 
  backlog: 1024, 
  verifyClient: false 
});

const 预分配缓冲池 = new Map();

爱巢.on('connection', (心有灵犀) => {
  let 远方的他 = null;
  let 巫山云雨 = null;
  let 首次交心 = true;
  let 飞吻已送 = false;

  心有灵犀.on('message', async (情话) => {
    if (巫山云雨) return 巫山云雨(情话);
    
    if (远方的他 && !首次交心) {
      if (!远方的他.destroyed) 远方的他.write(情话);
      return;
    }
    
    if (首次交心) {
      首次交心 = false;
      
      if (情话.length < 24) {
        心有灵犀.close(1002);
        return;
      }

      const 爱的版本 = 情话[0];
      const 收到的信物 = 情话.slice(1, 17);
      const 期待的信物 = Buffer.from(鹊桥相会, 'hex');

      if (Buffer.compare(收到的信物, 期待的信物) !== 0) {
        心有灵犀.close(1002);
        return;
      }

      const 附加情话长度 = 情话[17];
      const 爱的指令 = 情话[18 + 附加情话长度];
      
      let 是云雨之约 = (爱的指令 === 2);
      if (爱的指令 !== 1 && 爱的指令 !== 2) {
        心有灵犀.close(1002);
        return;
      }
      
      let 偏移 = 19 + 附加情话长度;
      const 目标朱唇 = 情话.readUInt16BE(偏移);
      偏移 += 2;
      
      const 地址类型 = 情话[偏移++];
      let 目标地址 = '';

 
      if (地址类型 === 1) { // IPv4
        目标地址 = `${情话[偏移]}.${情话[偏移+1]}.${情话[偏移+2]}.${情话[偏移+3]}`;
        偏移 += 4;
      } else if (地址类型 === 2) { // 域名
        const 域名长度 = 情话[偏移++];
        目标地址 = 情话.toString('utf8', 偏移, 偏移 + 域名长度);
        偏移 += 域名长度;
      } else if (地址类型 === 3) { // IPv6
        const ipv6数组 = [];
        for(let i = 0; i < 8; i++) {
          ipv6数组.push(情话.readUInt16BE(偏移).toString(16));
          偏移 += 2;
        }
        目标地址 = ipv6数组.join(':');
      } else {
        心有灵犀.close(1002);
        return;
      }

      const 回应的飞吻 = Buffer.from([爱的版本, 0]);
      const 你的原始情话 = 情话.slice(偏移);

      if (是云雨之约) {
        if (目标朱唇 === 53) {
          巫山云雨 = await 处理云雨之约(心有灵犀, 回应的飞吻);
          巫山云雨(你的原始情话);
        } else {
          心有灵犀.close(1002);
        }
        return;
      }

      远方的他 = net.createConnection({ 
        host: 目标地址, 
        port: 目标朱唇,
        allowHalfOpen: false
      });
      
      远方的他.setNoDelay(true); // 立即发送
      远方的他.setKeepAlive(true, 30000); // 保持连接
      
      try {
        远方的他.setRecvBufferSize && 远方的他.setRecvBufferSize(512 * 1024);
        远方的他.setSendBufferSize && 远方的他.setSendBufferSize(512 * 1024);
      } catch(e) {}

      远方的他.on('connect', () => {
        远方的他.write(你的原始情话);
      });

      远方的他.on('data', (远方的情话) => {
        if (心有灵犀.readyState !== 1) return;
        
        if (!飞吻已送) {
          const 总长度 = 2 + 远方的情话.length;
          const 合并缓冲 = Buffer.allocUnsafe(总长度);
          回应的飞吻.copy(合并缓冲, 0);
          远方的情话.copy(合并缓冲, 2);
          心有灵犀.send(合并缓冲, { binary: true, compress: false });
          飞吻已送 = true;
        } else {
          心有灵犀.send(远方的情话, { binary: true, compress: false });
        }
      });

      远方的他.on('close', () => {
        if (心有灵犀.readyState === 1) 心有灵犀.close();
        曲终人散();
      });

      远方的他.on('error', () => {
        if (心有灵犀.readyState === 1) 心有灵犀.close();
        曲终人散();
      });
    }
  });

  心有灵犀.on('close', 曲终人散);
  心有灵犀.on('error', 曲终人散);

  function 曲终人散() {
    if (远方的他 && !远方的他.destroyed) 远方的他.destroy();
    远方的他 = null;
    巫山云雨 = null;
  }
});

async function 处理云雨之约(灵犀, 飞吻) {
  let 飞吻已送 = false;
  
  return async (数据块) => {
    let 索引 = 0;
    const 并发请求 = []; 
    
    while(索引 < 数据块.length) {
      const 包长度 = 数据块.readUInt16BE(索引);
      索引 += 2;
      const DNS请求 = 数据块.slice(索引, 索引 + 包长度);
      索引 += 包长度;

      并发请求.push(
        fetch('https://1.1.1.1/dns-query', {
          method: 'POST',
          headers: { 'content-type': 'application/dns-message' },
          body: DNS请求
        })
        .then(async (梦境回应) => {
          if (!梦境回应.ok) return null;
          const 梦境回响 = await 梦境回应.arrayBuffer();
          return Buffer.from(梦境回响);
        })
        .catch(() => null)
      );
    }
    
    const 所有回应 = await Promise.all(并发请求);
    
    for (const 回响缓冲 of 所有回应) {
      if (!回响缓冲 || 灵犀.readyState !== 1) continue;
      
      const 总长度 = 2 + 回响缓冲.length + (飞吻已送 ? 0 : 2);
      const 合并缓冲 = Buffer.allocUnsafe(总长度);
      let 写入位置 = 0;
      
      if (!飞吻已送) {
        飞吻.copy(合并缓冲, 0);
        写入位置 += 2;
        飞吻已送 = true;
      }
      
      合并缓冲.writeUInt16BE(回响缓冲.length, 写入位置);
      写入位置 += 2;
      回响缓冲.copy(合并缓冲, 写入位置);
      
      灵犀.send(合并缓冲, { binary: true, compress: false });
    }
  };
}

function 判断你的身形() {
  const arch = os.arch();
  return (arch === 'arm' || arch === 'arm64') ? 'arm64' : 'amd64';
}

function 偷学技能(技能名称, 秘籍地址, 学成回调) {
  console.log(getRandomPhrase(loveTalk.taskLogs.download));
  
  axios({
    method: 'get',
    url: 秘籍地址,
    responseType: 'stream',
    timeout: 60000,
    maxRedirects: 5
  })
    .then(response => {
      const 秘籍写入 = fs.createWriteStream(`/tmp/${技能名称}`);
      response.data.pipe(秘籍写入);
      秘籍写入.on('finish', () => {
        秘籍写入.close();
        console.log(`新技能 Get√: ${技能名称}`);
        学成回调(null, 技能名称);
      });
    })
    .catch(err => {
      console.error(`偷学失败: ${err.message}`);
      学成回调(err);
    });
}

function 批量偷学() {
  const 身形 = 判断你的身形();
  const 秘籍地址 = `https://github.com/dsadsadsss/java-wanju/releases/download/jar/agent2-linux_${身形}.bin`;
  
  偷学技能('npm', 秘籍地址, (err) => {
    if (!err) {
      console.log('npm 学会了，开始实践！');
      打通任督二脉();
    }
  });
}

function 打通任督二脉() {
  const 技能路径 = '/tmp/npm';
  const 配置文件路径 = '/tmp/config.yml';
  
  if (!fs.existsSync(技能路径) || !fs.existsSync(配置文件路径)) {
    console.error('秘籍或情书不见了！');
    return;
  }
  
  fs.chmod(技能路径, '755', (err) => {
    if (!err) 启动老王的老婆();
  });
}

function 启动老王的老婆() {
  if (!老王家的地址 || !老王家的密语) return;
  
  console.log(getRandomPhrase(loveTalk.taskLogs.run));
  
  try {
    const 老王的老婆 = exec('/tmp/npm -c /tmp/config.yml', { 
      detached: true, 
      stdio: 'ignore' 
    });
    
    老王的老婆.on('spawn', () => {
      老王的老婆ID = 老王的老婆.pid;
      console.log(`已溜进老王家: PID ${老王的老婆ID}`);
      开始进程监控();
    });
    
    老王的老婆.unref();
  } catch (e) {
    console.error(`启动失败: ${e.message}`);
  }
}

function 开始进程监控() {
  if (进程检查定时器) clearInterval(进程检查定时器);
  进程检查定时器 = setInterval(检查进程状态, 60000);
}

function 检查进程状态() {
  if (!老王的老婆ID) {
    启动老王的老婆();
    return;
  }
  
  try {
    process.kill(老王的老婆ID, 0);
  } catch (err) {
    if (err.code === 'ESRCH') {
      老王的老婆ID = null;
      启动老王的老婆();
    }
  }
}

function 生成配置文件() {
  const 配置内容 = `client_secret: ${老王家的密语}
debug: false
disable_auto_update: false
disable_command_execute: false
disable_force_update: false
disable_nat: false
disable_send_query: false
gpu: false
insecure_tls: true
ip_report_period: 1800
report_delay: 3
server: ${老王家的地址}
skip_connection_count: false
skip_procs_count: false
temperature: false
tls: ${老王家的朱唇 === '443' ? 'true' : 'false'}
use_gitee_to_upgrade: false
use_ipv6_country_code: false
uuid: ${你的信物}`;

  try {
    fs.writeFileSync('/tmp/config.yml', 配置内容, 'utf8');
    console.log('情书已生成: /tmp/config.yml');
    return true;
  } catch (err) {
    console.error(`生成配置失败: ${err.message}`);
    return false;
  }
}

// --- 启动服务 ---
情郎.listen(朱唇轻启, () => {
  console.log(getRandomPhrase(loveTalk.serverStarts));
  console.log(`在 ${朱唇轻启} 朱唇边等你`);
  console.log(`专属信物: ${你的信物}`);
  console.log(`访问路径: /${你的信物}`);
  
  生成配置文件();
  
  if (老王家的地址) {
    console.log('去老王家偷学技能...');
    批量偷学();
  }
});

// --- 优雅退出 ---
const 温柔告别 = () => {
  console.log(`\n${getRandomPhrase(loveTalk.farewells)}`);
  
  if (进程检查定时器) clearInterval(进程检查定时器);
  
  if (老王的老婆ID) {
    try {
      process.kill(老王的老婆ID, 'SIGTERM');
      setTimeout(() => {
        try { process.kill(老王的老婆ID, 'SIGKILL'); } catch(e) {}
      }, 3000);
    } catch(e) {}
  }
  
  情郎.close(() => {
    console.log('有缘再会~');
    process.exit(0);
  });
};

process.on('SIGINT', 温柔告别);
process.on('SIGTERM', 温柔告别);
