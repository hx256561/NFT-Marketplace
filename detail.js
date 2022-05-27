Moralis.start({ serverUrl: "https://u8oeui2ow1gv.usemoralis.com:2053/server", appId: "atphTdiuUd2EmqyjU1mfRWIaZf5maSRsUZaOAyvg" });

//const CONTRACT_ADDRESS = "0x0191091f01e291c4dd27f1e3c8fb55dd4a63d135";
const CONTRACT_ADDRESS = "0x65463e6aa6bb49e7ae007183b63c5035b669eeed";

function fetchNFTMetadata(NFT) {
    let promises = [];
    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    for (let i = 0; i < NFT.length; i++) {
        let nft = NFT[i];
        //let id = nft.token_id;

        //Call moralis cloud function -> static json file
        promises.push(fetch("https://u8oeui2ow1gv.usemoralis.com:2053/server/functions/getNFT?_ApplicationId=atphTdiuUd2EmqyjU1mfRWIaZf5maSRsUZaOAyvg&nftId=" + nftId)
            .then(res => res.json())
            .then(res => JSON.parse(res.result))
            .then(res => { nft.metadata = res })
            .then(() => { return nft; }))
    }
    return Promise.all(promises);
}

async function renderInventory(NFT) {
    const parent = document.getElementById("app");

    const nft = NFT[0];
    let htmlString = `
        <div class="card">
        <img class="card-img-top" src="${nft.metadata.image}" alt="Card image cap">
            <div class="card-body" id="discription">
                <h5 class="card-text">> ${nft.metadata.description}</p>
                <h5 class="card-title">> ${nft.metadata.name}</h5>
                <h5 class="card-title">Price: 0.01 ETH</h5>
            </div>
        </div>
        `

    let htmlbtn = `<a href="./buyItem.html?nftId=${nft.token_id}" class="btn">BUY</a>`

    //append htnlString
    let col = document.createElement("div");
    col.className = "col col-md-4";
    col.innerHTML = htmlString;
    parent.appendChild(col);

    //find NFT by name
    const query = new Moralis.Query("NFTs");
    query.equalTo("name", nft.metadata.name);
    const results = await query.find();
    const targetNFT = results[0];

    //If NFT is buyable, then show buy button
    if (targetNFT.get("buyable") === true) {
        const parent = document.getElementById("discription");
        let btn = document.createElement("a");
        btn.innerHTML = htmlbtn;
        parent.appendChild(btn);
    }

}

async function initializeApp() {
    let currentUser = Moralis.User.current();
    //check if the user have signed in
    if (!currentUser) {
        currentUser = await Moralis.Web3.authenticate();
    }

    const options = { address: CONTRACT_ADDRESS, chain: "rinkeby" };
    let NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
    let NFTWithMetadata = await fetchNFTMetadata(NFTs.result);
    renderInventory(NFTWithMetadata);
}

initializeApp();