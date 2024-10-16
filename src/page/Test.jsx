import React from 'react'

// reduce함수를 사용해서 과일들의 합계price를 구하기
const cart = [
    {
        name:'사과',
        price:500
    },
    {
        name:'바나나',
        price:700
    },
    {
        name:'레몬',
        price:300
    }
]

const fruitTotal = cart.reduce((accumulator, currentValue) => {
    // console.log(`currentValue = ${JSON.stringify(currentValue.price)}`);
    return accumulator + currentValue.price    
},0)

console.log(`fruitTotal = ${fruitTotal}`);


function Test() {
  return (
    <>
      <p>reduce함수 이해하기::과일의 총 합계는 {fruitTotal}</p>
    </>
  )
}

export default Test
