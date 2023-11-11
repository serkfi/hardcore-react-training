"use client";

import { QuarticleType } from "@/services/quarticle";
import { FC, memo, useMemo } from "react";
import Headlines from "./Headlines";

type Props = {
  quarticles: QuarticleType[];
};

const isImportant = (q: QuarticleType) => {
  return q.priority === "high";
};

const LatestQuarticles: FC<Props> = ({ quarticles }) => {
  const [importantQuarticles, normalQuarticles] = useMemo(() => {
    return [
      quarticles.filter((q) => isImportant(q)),
      quarticles.filter((q) => !isImportant(q))
    ];
  }, [quarticles]);

  return (
    <div>
      <h2>Suur-kvartikkelit</h2>
      <Headlines quarticles={importantQuarticles} />

      <h2>Tavan kvartikkelit</h2>
      <Headlines quarticles={normalQuarticles} />
    </div>
  );
};

export default memo(LatestQuarticles);