# QKI 每日转出统计

网页：https://bu-qi.github.io/qki-daily-outflow/

追踪地址：`0x1BaaCb73A31e2014185D9e2D6bC895184DC8c4Aa`

## 功能

- 按北京时间 UTC+8 的自然日统计 QKI 转出数量与成功笔数。
- 近 7 / 30 / 90 天与自定义日期范围（每次最多 366 天）。
- 趋势图、按日交易明细、QKISCAN 交易链接、完整精度 CSV 导出。
- 页面打开时每 5 分钟刷新，支持关闭自动刷新。

## 统计口径

每日区间为 `[当日 00:00，次日 00:00)`，仅累计该地址发起、已上链且状态成功、金额大于零的交易携带的原生 QKI。包含转给合约及自身的金额；不含手续费、失败与待确认交易、合约内部转账、其他代币。

从 QKISCAN 的公开接口 `https://api1.qkiscan.io/api/v2/addresses/{address}/transactions?filter=from` 逐页读取，完整覆盖所选日期后才显示统计。使用 BigInt 累加 18 位精度金额，以交易哈希去重。没有记录的日期显示 0；接口失败时显示错误，不将不完整数据作为结果。受区块浏览器索引时效与可用性影响。

无需钱包、API 密钥或服务器。页面关闭后不执行定时任务；重新打开会重新同步。

## 本地开发与更新

需要 Node.js 22.13+。

```sh
npm ci
npm test
npm run dev
```

发布更新：

```sh
npm test
npm run build
git add src public index.html package.json package-lock.json tsconfig.json vite.config.mjs check.mjs docs
git commit -m "Update QKI dashboard"
git push
```

GitHub Pages 使用 `main` 分支的 `/docs` 目录。源码与可发布文件均保存在仓库中。
