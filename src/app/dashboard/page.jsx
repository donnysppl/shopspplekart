"use client";

import React, { useEffect } from 'react'


export default function Dashboard() {

  useEffect(() => {
    const authbar = async () => {
      await fetch('https://staging.ekartlogistics.com/auth/token', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic cGxhc3Ryb25pY3NsYXJnZTpkdW1teUtleQ==',
          'Content-Type': 'application/json',
          'HTTP_X_MERCHANT_CODE': 'SPL',
        }
      }).then(res => res.json())
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    };
    authbar();
    const authbar2 = async () => {
      await fetch('https://staging.ekartlogistics.com/auth/token', {
        method: 'POST',
        mode:'no-cors',
        headers: {
          'Authorization': 'Basic cGxhc3Ryb25pY3NsYXJnZTpkdW1teUtleQ==',
          'Content-Type': 'application/json',
          'HTTP_X_MERCHANT_CODE': 'SPL',
        }
      }).then(res => res.json())
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    };
    authbar2();
  }, [])

  return (
    <div>Dashboard</div>
  )
}
