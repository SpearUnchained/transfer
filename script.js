
document.addEventListener('DOMContentLoaded', () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const transactionHash = urlParams.get('transactionHashes');
    const transactionTye = urlParams.get('type');
    function shortenTxnHash(txnHash, charsToShow = 6) {
        if (txnHash.length <= charsToShow * 2) {
            return txnHash; // If already short, no need to change
        }
    
        const start = txnHash.slice(0, charsToShow);
        const end = txnHash.slice(-charsToShow);
        return `${start}...${end}`;
    }
    
    // Update transaction details
    function updateTransactionDetails(txnHash, txnLink) {
        document.getElementById('shortenedHash').textContent = shortenTxnHash(txnHash);
        document.getElementById('txnLink').setAttribute('href', txnLink);
    }
    
    const txnLink = `https://testnet.nearblocks.io/txns/${transactionHash}`;
    
    // Update transaction details on page load
    updateTransactionDetails(transactionHash, txnLink);
    
    // Add event listener to continue button
    document.getElementById('continueBtn').addEventListener('click', function() {
        const data = {
            type:transactionTye,
            status: "success",
            txnLink: transactionHash
        }
        const tg = window.Telegram.WebApp;
        tg.sendData(JSON.stringify(data));
    });

});


