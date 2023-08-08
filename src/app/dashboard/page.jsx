"use client";

import React, { useEffect } from 'react'
import bwipjs from 'bwip-js';



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



  //   const authbar2 = async () => {
  //     await fetch('https://staging.ekartlogistics.com/auth/token', {
  //       method: 'POST',
  //       mode:'no-cors',
  //       headers: {
  //         'Authorization': 'Basic cGxhc3Ryb25pY3NsYXJnZTpkdW1teUtleQ==',
  //         'Content-Type': 'application/json',
  //         'HTTP_X_MERCHANT_CODE': 'SPL',
  //       }
  //     }).then(res => res.json())
  //       .then(res => {
  //         console.log(res);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  //   };
  //   authbar2();
  }, [])

  // useEffect(() => {
  //   try {
  //     // Th
  //     let canvas = document.createElement('canvas');
  //     bwipjs.toCanvas(canvas, {
  //       bcid: 'code128',       // Barcode type
  //       text: '0123456789',    // Text to encode
  //       scale: 3,               // 3x scaling factor
  //       height: 10,              // Bar height, in millimeters
  //       includetext: true,            // Show human-readable text
  //       textxalign: 'center',        // Always good to set this
  //     });
  //     document.getElementById('my-img').src = canvas.toDataURL('image/png');
  //   } catch (e) {
  //     // `e` may be a string or Error object
  //   }
  // }, [])

  // let canvas = window.document.createElement('canvas');
  //     bwipjs.toCanvas(canvas, {
  //       bcid: 'code128',       // Barcode type
  //       text: '0123456789',    // Text to encode
  //       scale: 3,               // 3x scaling factor
  //       height: 10,              // Bar height, in millimeters
  //       includetext: true,            // Show human-readable text
  //       textxalign: 'center',        // Always good to set this
  //     });
  //     window.document.getElementById('my-img').src = canvas.toDataURL('image/png');


  return (
    <div>
      {/* <canvas id="mycanvas"></canvas>
      <img id='my-img'/> */}

    </div>
  )
}
