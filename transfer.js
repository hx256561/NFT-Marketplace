

Moralis.start({ serverUrl: "https://u8oeui2ow1gv.usemoralis.com:2053/server", appId: "atphTdiuUd2EmqyjU1mfRWIaZf5maSRsUZaOAyvg" });


//const CONTRACT_ADDRESS = "0x0191091f01e291c4dd27f1e3c8fb55dd4a63d135";
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
    document.getElementById("token_id_input").value = nftId;

}

async function transfer() {

    //connect to MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    let tokenId = parseInt(document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value;
    let amount = parseInt(document.getElementById("amount_input").value);

    const options = {
        type: "erc1155",
        receiver: address,
        contractAddress: CONTRACT_ADDRESS,
        tokenId: tokenId,
        amount: amount,
    };
    let transaction = await Moralis.transfer(options);
    console.log(transaction);
}

document.getElementById("submit_transfer").onclick = transfer;

init();


//original: https://pc4zvkhb19ar.usemoralis.com