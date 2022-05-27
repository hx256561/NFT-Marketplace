
Moralis.start({ serverUrl: "https://u8oeui2ow1gv.usemoralis.com:2053/server", appId: "atphTdiuUd2EmqyjU1mfRWIaZf5maSRsUZaOAyvg" });


// const CONTRACT_ADDRESS = "0x0191091f01e291c4dd27f1e3c8fb55dd4a63d135";
const CONTRACT_ADDRESS = "0x65463e6aa6bb49e7ae007183b63c5035b669eeed";

const ethers = Moralis.web3Library;
let accounts;


async function init() {
    let currentUser = Moralis.User.current();
    //check if the user have signed in
    if (!currentUser) {
        window.location.pathname = "/nft_dashboard/index.html";
    }

    await Moralis.enableWeb3();

    //get the current connected wallet address
    accounts = await Moralis.account;
    console.log(accounts);

    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    console.log(nftId);


}

async function buy() {
    console.log("ppp");

    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");

    //connect to MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    let amount = parseInt(document.getElementById("amount_input").value);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);
    // Seemed send is unnecessary??
    // const tx = await contract.mint(address, tokenId, amount).send({ from: accounts, value: 0 });
    const tx = await contract.MysafeTransferFrom("0x693d55F1587CADeB4dEe8F170ca89B1B1691b3F3", accounts, nftId, amount, "0x00");
    await tx.wait();
}

document.getElementById("submit_buy").onclick = buy;

init();
