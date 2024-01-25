import React from "react";
import styles from "./StoreItem.module.css";
import Body from "./Body";

export const StoreItemDisplay: React.FC<{
  amount: number;
  imageUrl: string;
  title: string;
  coinImage: string;
  quantity: number;
  gated: boolean;
  timeRemaining: string;
  rewardsClaimed: number;
}> = ({
  title,
  gated,
  amount,
  timeRemaining,
  rewardsClaimed,
  quantity,
  imageUrl: image,
  coinImage
}) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} />
      <BodySection
        coinImage={coinImage}
        title={title}
        gated={gated}
        amount={amount}
        timeRemaining={timeRemaining}
        rewardsClaimed={rewardsClaimed}
        quantity={quantity}
      />
      <FooterSection />
    </div>
  );
};

const BodySection: React.FC<{
  title: string;
  gated: boolean;
  amount: number;
  timeRemaining: string;
  rewardsClaimed: number;
  quantity: number;
  coinImage: string;
}> = ({
  coinImage,
  title,
  gated,
  amount,
  timeRemaining,
  rewardsClaimed,
  quantity
}) => {
  return (
    <>
      <div className={styles.titleContainer}>
        <Body size="M" weight="medium" type="gray800">
          {title}
        </Body>
        {gated && <div className={styles.gatedText}>Token Gated</div>}
      </div>
      <Stats
        coinImage={coinImage}
        amount={amount}
        timeRemaining={timeRemaining}
        rewardsClaimed={rewardsClaimed}
        quantity={quantity}
      />
    </>
  );
};

const Stats: React.FC<{
  amount: number;
  timeRemaining: string;
  rewardsClaimed: number;
  quantity: number;
  coinImage: string;
}> = ({ coinImage, amount, timeRemaining, rewardsClaimed, quantity }) => {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.textContainer}>
        <img className={styles.coin} src={coinImage} alt={"coin"} />
        <Body type="gray600" size="XS">
          {amount}
        </Body>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.icon}></div> {/* clock icon */}
        <Body type="gray600" size="XS">
          {timeRemaining} Remaining
        </Body>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.icon}>&#xf06b;</div> {/* gift icon */}
        <Body type="gray600" size="XS">
          {rewardsClaimed} / {quantity} Claimed
        </Body>
      </div>
    </div>
  );
};

const FooterSection = () => {
  return (
    <div className={styles.footerContainer}>
      <button className={styles.footerIcon}>{"\uF0C5"}</button>{" "}
      {/* copy icon */}
      <button className={styles.footerIcon}>{"\uF044"}</button>{" "}
      {/* notepad icon */}
      <button className={styles.footerIcon + " " + styles.red}>
        {"\uF2ED"} {/* trashcan icon */}
      </button>
    </div>
  );
};
