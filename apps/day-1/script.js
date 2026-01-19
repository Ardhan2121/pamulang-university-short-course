const connectBtn = document.getElementById("connect-wallet");
const statusEl = document.getElementById("status");
const addressEl = document.getElementById("address");
const networkEl = document.getElementById("network");
const balanceEl = document.getElementById("balance");
const alertContainer = document.getElementById("alert-container");

const AVALANCHE_FUJI_CHAIN_ID = "0xa869";

function formatAvaxBalance(balanceWei) {
  return (Number(balanceWei) / 1e18).toFixed(4) + " AVAX";
}

function showAlert(message, type = "success") {
  const alert = document.createElement("div");
  alert.className = `alert ${type}`;
  alert.innerHTML = `
    <span class="alert-icon">${type === "success" ? "✓" : "✕"}</span>
    <span class="alert-message">${message}</span>
  `;
  alertContainer.appendChild(alert);
  setTimeout(() => alert.remove(), 3000);
}

function resetUI() {
  statusEl.textContent = "Not connected";
  addressEl.textContent = "-";
  networkEl.textContent = "-";
  balanceEl.textContent = "-";
  connectBtn.textContent = "Connect Wallet";
  connectBtn.disabled = false;
}

async function loadNetwork() {
  const chainId = await window.ethereum.request({ method: "eth_chainId" });

  if (chainId !== AVALANCHE_FUJI_CHAIN_ID) {
    networkEl.textContent = "Wrong Network";
    statusEl.textContent = "Please switch to Avalanche Fuji";
    balanceEl.textContent = "-";
    return false;
  }

  networkEl.textContent = "Avalanche Fuji Testnet";
  return true;
}

async function loadBalance(address) {
  const balanceWei = await window.ethereum.request({
    method: "eth_getBalance",
    params: [address, "latest"],
  });

  balanceEl.textContent = formatAvaxBalance(balanceWei);
}

async function connectWallet() {
  if (!window.ethereum) {
    showAlert("Core Wallet tidak terdeteksi", "error");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (!accounts.length) {
      resetUI();
      return;
    }

    const address = accounts[0];
    addressEl.textContent = address.slice(0, 6) + "..." + address.slice(-4);

    const ok = await loadNetwork();
    if (!ok) return;

    await loadBalance(address);

    statusEl.textContent = "Connected";
    connectBtn.textContent = "Connected";
    connectBtn.disabled = true;
  } catch {
    resetUI();
    showAlert("Gagal connect wallet", "error");
  }
}

async function autoConnect() {
  if (!window.ethereum) return;

  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });

  if (!accounts.length) return;

  const address = accounts[0];
  addressEl.textContent = address.slice(0, 6) + "..." + address.slice(-4);

  const ok = await loadNetwork();
  if (!ok) return;

  await loadBalance(address);

  statusEl.textContent = "Connected";
  connectBtn.textContent = "Connected";
  connectBtn.disabled = true;
}

connectBtn.addEventListener("click", connectWallet);

if (window.ethereum) {
  window.ethereum.on("accountsChanged", () => {
    resetUI();
    autoConnect();
  });

  window.ethereum.on("chainChanged", () => {
    resetUI();
    autoConnect();
  });
}

autoConnect();
