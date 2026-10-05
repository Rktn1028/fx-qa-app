const { test, expect } = require('@playwright/test');

test('5回連打したら隠しメッセージが表示されるかテスト', async ({ page }) => {
  // 1. 公開中のGitHub PagesのURLを開く
  await page.goto('https://rktn1028.github.io/fx-qa-app/');

  // 2. 最初の状態では隠しメッセージが「非表示」になっていることを確認
  const secretMsg = page.locator('#secret-message');
  await expect(secretMsg).toBeHidden();

  // 3. 「150.25円」のボタン（#rate-clicker）を取得
  const rateBox = page.locator('#rate-clicker');

  // 4. ロボットが高速で5回連続クリック！
  for (let i = 0; i < 5; i++) {
    await rateBox.click();
  }

  // 5. 5回クリック後に隠しメッセージが「表示」されたか確認！
  await expect(secretMsg).toBeVisible();
  
  // 6. メッセージテキストに「裏モード解放」が含まれているか検証！
  await expect(secretMsg).toContainText('裏モード解放');
});