"use client";

import { EnrichedCurrencyRates, getCurrencyRates } from "@/services/currency";
import { FC, memo, useCallback, useDeferredValue, useState } from "react";

import * as styles from "./Currencies.css";
import CurrenciesList from "./CurrenciesList";
import { DateTime } from "luxon";
import { YEAR_MONTH_DAY } from "@/services/date";

type Props = {
  rates: EnrichedCurrencyRates;
};

const Currencies: FC<Props> = ({ rates }) => {
  const [filter, setFilter] = useState("");

  const [currentRates, setCurrentRates] = useState(rates);

  const changeDate = useCallback(
    async (dateModifier: number) => {
      const currentDate = currentRates.date;
      const dt = DateTime.fromISO(currentDate);
      const nextDate = dt.plus({ days: dateModifier }).toFormat(YEAR_MONTH_DAY);

      try {
        const rates = await getCurrencyRates(nextDate);
        setCurrentRates(rates);
      } catch (e) {
        console.error(e);
        setCurrentRates({ date: nextDate, rates: {} });
      }
    },
    [currentRates.date]
  );

  const debounced = useDeferredValue(filter);

  return (
    <div className={styles.currenciesClass}>
      <h2>Valuutat</h2>

      <p>
        <button onClick={() => changeDate(-1)}>&laquo;</button>
        {currentRates.date}
        <button onClick={() => changeDate(1)}>&raquo;</button>
      </p>

      <p>
        <input
          type="text"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </p>

      <CurrenciesList rates={currentRates} filter={debounced} />
    </div>
  );
};

export default memo(Currencies);
