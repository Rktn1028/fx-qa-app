import { test, expect } from '@playwright/test';

test.describe('ドル円計算機のバリデーションテスト', () => {

  test.beforeEach(async ({ page }) => {
    // ローカルの index.html を開く（環境に合わせてパスを確認してな）
    await page.goto(`file://${process.cwd()}/index.html`);
  });

  test('全角スペース入力時に「半角数字を入力してください」が表示されるか', async ({ page }) => {
    // 全角スペースを入力して計算ボタンを押す
    await page.fill('#usd-input', '  ');
    await page.click('#calc-btn');

    // エラーメッセージが表示されているか検証
    const resultText = await page.locator('#calc-result').innerText();
    expect(resultText).toBe('半角数字を入力してください');
  });

  test('アルファベット入力時に「半角数字を入力してください」が表示されるか', async ({ page }) => {
    // 「abc」と入力して計算ボタンを押す
    await page.fill('#usd-input', 'abc');
    await page.click('#calc-btn');

    // エラーメッセージが表示されているか検証
    const resultText = await page.locator('#calc-result').innerText();
    expect(resultText).toBe('半角数字を入力してください');
  });

});