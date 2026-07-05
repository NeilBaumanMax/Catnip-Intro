/**
 * seed.ts — Phase 2B 数据库写入验证脚本
 *
 * 写入最小测试数据（可重复执行，使用 upsert 避免重复插入）。
 * 本脚本仅用于验证 Prisma Client 写入路径，不是生产 seed 脚本。
 *
 * 用法: npm run db:seed
 */

import prisma from "../lib/prisma";

const TEST_ADMIN_USERNAME = "__seed_admin";
const TEST_PRODUCT_NAME = "__seed_product";
const TEST_CASE_TITLE = "__seed_case";
const TEST_MESSAGE_NAME = "__seed_message";
const TEST_SITESETTING_COMPANY = "__seed_company";

async function seed() {
  console.log("[seed] 开始写入测试数据 ...");

  // Admin
  const admin = await prisma.admin.upsert({
    where: { username: TEST_ADMIN_USERNAME },
    update: { passwordHash: "test_hash_from_seed" },
    create: {
      username: TEST_ADMIN_USERNAME,
      passwordHash: "test_hash_from_seed",
    },
  });
  console.log(`[seed] Admin id=${admin.id} username=${admin.username}`);

  // Product
  const product = await prisma.product.upsert({
    where: { id: 1 },
    update: { name: TEST_PRODUCT_NAME },
    create: {
      id: 1,
      name: TEST_PRODUCT_NAME,
      category: "测试分类",
      summary: "测试产品摘要",
      description: "测试产品描述",
      imageUrl: "",
    },
  });
  console.log(`[seed] Product id=${product.id} name=${product.name}`);

  // Case
  const caseItem = await prisma.case.upsert({
    where: { id: 1 },
    update: { title: TEST_CASE_TITLE },
    create: {
      id: 1,
      title: TEST_CASE_TITLE,
      summary: "测试案例摘要",
      content: "测试案例内容",
      imageUrl: "",
    },
  });
  console.log(`[seed] Case id=${caseItem.id} title=${caseItem.title}`);

  // Message
  const message = await prisma.message.upsert({
    where: { id: 1 },
    update: { name: TEST_MESSAGE_NAME },
    create: {
      id: 1,
      name: TEST_MESSAGE_NAME,
      phone: "13800000000",
      email: "test@example.com",
      company: "测试公司",
      content: "测试留言内容",
      status: "new",
    },
  });
  console.log(`[seed] Message id=${message.id} name=${message.name}`);

  // SiteSetting
  const setting = await prisma.siteSetting.upsert({
    where: { id: 1 },
    update: { companyName: TEST_SITESETTING_COMPANY },
    create: {
      id: 1,
      companyName: TEST_SITESETTING_COMPANY,
      slogan: "测试标语",
      description: "测试网站描述",
      phone: "010-12345678",
      email: "info@test.com",
      address: "测试地址",
      logoUrl: "",
      wechatQrUrl: "",
    },
  });
  console.log(`[seed] SiteSetting id=${setting.id} companyName=${setting.companyName}`);

  console.log("[seed] 完成。");
}

seed()
  .catch((error) => {
    console.error("[seed] 错误:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
