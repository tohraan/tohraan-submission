import { useState } from "react";
import Stage0 from "../stages/Stage0";
import Stage1 from "../stages/Stage1";
import Stage2 from "../stages/Stage2";
import Stage3 from "../stages/Stage3";
import Stage4 from "../stages/Stage4";
import Stage5 from "../stages/Stage5";
import Stage6Transition from "../stages/Stage6Transition";
import Stage6 from "../stages/Stage6";

const Index = () => {
  const [stage, setStage] = useState(0);

  const next = () => setStage((s) => Math.min(s + 1, 7));

  switch (stage) {
    case 0: return <Stage0 onNext={next} />;
    case 1: return <Stage1 onNext={next} />;
    case 2: return <Stage2 onNext={next} />;
    case 3: return <Stage3 onNext={next} />;
    case 4: return <Stage4 onNext={next} />;
    case 5: return <Stage5 onNext={next} />;
    case 6: return <Stage6Transition onNext={next} />;
    case 7: return <Stage6 />;
    default: return <Stage0 onNext={next} />;
  }
};

export default Index;
