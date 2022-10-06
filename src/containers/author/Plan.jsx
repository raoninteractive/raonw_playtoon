import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setAuthorPlans } from "@/modules/redux/ducks/author";

const PlanItem = ({ plan }) => {
  return (
    <div className="col" style={{ marginBottom: "2.33%" }}>
      <div className="icon">
        <img src={plan?.thumbnailImage} alt="image" />
      </div>
      <div className="cont">
        <h3 className="h1">{plan.name}</h3>
        <p className="t1">
          <span className="c-blue">{plan.price}PC</span> /月
        </p>
        <p className="t2">{plan.description}</p>
        <div className="t_dot1">
          <p>・差分が見れます</p>
          <p>・ダイヤモンドプランの内容＋psdファイルを公開しています。</p>
        </div>
        <a href="#" className="btn-pk b blue w100p">
          <span>編集する</span>
        </a>
      </div>
    </div>
  );
};

const Plan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentAuthor = useSelector(({ author }) => author.currentAuthor);
  const [planData, setPlanData] = useState();

  useEffect(() => {
    if (!currentAuthor.plan) {
      dispatch(setAuthorPlans({ authorId: currentAuthor.id }));
    } else {
      setPlanData(currentAuthor.plan);
    }
  }, [dispatch, currentAuthor.id, currentAuthor.plan]);

  return (
    <>
      <header className="hd_titbox3">
        <h2 className="h_tit0">
          <span>無限のお菓子バッグについて</span>
        </h2>
        <p className="t1">
          氷室くんの感情の機微を、冬月さんはどのくらい把握出来てるのかなぁ…嬉しい時の雪だるまは
          <br className="hide-m" />
          嬉しそうな雰囲気に見えてるんだろうか…第三者的に見てると、観察して行動パターン把握したくなります(笑)
        </p>
      </header>

      <div className="lst_mainplan">
        {planData &&
          planData.subscribeTiers &&
          planData.subscribeTiers.map((plan) => (
            <PlanItem key={`plan_${plan.id}`} plan={plan} />
          ))}
      </div>
    </>
  );
};

export default Plan;
