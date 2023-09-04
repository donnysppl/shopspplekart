import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Unauthorized from "./Unauthorize";

export default async function onCancelShipment(e: React.DOMAttributes<HTMLButtonElement>, id: string) {

    const token = localStorage.getItem('token');

    Swal.fire({
        title: 'Submit The Reason',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: (data) => {
            return fetch(`/api/ekart-shipment/cancel/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "HTTP_X_MERCHANT_CODE": "SPL",
                    "Authorization": `${token}`
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: res.message
                        })
                    }
                    else if (res.status === 400) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: res.message
                        })
                    }
                    else if (res.status === 401) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: res.message
                        })
                        Unauthorized();
                    }
                    else if (res.status === 500) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: res.message
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        console.log(result)
    })

    // console.log(id)
    // await fetch(`/api/ekart-shipment/cancel/${id}`, {
    //     method: 'POST',
    //     headers: {
    //         "Content-Type": "application/json",
    //         "HTTP_X_MERCHANT_CODE": "SPL",
    //         "Authorization": `${token}`
    //     },
    // }).then(res => res.json())
    //     .then(res => {
    //         console.log(res);

    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
}


