// "use client";
// import { useEffect, useState } from "react"


// export default function Reverse() {

//   const [wooOrderData, setwooOrderData] = useState([]);
//   const [totalPages, settotalPages] = useState<number>(0);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [apiLink, setApiLink] = useState('');

//   useEffect(() => {
//     // async function fetchOrderWoo() {
//     //   await fetch('https://shopsppl.in//wp-json/wc/v2/orders?consumer_key=ck_362c79346df5045a8354633e29ca4433364baa75&consumer_secret=cs_7efa0e005bd7816f0f80708a2aad8c4aaddfde46', {
//     //     method: 'GET',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //   }).then(res => {
//     //     console.log(res.headers.get('content-type'))
//     //   })
//     //     // .then(res => {
//     //     //   console.log(res.headers);
//     //     //   setwooOrderData(res);
//     //     // })
//     //     .catch(err => {
//     //       console.log(err);
//     //     })
//     // }
//     // fetchOrderWoo();
//     async function fetchData() {
//       try {
//         const response = await fetch(`https://shopsppl.in//wp-json/wc/v2/orders?page=${currentPage}?consumer_key=ck_362c79346df5045a8354633e29ca4433364baa75&consumer_secret=cs_7efa0e005bd7816f0f80708a2aad8c4aaddfde46`);
//         const data = await response.json();

//         // Access headers from the response
//         const headers = response.headers;
//         const totalPost = headers.get('x-wp-total');
//         const totalPagesHeader = headers.get('x-wp-totalpages');
//         const totalPages: number = totalPagesHeader ? parseInt(totalPagesHeader) : 0;
//         settotalPages(totalPages);
//         setwooOrderData(data);

//         console.log('API response data:', data);
//         console.log('totalPost & totalPages :', totalPost + ' ' + totalPages);

//         // Do further processing with the API response data
//         // ...
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     fetchData()





//   }, [currentPage])

//   const handlePageChange = (page:number) => {
//     console.log(page)
//     setCurrentPage(page);
//   };

//   const renderPagination = () => {
//     const pagination = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pagination.push(
//         <li key={i} className={currentPage === i ? 'active' : ''}>
//           <button onClick={() => handlePageChange(i)}>{i}</button>
//         </li>
//       );
//     }
//     return pagination;
//   };


//   return (
//     <div>
//       <ul>
//         {!wooOrderData ? 'Loading...' :
//           wooOrderData && wooOrderData.map((item,index) => {
//             return(
//               <li key={index}>{item.billing.first_name}</li>
//             )
//           })
//         }
//       </ul>
//       {/* {wooOrderData && wooOrderData.map((item, index) => (
//         <div>{item[index].id}</div>
//       ))} */}
//       <ul>{renderPagination()}</ul>
//     </div>
//   )
// }

import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
