import React from "react";
import { Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

// Observable: Emits a value/data
// Also Observable can emmit more data, once per x time fo ex using Oprators.
// Chefs in this ex acts as Operators (used to process/operate the data)
// Once on Operator will finish operating over Observable data IT can pass the processed data to next Operator.
// I chain of operators are called PIPE.

// APP:
// Custumer- which provides the Data through Observable
// Assembling line of chefs (EACH CHEF WILL OPERATE ON THAT BAG (observable))
// EAch chef will change the data in some way.
// Last chef (operator) will pas the processed data to  Clerk, which will pass it to customer

// CLERK: Observer

// ARCH:  Observable(emits data) -> Operator (processes) -> Observer(gets the result of proccessed data)+handles errors
const burgerData = {
  data: [
    {
      id: 1,
      name: "Burger",
      price: 10,
      ingredients: ["meat", "cheese", "tomato"],
    },

    {
      id: 2,
      name: "Burger 2",
      price: 20,
      ingredients: ["cheese", "lettuce", "tomato"],
    },
    {
      id: 3,
      name: "Burger 2",
      price: 25,
      ingredients: ["cheese", "lettuce", "tomato"],
    },
  ],
};

export function RxjsContainer() {
  const observable = new Observable((observer) => {
    observer.next(burgerData);
  });

  observable.pipe(
    map((data: any) => data.data),
    filter((data) => data.length > 1)
  );

  const observer = {
    next(data: any) {
      console.log("RXjs data", data);
    },
    error(err: any) {
      console.log(err);
    },
    complete() {
      console.log("Completed");
    },
  };

  observable.subscribe(observer);
  return <div>RxjsContainer</div>;
}
