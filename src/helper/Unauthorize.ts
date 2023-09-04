import toast from "react-hot-toast";

export default async function Unauthorized() {
    await fetch('/api/admin/logout', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                window.location.href = '/'
            }
            else if (res.status === 400) {
                toast.error(res.message);
            }
            else if (res.status === 500) {
                toast.error(res.message);
            }
        })
        .catch(err => {
            console.log(err);
        })
}