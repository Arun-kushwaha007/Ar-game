import { StoreItemDisplay } from "../../components/StoreItem";

export function Page() {

    const props = {
        amount: 24,
        imageUrl: "https://file.rendit.io/n/bejZnK9zbgBJIgu9RJkH.png",
        title: "Nifty NFT",
        coinImage: "https://file.rendit.io/n/j3tBBnkNSPlaCm7uJPp3.png",
        quantity: 22,
        gated: false,
        timeRemaining: "20",
        rewardsClaimed: 12
    };
    return (
        <div className="App">
            <StoreItemDisplay
                amount={props.amount}
                imageUrl={props.imageUrl}
                title={props.title}
                coinImage={props.coinImage}
                quantity={props.quantity}
                gated={props.gated}
                timeRemaining={props.timeRemaining}
                rewardsClaimed={props.rewardsClaimed}
            />
        </div>
    );
}

export default Page;