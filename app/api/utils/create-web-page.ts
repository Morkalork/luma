import puppeteer from "puppeteer";

export async function createWebPage() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const [page] = await browser.pages();
  return page;
}
