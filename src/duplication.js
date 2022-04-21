import React, { useEffect, useState } from "react";
export const duplication = (array) => {
    const uniqueValues = new Set(array.map(val => val));
    if (uniqueValues.size < array.length) {
        return true;
      }else{
          return false;
      }
}
export function getNonExist(input,data){
    var inter = getArraysIntersection(input,data);
     var NonExist = input.filter( ( el ) => !inter.includes( el ) );
     return NonExist;
}
export function getArraysIntersection(a1,a2){
    return  a1.filter(function(n) { return a2.indexOf(n) !== -1;});
}
export function setWithExpiry(key, value, ttl) {
	const now = new Date()
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}



