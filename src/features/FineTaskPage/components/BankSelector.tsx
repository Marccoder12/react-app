import { useState } from "react";

type Bank = {
  code: string;
  name: string;
};

export const BankSelector = ({
  banks,
  selectedCode,
  onSelect,
}: {
  banks: Bank[];
  selectedCode: string;
  onSelect: (code: string, name: string) => void;
}) => {
  // const [query, setQuery] = useState("");
  // const [open, setOpen] = useState(false);

  return (
    <>
      {banks.map((ba) => {
        <input key={ba.code} type="radio">
          {ba.name}
        </input>;
      })}
    </>
  );
};
