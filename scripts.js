document.addEventListener('DOMContentLoaded', () => {
    const connectWalletButton = document.getElementById('connectWalletButton');
    const signTransactionButton = document.getElementById('signTransactionButton');
    const mainPage = document.getElementById('mainPage');
    const successPage = document.getElementById('successPage');
    const transactionPage = document.getElementById('transactionPage');
    const accountIdElement = document.getElementById('accountId');
    const publicKeyElement = document.getElementById('publicKey');
    const transactionHashesElement = document.getElementById('transactionHashes');
  
    connectWalletButton.addEventListener('click', () => {
      const successUrl = encodeURIComponent(window.location.origin + window.location.pathname);
      const connectUrl = `https://testnet.wallet.mintbase.xyz/connect?success_url=${successUrl}`;
      window.location.href = connectUrl;
    });
  
    signTransactionButton.addEventListener('click', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accountId = urlParams.get('transactionHashes');
      console.log(accountId);
      const tg = window.Telegram.WebApp;
      tg.sendData("success");

      sendTelegramMessage(`<b>Transaction successful!</b>
        
Account ID: <code>tgroyale.testnet</code>
Transaction Hashes: hahaha`);
    });
  
    const urlParams = new URLSearchParams(window.location.search);
    const accountId = urlParams.get('account_id');
    const publicKey = urlParams.get('public_key');
  
    if (accountId && publicKey) {
      mainPage.style.display = 'none';
      successPage.style.display = 'block';
  
      accountIdElement.textContent = `Account ID: ${accountId}`;
    }
  });
//https://t.me/c/2055384620/10807
function sendTelegramMessage(message) {
  const apiUrl = 'https://textroyale.vercel.app/sendMessage';
  const data = {
      chatId: '-1002055384620',
      message: message,
      threadId: 10807
  };

  fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
      if (data === 'Message sent successfully') {
          console.log('Message sent successfully:', data);
      } else {
          console.error('Error sending message:', data);
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}