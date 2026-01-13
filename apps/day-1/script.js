const connectBtn = document.getElementById("connect-wallet");
const statusEl = document.getElementById("status");
const addressEl = document.getElementById("address");
const networkEl = document.getElementById("network");
const balanceEl = document.getElementById("balance");
const alertContainer = document.getElementById("alert-container");

const AVALANCHE_FUJI_CHAIN_ID = "0xa869";

let walletConnected = false;

function formatAvaxBalance(balanceWei) {
  const balance = parseInt(balanceWei, 16);
  return (balance / 1e18).toFixed(4) + " AVAX";
}

function showAlert(message, type = "success") {
  const alert = document.createElement("div");
  alert.className = `alert ${type}`;

  const icon = type === "success" ? "✓" : "✕";

  alert.innerHTML = `
    <span class="alert-icon">${icon}</span>
    <span class="alert-message">${message}</span>
  `;

  alertContainer.appendChild(alert);

  setTimeout(() => {
    alert.style.animation = "fadeOut 0.3s ease-out";
    setTimeout(() => {
      alert.remove();
    }, 300);
  }, 3000);
}

async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    showAlert(
      "Core Wallet tidak terdeteksi. Silakan install Core Wallet.",
      "error"
    );
    return;
  }

  try {
    statusEl.textContent = "Connecting...";
    connectBtn.textContent = "Connecting...";

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const address = accounts[0];
    addressEl.textContent = address.slice(0, 6) + "..." + address.slice(-4);

    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    if (chainId === AVALANCHE_FUJI_CHAIN_ID) {
      networkEl.textContent = "Avalanche Fuji Testnet";
      statusEl.textContent = "Connected";
      connectBtn.textContent = "Connected";
      connectBtn.disabled = true;

      const balanceWei = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });

      balanceEl.textContent = formatAvaxBalance(balanceWei);
      showAlert("Wallet berhasil terhubung!", "success");
      walletConnected = true;
    } else {
      networkEl.textContent = "Wrong Network";
      statusEl.textContent = "Please switch to Avalanche Fuji";
      balanceEl.textContent = "-";
      connectBtn.textContent = "Connect Wallet";
      showAlert("Silakan ganti network ke Avalanche Fuji Testnet", "error");
    }
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Not connected";
    connectBtn.textContent = "Connect Wallet";
    showAlert("Koneksi gagal. Silakan coba lagi.", "error");
  }
}

connectBtn.addEventListener("click", connectWallet);

if (window.ethereum) {
  window.ethereum.on("chainChanged", () => {
    walletConnected &&
      showAlert(
        "Mendeteksi perubahan network. Silakan refresh halaman.",
        "error"
      );
  });

  window.ethereum.on("accountsChanged", () => {
    walletConnected &&
      showAlert(
        "Mendeteksi perubahan wallet. Silakan refresh halaman.",
        "error"
      );
  });
}
