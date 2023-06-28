import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { createStore, createSelectorHook } from "../src";
import { $toString } from "mingo/operators/expression";
import { useOperators, OperatorType } from "mingo/core";

useOperators(OperatorType.EXPRESSION, { $toString });

const store = createStore({
  a: false,
  b: false
});

const useSelector = createSelectorHook(store);

function Or() {
  const { or, a } = useSelector({
    a: 1,
    or: { $toString: { $or: ["$a", "$b"] } }
  }) as {
    a: boolean;
    or: string;
  };

  return (
    <h1 data-testid="or" onClick={() => store.update({ $set: { a: !a } })}>
      {or}
    </h1>
  );
}

function And() {
  const { and, b } = useSelector({
    b: 1,
    and: { $toString: { $and: ["$a", "$b"] } }
  }) as {
    b: boolean;
    and: string;
  };

  return (
    <h1 data-testid="and" onClick={() => store.update({ $set: { b: !b } })}>
      {and}
    </h1>
  );
}

function Xor() {
  const { a, b } = useSelector({
    a: 1,
    b: 1
  }) as {
    a: boolean;
    b: boolean;
  };

  const xor = String(Boolean(Number(a) ^ Number(b)));

  return <h1 data-testid="xor">{xor}</h1>;
}

describe("createSelectorHook", () => {
  it("should respond to selector hook", () => {
    const elOr = render(<Or />).getByTestId("or");
    const elXor = render(<Xor />).getByTestId("xor");
    const elAnd = render(<And />).getByTestId("and");

    // a=false, b=false
    expect(elOr.innerHTML).toEqual("false");
    expect(elXor.innerHTML).toEqual("false");
    expect(elAnd.innerHTML).toEqual("false");

    fireEvent.click(elOr); // a=true, b=false
    expect(elOr.innerHTML).toEqual("true");
    expect(elXor.innerHTML).toEqual("true");
    expect(elAnd.innerHTML).toEqual("false");

    fireEvent.click(elAnd); // a=true, b=true
    expect(elOr.innerHTML).toEqual("true");
    expect(elXor.innerHTML).toEqual("false");
    expect(elAnd.innerHTML).toEqual("true");

    fireEvent.click(elOr); // a=false, b= true
    expect(elOr.innerHTML).toEqual("true");
    expect(elXor.innerHTML).toEqual("true");
    expect(elAnd.innerHTML).toEqual("false");
  });
});
