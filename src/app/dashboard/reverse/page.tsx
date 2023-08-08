"use client";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react"


export default function Reverse() {

  const [wooOrderData, setwooOrderData] = useState([]);
  const [totalPages, settotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [apiLink, setApiLink] = useState('');
  const [loader, setloader] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setloader(true);
      try {
        const response = await fetch(`https://shopsppl.in//wp-json/wc/v2/orders?consumer_key=ck_362c79346df5045a8354633e29ca4433364baa75&consumer_secret=cs_7efa0e005bd7816f0f80708a2aad8c4aaddfde46&page=${currentPage}`);
        const data = await response.json();

        // Access headers from the response
        const headers = response.headers;
        const totalPost = headers.get('x-wp-total');
        const totalPagesHeader = headers.get('x-wp-totalpages');
        const totalPages: number = totalPagesHeader ? parseInt(totalPagesHeader) : 0;
        settotalPages(totalPages);
        setwooOrderData(data);

        console.log('API response data:', data);
        console.log('totalPost & totalPages :', totalPost + ' ' + totalPages);
        setloader(false);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();

  }, [currentPage])

  const handlePageChange = (page: number) => {
    setloader(true);
    console.log(page)
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pagination = [];
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(
        <li key={i} className={currentPage === i ? 'active' : ''}>
          <button onClick={() => handlePageChange(i)}>{i}</button>
        </li>
      );
    }
    return pagination;
  };


  return (
    <div >
      <ul >
        { loader ? 'Loading...' :
          wooOrderData && wooOrderData.map((item, index) => {
            return (
              <li key={index}>{item.billing.first_name}</li>
            )
          })
        }
      </ul>
      {/* {wooOrderData && wooOrderData.map((item, index) => (
        <div>{item[index].id}</div>
      ))} */}
      <ul>{renderPagination()}</ul>
    </div>
  )
}
