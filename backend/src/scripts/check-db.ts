/**
 * check-db.ts — Phase 2B 数据库读取验证脚本
 *
 * 读取并打印各表数量和样例数据。
 * 本脚本仅用于验证 Prisma Client 读取路径，不是生产查询脚本。
 *
 * 用法: npm run db:check
 */

import prisma from "../lib/prisma";

async function check() {
  console.log("[check-db] 开始读取数据库 ...\n");

  // 各表数量
  const adminCount = await prisma.admin.count();
  const productCount = await prisma.product.count();
  const caseCount = await prisma.case.count();
  const messageCount = await prisma.message.count();
  const siteSettingCount = await prisma.siteSetting.count();

  console.log(`Admin 数量: ${adminCount}`);
  console.log(`Product 数量: ${productCount}`);
  console.log(`Case 数量: ${caseCount}`);
  console.log(`Message 数量: ${messageCount}`);
  console.log(`SiteSetting 数量: ${siteSettingCount}`);

  console.log("");

  // 至少一条 Product 的 name
  const firstProduct = await prisma.product.findFirst({ orderBy: { id: "asc" } });
  if (firstProduct) {
    console.log(`Product name: ${firstProduct.name}`);
  } else {
    console.log("Product: (无数据)");
  }

  // 至少一条 Case 的 title
  const firstCase = await prisma.case.findFirst({ orderBy: { id: "asc" } });
  if (firstCase) {
    console.log(`Case title: ${firstCase.title}`);
  } else {
    console.log("Case: (无数据)");
  }

  console.log("\n[check-db] 完成。");
}

check()
  .catch((error) => {
    console.error("[check-db] 错误:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
